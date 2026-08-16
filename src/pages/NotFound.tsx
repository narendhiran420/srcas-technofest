import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl font-black gradient-text">404</p>
      <p className="mt-4 text-paper-100/65">This page doesn't exist — but Techno Feast 2026 does.</p>
      <Link to="/" className="btn-glow mt-6">Back to Home</Link>
    </div>
  );
}
