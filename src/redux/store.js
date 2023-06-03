import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countriesSlice';
import pollutionReducer from './pollutionSlice';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    pollution: pollutionReducer,
  },
});

export default store;
