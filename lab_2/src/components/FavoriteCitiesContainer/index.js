import React from "react";

import {Fab, Grid, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import {withSnackbar} from "notistack";

import {addCity, fetchCity, removeCity} from "../../store/actions";
import {connect} from 'react-redux';

import WeatherCard from "../WeatherCard";


class FavoriteCities extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      enteredCity: '',
    }
  }

  componentDidMount() {
    this.props.cities.forEach(city => {
      this.props.fetchCity(city.name)
    })
  }

  removeCityFromFavorite(cityName) {
    this.props.removeCity(cityName)
  }

  onCityInput(e) {
    const city = e.target.value
    this.setState({enteredCity: city})
  }

  handleCityFetchError(city) {
    this.removeCityFromFavorite(city)
    this.props.enqueueSnackbar(`Не удалось получить погоду для города ${city}`, {
      variant: 'error',
      autoHideDuration: 3000
    });
  }

  addCityToFavorite(e) {
    e.preventDefault()
    if (this.state.enteredCity !== "") {
      this.props.addCity(this.state.enteredCity)
      this.props.fetchCity(this.state.enteredCity)
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
                onFetchError={this.handleCityFetchError.bind(this, cityWeather.name)}
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
      addCity,
      fetchCity,
      removeCity
    }
  )(FavoriteCities)
);

