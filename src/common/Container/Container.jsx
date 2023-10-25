import React, { useEffect, useState } from 'react';
import Playlist from '../Playlist/Playlist';
import { useDispatch } from 'react-redux';
import { setMute } from '../../store/siteSlice';

import './Container.css';

function Container() {
  const [page, setPage] = useState('ForYou');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMute());
  }, [dispatch, page]);

  return (
    <>
      <div className="container">
        {page === 'ForYou' && (
          <Playlist mode={'ForYou'} setPage={setPage} key={'ForYou'}></Playlist>
        )}
        {page === 'Following' && (
          <Playlist
            mode={'Following'}
            setPage={setPage}
            key={'Following'}
          ></Playlist>
        )}
        <div className="page-option-container">
          <span
            className={`page-btn ${page === 'ForYou' ? 'active' : 'inactive'}`}
            onClick={() => setPage('ForYou')}
          >
            For You
          </span>
          <span
            className={`page-btn ${
              page === 'Following' ? 'active' : 'inactive'
            }`}
            onClick={() => setPage('Following')}
          >
            Following
          </span>
        </div>
      </div>
    </>
  );
}

export default Container;
