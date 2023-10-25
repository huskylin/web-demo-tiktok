import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMuted: true,
  videoProgress: {},
};

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setUnmute(state, action) {
      state.isMuted = false;
    },
    setMute(state, action) {
      state.isMuted = true;
    },
    setProgress(state, action) {
      // use src url as id
      const id = action.payload.url;
      const timecode = action.payload.timecode;
      state.videoProgress[id] = timecode;
    },
  },
});

export const { setUnmute, setMute, setProgress } = siteSlice.actions;

export default siteSlice.reducer;
