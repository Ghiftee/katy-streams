/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  date: '',
  streams: [],
  covers: [],
  artistpic: '',
  ready: false,
  leadStreams: null,
  featuredStreams: null,
  leadDifference: null,
  featuredDifference: null,
};

export const fetchDataAsync = createAsyncThunk(
  'data/fetchAll',
  async () => {
    const result = [];
    let data = await fetch('/streams?start=0&end=0');
    data = await data.json();
    const { date } = data.today;
    result.push(data);
    data = await fetch('/covers');
    data = await data.json();
    result.push(data);
    data = await fetch('/artistpic');
    data = await data.json();
    result.push(data);
    data = await fetch(`/totalcount?date=${date}`);
    data = await data.json();
    result.push(data);
    return result;
  },
);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataAsync.fulfilled, (state, action) => {
      state.date = action.payload[0].today.date;
      state.streams = action.payload[0].today.streams;
      state.covers = action.payload[1].data;
      state.artistpic = action.payload[2].uri;
      state.leadStreams = action.payload[3].lead;
      state.featuredStreams = action.payload[3].feat;
      state.leadDifference = action.payload[3].diffLead;
      state.featuredDifference = action.payload[3].diffFeat;
      state.ready = true;
    });
  },
});

export const { updateState } = dataSlice.actions;
export const selectStreams = (state) => state.data.streams;
export const selectDate = (state) => state.data.date;
export const selectCovers = (state) => state.data.covers;
export const selectArtistPic = (state) => state.data.artistpic;
export const selectLeadStreams = (state) => state.data.leadStreams;
export const selectFeaturedStreams = (state) => state.data.featuredStreams;
export const selectLeadDiff = (state) => state.data.leadDifference;
export const selectFeaturedDiff = (state) => state.data.featuredDifference;
export const selectReadyState = (state) => state.data.ready;

export default dataSlice.reducer;
