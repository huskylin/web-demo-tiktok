import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import { useSelector, useDispatch } from 'react-redux';
import Marquee from '../Marquee/Marquee';
import { setProgress } from '../../store/siteSlice';

import 'video.js/dist/video-js.css';
import './VideoJS.css';

export const VideoJS = ({ options, onReady }) => {
  const [videoSize, setVideoSize] = useState([0, 0]);
  const [isPlay, setIsPlay] = useState(false);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const observerRef = useRef(null);

  const dispatch = useDispatch();
  const isMuted = useSelector((state) => state.siteSlice.isMuted);
  const videoProgress = useSelector((state) => state.siteSlice.videoProgress);
  const handlePlay = () => {
    if (playerRef && playerRef.current && !isPlay) {
      // avoid DOMException
      const playPromise = playerRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {})
          .catch((error) => {
            console.log(error);
            setTimeout(() => handlePlay(), 100);
          });
      }
    }
  };

  const handlePause = () => {
    if (
      playerRef &&
      playerRef.current &&
      playerRef.current.readyState() === 4 &&
      isPlay
    ) {
      playerRef.current.pause();
    }
  };

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      }));
      player.muted(true);
      const timecode = videoProgress[options.sources[0].src] || 0;
      player.currentTime(timecode);
    } else {
      const player = playerRef.current;
      player.options().inactivityTimeout = 0;
      player.src(options.sources);
      // load video progress
      const timecode = videoProgress[options.sources[0].src] || 0;
      player.currentTime(timecode);
    }
  }, [onReady, options, videoProgress, videoRef]);

  // Intersection Observer
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handlePlay();
        } else {
          handlePause();
        }
      });
    };
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: [0.95],
    });
    observerRef.current.observe(videoRef.current);
    return () => {
      observerRef.current.disconnect();
    };
  });

  // Record video progress when exit
  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player && player.currentTime() !== 0) {
        dispatch(
          setProgress({
            url: options.sources[0].src,
            timecode: player.currentTime(),
          })
        );
      }
    };
  }, [dispatch, options.sources, playerRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    // get innerVideo size to set cover size
    player.on('pause', function () {
      const videoElement = player.el();
      const innerVideo = videoElement.querySelector('video');
      const width = innerVideo.offsetWidth;
      const height = innerVideo.offsetHeight;
      setVideoSize([width, height]);
      setIsPlay(false);
    });

    player.on('play', function () {
      setIsPlay(true);
    });

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  useEffect(() => {
    playerRef.current.muted(isMuted);
  }, [isMuted]);

  return (
    <>
      <div data-vjs-player className="video">
        <div className="video-player" ref={videoRef} />
      </div>
      <div className="video-cover-container">
        <div
          className="video-cover"
          style={{
            width: `${videoSize[0]}px`,
            height: `${videoSize[1]}px`,
          }}
        >
          <img
            className={`video-cover ${isPlay ? 'hidden' : ''}`}
            src={options.cover}
            alt={options.title}
          ></img>
        </div>
      </div>
      <div className="page-marquee-container">
        <span style={{ marginRight: '10px' }}>🎵</span>
        <Marquee text={`原聲-${options.title}`}></Marquee>
      </div>
    </>
  );
};

export default VideoJS;
