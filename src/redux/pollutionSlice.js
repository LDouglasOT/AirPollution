import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'a2103c9856739dd4d52b96afb441ec45';
const initialState = {
  pollutionData: {},
  stats: 'idle',
  error: '',
};

export const fetchPollutionData = createAsyncThunk('pollution/fetchPollutionData', async (params) => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?${new URLSearchParams({
    lat: params.lat,
    lon: params.lon,
    appid: API_KEY,
  })}`);

  const data = await response.json();

  const { country } = params;
  const { list: [{ main: { aqi: quality }, components: { co, no, no2 } }] } = data;
  const stringQuality = quality === 1 ? 'Good' : quality === 2 ? 'Fair' : quality === 3 ? 'Moderate' : quality === 4 ? 'Poor' : quality === 5 ? 'Very Poor' : null;

  const airData = {
    country,
    stringQuality,
    co,
    no,
    no2,
  };

  return airData;
});

const pollutionSlice = createSlice({
  name: 'pollution',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPollutionData.pending, (state) => {
        state.stats = 'loading';
      })
      .addCase(fetchPollutionData.fulfilled, (state, action) => {
        state.stats = 'succeeded';
        state.error = '';
        const { country, ...rest } = action.payload;
        state.pollutionData[country] = rest;
      })
      .addCase(fetchPollutionData.rejected, (state, action) => {
        state.stats = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectPollutionData = (country) => (state) => state.pollution.pollutionData[country];

export default pollutionSlice.reducer;
