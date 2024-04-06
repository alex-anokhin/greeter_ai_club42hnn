import React from 'react';
import Player from './img/video-player-placeholder.avif'

function MediaPlayer() {
  return (
    <div className="media-player">
      <img className="video-placeholder" src={Player} alt="player placeholder" />
    </div>
  );
}

export default MediaPlayer;
