import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import WeatherCard from '../src/components/WeatherCard';



describe('Weather Card', () => {

  it('renders correctly when data is loading', () => {
    const cityWeather = {
      name: 'Moscow',
      isLoading: true
    }

    const tree = render(
      <WeatherCard
        cityWeatherData={cityWeather}
        isFavorite
      />);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });



})
