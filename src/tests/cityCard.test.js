import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import CityCard from '../components/CityCard';

const fakeData = {
  name: 'name', continent: 'continent', flag: 'flag', lat: 'lat', lon: 'lon',
};

test('should render CityCard', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" component={<CityCard props={fakeData} />} />
        </Routes>
      </BrowserRouter>
    </Provider>,
  );
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn(),
}));
jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faArrowCircleRight: 'faArrowCircleRight',
}));

describe('CityCard', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useNavigate.mockClear();
    FontAwesomeIcon.mockClear();
  });

  test('renders city card correctly', () => {
    const name = 'City Name';
    const continent = 'Continent Name';
    const flag = 'flag.jpg';
    const lat = 12.34;
    const lon = 56.78;

    const { getByText, getByAltText } = render(
      <CityCard
        name={name}
        continent={continent}
        flag={flag}
        lat={lat}
        lon={lon}
      />
    );

    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(lat)).toBeInTheDocument();
    expect(getByAltText('country-flag')).toBeInTheDocument();
  });

  test('handles navigation on click', () => {
    const name = 'City Name';
    const continent = 'Continent Name';
    const lat = 12.34;
    const lon = 56.78;
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    const { container } = render(
      <CityCard
        name={name}
        continent={continent}
        flag="flag.jpg"
        lat={lat}
        lon={lon}
      />
    );

    fireEvent.click(container.firstChild);

    expect(navigateMock).toHaveBeenCalledWith('city', {
      state: {
        name,
        continent,
        lat,
        lon,
      },
    });
  });
});




