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
  const { list } = data;
  const airData = list.length > 0 ? list[0] : null;

  let stringQuality = null;
  if (airData) {
    const { main, components } = airData;
    const { aqi: quality } = main;
    stringQuality = getAirQualityString(quality);
  }

  const airDataObject = {
    country,
    stringQuality,
    components: airData ? airData.components : null,
  };

  return airDataObject;
});

const getAirQualityString = (quality) => {
  if (quality === 1) {
    return 'Good';
  } if (quality === 2) {
    return 'Fair';
  } if (quality === 3) {
    return 'Moderate';
  } if (quality === 4) {
    return 'Poor';
  } if (quality === 5) {
    return 'Very Poor';
  }
  return null;
};

const pollutionSlice = createSlice({
  name: 'pollution',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPollutionData.pending, (state) => ({ ...state, stats: 'loading' }))
      .addCase(fetchPollutionData.fulfilled, (state, action) => {
        const { country, ...rest } = action.payload;
        return {
          ...state,
          stats: 'succeeded',
          error: '',
          pollutionData: {
            ...state.pollutionData,
            [country]: rest,
          },
        };
      })
      .addCase(fetchPollutionData.rejected, (state, action) => ({ ...state, stats: 'failed', error: action.error.message }));
  },
});

export const selectPollutionData = (country) => (state) => state.pollution.pollutionData[country];

export default pollutionSlice.reducer;
