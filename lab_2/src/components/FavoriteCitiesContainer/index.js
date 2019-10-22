import React from "react";

import {Fab, Grid, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import {withSnackbar} from "notistack";

import {addCity, removeCity, getCitiesWeather} from "../../store/actions";
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
    this.props.getCitiesWeather()
  }

  addCityToFavorite() {
    if (this.state.enteredCity !== "") {
      this.props.addCity(this.state.enteredCity)
      this.setState({enteredCity: ''})
    }
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
            <TextField
              label="Добавить новый город"
              placeholder="Город"
              margin={"none"}
              value={this.state.enteredCity}
              onChange={this.onCityInput.bind(this)}
            />
            <Fab size="small" color="primary" style={{marginTop: '0.5rem', marginLeft: '1rem'}}
                 onClick={this.addCityToFavorite.bind(this)}>
              <AddIcon/>
            </Fab>
          </Grid>
        </Grid>

        <Grid container spacing={4} component={"section"}>
          {this.props.cities.map((city, index) =>
            <Grid key={index} item xs={12} md={6}>
              <WeatherCard location={city} isFavorite onRemoveCityClick={this.removeCityFromFavorite.bind(this)}
                           onFetchError={this.handleCityFetchError.bind(this, city)}/>
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
      cities: state
    }),
    {
      addCity,
      removeCity,
      getCitiesWeather
    }
  )(FavoriteCities)
);

