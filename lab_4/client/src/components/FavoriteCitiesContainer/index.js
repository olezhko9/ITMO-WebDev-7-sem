import React from "react";

import {Fab, Grid, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import {withSnackbar} from "notistack";

import WeatherCard from "../WeatherCard";

import {fetchCity, removeCity, addCity, fetchFavorites} from "../../store/actions";
import {connect} from 'react-redux';
const IS_FAVORITE = true;


export class FavoriteCities extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      enteredCity: '',
    }
  }

  async componentDidMount() {
    await this.props.fetchFavorites()
    this.props.cities.forEach(city => {
      this.props.fetchCity(city.cityName, IS_FAVORITE)
    })
  }

  removeCityFromFavorite(cityName) {
    this.props.removeCity(cityName, IS_FAVORITE)
  }

  onCityInput(e) {
    const city = e.target.value
    this.setState({enteredCity: city})
  }

  handleCityFetchError(city, message) {
    this.removeCityFromFavorite(city)
    this.props.enqueueSnackbar(`Не удалось получить погоду для города ${city}: ${message}`, {
      variant: 'error',
      autoHideDuration: 3000
    });
  }

  async addCityToFavorite(e) {
    e.preventDefault()
    const city = this.state.enteredCity;
    if (city !== "") {
      await this.props.addCity(city);
      this.setState({enteredCity: ''})
    }
  }

  render() {
    return (
      <Grid>

        <Grid container component={"section"} alignItems={"center"}>
          <Grid item xs={12} sm={5}>
            <Typography variant="h4" component="h2">
              Избранное
            </Typography>
          </Grid>
          <Grid container item xs={12} sm={7} className={"addCityInput"}>
            <form onSubmit={this.addCityToFavorite.bind(this)}>
              <TextField
                label="Добавить новый город"
                placeholder="Город"
                margin={"none"}
                name={"city"}
                value={this.state.enteredCity}
                onChange={this.onCityInput.bind(this)}
              />
              <Fab size="small" color="primary" style={{marginTop: '0.5rem', marginLeft: '1rem'}} type={"submit"}>
                <AddIcon/>
              </Fab>
            </form>
          </Grid>
        </Grid>

        <Grid container spacing={4} component={"section"}>
          {this.props.cities.map((cityWeather, index) =>
            <Grid key={index} item xs={12} md={6}>
              <WeatherCard
                cityWeatherData={cityWeather}
                isFavorite
                onRemoveCityClick={this.removeCityFromFavorite.bind(this)}
                onFetchError={this.handleCityFetchError.bind(this, cityWeather.cityName, cityWeather.message)}
              />
            </Grid>
          )}
        </Grid>

      </Grid>
    )
  }
}

export default withSnackbar(
  connect(
    state => ({
      cities: state.favorites
    }),
    {
      fetchCity,
      addCity,
      removeCity,
      fetchFavorites
    }
)(FavoriteCities)
);

