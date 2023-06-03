import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  stats: 'idle',
  error: '',
  continent: 'All',
};
// eslint-disable-next-line
export const SelectedContinent = createAsyncThunk('countries/SelectedContinent', async (params, { dispatch }) => {
  // eslint-disable-next-line
  dispatch(setContinent(params));
});

export const fetchCountriesLists = createAsyncThunk('countries/fetchCountriesLists', async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  const sortedCountries = [];

  // destructer data to get only what we want
  data.forEach((country) => {
    const {
      name: { common: name }, region: continent, latlng: [lat, lng], flags: { svg: flag },
    } = country;
      // eslint-disable-next-line
      const newCountry = {
      name, continent, lat, lon: lng, flag,
    };

    sortedCountries.push(newCountry);
  });

  return sortedCountries;
});

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setContinent: (state, action) => {
      // eslint-disable-next-line
      state.continent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesLists.pending, (state) => {
        // eslint-disable-next-line
        state.stats = 'loading';
      })
      .addCase(fetchCountriesLists.fulfilled, (state, action) => {
        // eslint-disable-next-line
        state.stats = 'succeeded';
        // eslint-disable-next-line
        state.error = '';
        // eslint-disable-next-line
        state.countries = [...action.payload];
      })
      .addCase(fetchCountriesLists.rejected, (state, action) => {
        // eslint-disable-next-line
        state.stats = 'failed';
        // eslint-disable-next-line
        state.error = action.error.message;
      });
  },
});

export const selectAllCountries = (state) => {
  if (state.countries.continent === 'All') {
    return state.countries.countries;
  }
  // eslint-disable-next-line
  return state.countries.countries.filter((country) => country.continent === state.countries.continent);
};

export const { setContinent } = countriesSlice.actions;
export default countriesSlice.reducer;
