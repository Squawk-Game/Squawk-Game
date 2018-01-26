
import React from 'react';
import { Player } from 'video-react';

export default function VidTest (props) {
  return (
    <div>
    <Player
      playsInline
      src="https://firebasestorage.googleapis.com/v0/b/squawk-868c7.appspot.com/o/Jurassic.mp4?alt=media&token=32869cf5-2bf8-47b0-b133-38b62c2ebc8e"
      controls={false}
    />
    </div>
  );
}
