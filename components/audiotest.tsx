import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause } from 'react-icons/fa';

interface AudioPlayerProps {
  url: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformWidth, setWaveformWidth] = useState<number | null>(null);


  useEffect(() => {
    const updateWaveformWidth = () => {
      if (waveformRef.current && wavesurfer.current) {
        const screenWidth = window.innerWidth;
        const percentageWidth = 80; // Adjust this value as needed
        const maxWidth = 800; // Adjust this value as needed
        const calculatedWidth = (screenWidth * percentageWidth) / 100;
        setWaveformWidth(Math.min(calculatedWidth, maxWidth));
      }
    };

    const initializeWaveSurfer = () => {
      if (waveformRef.current) {
        wavesurfer.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: 'white',
          progressColor: 'grey',
          cursorColor: 'grey',
          barWidth: 2,
          barGap: 1,
          barRadius: 2,
          renderFunction: (channels, ctx) => {
            const { width, height } = ctx.canvas
            const scale = channels[0].length / width
            const step = 10
        
            ctx.translate(0, height / 2)
            ctx.strokeStyle = ctx.fillStyle
            ctx.beginPath()
        
            for (let i = 0; i < width; i += step * 2) {
              const index = Math.floor(i * scale)
              const value = Math.abs(channels[0][index])
              let x = i
              let y = value * height
        
              ctx.moveTo(x, 0)
              ctx.lineTo(x, y)
              ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, true)
              ctx.lineTo(x + step, 0)
        
              x = x + step
              y = -y
              ctx.moveTo(x, 0)
              ctx.lineTo(x, y)
              ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, false)
              ctx.lineTo(x + step, 0)
            }
        
            ctx.stroke()
            ctx.closePath()
          },
        // Add more options here if needed
      });

      wavesurfer.current.load(url);

      wavesurfer.current.on('play', () => setIsPlaying(true));
      wavesurfer.current.on('pause', () => setIsPlaying(false));
      wavesurfer.current.on('finish', () => setIsPlaying(false));
    }
  };
    initializeWaveSurfer();

    window.addEventListener('resize', updateWaveformWidth);

    return () => {
      window.removeEventListener('resize', updateWaveformWidth);
      wavesurfer.current?.destroy();
    };
  }, [url]);


  const handlePlayPause = () => {
    wavesurfer.current?.playPause();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <button onClick={handlePlayPause} style={{ marginRight: '10px' }}>
      {isPlaying ? <FaPause /> : <FaPlay />}
    </button>
    <div id="waveform" ref={waveformRef} style={{ width: window.innerWidth*0.8 }} />
  </div>
  );
};

export default AudioPlayer;
