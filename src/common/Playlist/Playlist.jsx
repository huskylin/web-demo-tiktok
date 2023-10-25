import React from 'react';
import VideoJS from '../../common/VideoJS/VideoJS';
import useFetchData from '../../hooks/useFetchData';
import UnMuteBtn from '../UnMuteBtn/UnMuteBtn';
import './Playlist.css';

const videoJsOptions = {
  autoplay: false,
  controls: true,
  responsive: true,
  fluid: true,
  aspectRatio: '9:16',
  playsinline: true,
  preload: true,
  controlBar: {
    playToggle: false,
    captionsButton: false,
    chaptersButton: false,
    subtitlesButton: false,
    remainingTimeDisplay: false,
    progressControl: {
      seekBar: true,
    },
    fullscreenToggle: false,
    playbackRateMenuButton: false,
  },
};

function Playlist({ mode, setPage }) {
  const url = mode === 'Following' ? 'following_list' : 'for_you_list';
  const { data, isLoading } = useFetchData(url);

  return (
    <>
      <div className="app-videos">
        {
          <>
            {data &&
              data?.items &&
              data.items.map((e, i) => {
                const opt = {
                  ...videoJsOptions,
                  sources: [
                    {
                      src: e.play_url,
                      type: 'application/x-mpegURL',
                    },
                  ],
                  cover: e.cover,
                  title: e.title,
                };
                return (
                  <span key={e.play_url}>
                    <UnMuteBtn></UnMuteBtn>
                    <VideoJS options={opt} />
                  </span>
                );
              })}
          </>
        }
      </div>
    </>
  );
}

export default Playlist;
