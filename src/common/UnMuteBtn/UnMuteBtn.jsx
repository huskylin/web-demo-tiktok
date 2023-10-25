import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUnmute } from '../../store/siteSlice';
import { Button } from '@chakra-ui/react';
import './UnMuteBtn.css';

function UnMuteBtn() {
  const isMuted = useSelector((state) => state.siteSlice.isMuted);
  const dispatch = useDispatch();
  return (
    <>
      {isMuted && (
        <Button
          colorScheme="gray"
          className={'mute-btn'}
          onClick={() => dispatch(setUnmute())}
        >
          取消靜音
        </Button>
      )}
    </>
  );
}

export default UnMuteBtn;
