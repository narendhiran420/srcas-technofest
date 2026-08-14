/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const RAZORPAY_KEY_ID = defineSecret("RAZORPAY_KEY_ID");
const RAZORPAY_KEY_SECRET = defineSecret("RAZORPAY_KEY_SECRET");

// Every event costs exactly ₹100
const EVENT_AMOUNT = 10000; // ₹100 in paise

exports.createPaymentOrder = onCall(
  {
    secrets: [RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET],
  },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "You must be authenticated to create a payment."
      );
    }

    const { eventId } = request.data || {};

    if (!eventId) {
      throw new HttpsError(
        "invalid-argument",
        "Event ID is required."
      );
    }

    try {
      const razorpay = new Razorpay({
        key_id: RAZORPAY_KEY_ID.value(),
        key_secret: RAZORPAY_KEY_SECRET.value(),
      });

      const order = await razorpay.orders.create({
        amount: EVENT_AMOUNT,
        currency: "INR",
        receipt: `feast_${eventId}_${Date.now()}`,
        notes: {
          eventId,
          amount: "100",
        },
      });

      return {
        success: true,
        orderId: order.id,
        amount: EVENT_AMOUNT,
        currency: "INR",
        keyId: RAZORPAY_KEY_ID.value(),
      };
    } catch (error) {
      console.error("Razorpay order creation failed:", error);

      throw new HttpsError(
        "internal",
        "Unable to create payment order."
      );
    }
  }
);

exports.verifyPayment = onCall(
  {
    secrets: [RAZORPAY_KEY_SECRET],
  },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "You must be authenticated to verify payment."
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = request.data || {};

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      throw new HttpsError(
        "invalid-argument",
        "Payment verification information is incomplete."
      );
    }

    try {
      const body =
        `${razorpay_order_id}|${razorpay_payment_id}`;

      const expectedSignature = crypto
        .createHmac(
          "sha256",
          RAZORPAY_KEY_SECRET.value()
        )
        .update(body)
        .digest("hex");

      const isValid = crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(razorpay_signature)
      );

      if (!isValid) {
        throw new HttpsError(
          "permission-denied",
          "Invalid payment signature."
        );
      }

      return {
        success: true,
        verified: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      };
    } catch (error) {
      console.error("Payment verification failed:", error);

      if (error instanceof HttpsError) {
        throw error;
      }

      throw new HttpsError(
        "internal",
        "Payment verification failed."
      );
    }
  }
);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
