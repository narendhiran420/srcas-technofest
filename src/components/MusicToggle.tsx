import { useRef, useState } from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

/**
 * Optional ambient music toggle. Drop an ambient loop at
 * public/assets/ambient-loop.mp3 to enable audio — the button
 * still renders (and just silently no-ops) if the file is missing.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.volume = 0.35;
      audio.play().catch(() => {
        /* file not present yet — ignore */
      });
    }
    setPlaying(!playing);
  }

  return (
    <>
      <audio ref={audioRef} src="/assets/ambient-loop.mp3" loop />
      <button
        onClick={toggle}
        aria-label={playing ? 'Mute background music' : 'Play background music'}
        className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition hover:border-neon-cyan/60 sm:flex"
      >
        {playing ? <FiVolume2 className="text-neon-cyan" /> : <FiVolumeX />}
      </button>
    </>
  );
}
