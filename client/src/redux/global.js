// global.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: 0,
  zoom: 0,
  horizontalRotation: 0,
  verticalRotation: 0,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setNumber: (state, action) => {
      state.number = action.payload;
    },
    applyZoom: (state, action) => {
      state.zoom = action.payload;
    },
    setHorizontalRotation: (state, action) => {
      state.horizontalRotation = action.payload;
    },
    setVerticalRotation: (state, action) => {
      state.verticalRotation = action.payload;
    },
  },
});

export const {
  setNumber,
  applyZoom,
  setHorizontalRotation,
  setVerticalRotation,
} = globalSlice.actions;

export default globalSlice.reducer;
