import React from 'react';
import './App.css';

import {Container, Grid, Button, createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import Typography from "@material-ui/core/Typography";
import { SnackbarProvider } from 'notistack';

import WeatherCard from "../WeatherCard";
import FavoriteCitiesContainer from "../FavoriteCitiesContainer";

import {fetchCity} from '../../store/actions';
import {connect} from 'react-redux';
const IS_FAVORITE = false;


const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
})

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      geoLocationStatus: ''
    }
  }

  componentDidMount() {
    this.getLocationWeather()
  }

  async getLocationWeather() {
    const defaultCity = 'London'
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (async position => {
          this.setState({ geoLocationStatus: 'enabled' })
          this.props.fetchCity([position.coords.latitude, position.coords.longitude], IS_FAVORITE)
        }),
        async (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.log("User denied the request for Geolocation.");
          }
          this.setState({ geoLocationStatus: 'disabled' })
          this.props.fetchCity(defaultCity, IS_FAVORITE)
        });
    } else {
      console.log("Geolocation is disabled")
      this.setState({ geoLocationStatus: 'disabled' })
      this.props.fetchCity(defaultCity, IS_FAVORITE)
    }
  }


  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Container maxWidth={"lg"}>
            <Grid container spacing={1} component={"section"}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h4" component="h2">
                  Погода здесь
                </Typography>
              </Grid>
              <Grid container item xs={12} sm={6} md={4}>
                <Button variant="contained" color="primary" fullWidth onClick={this.getLocationWeather.bind(this)}>
                  Обновить геолокацию
                </Button>
              </Grid>
              { this.state.geoLocationStatus === 'disabled' ?
                (
                  <Grid container item xs={12} sm={12} md={12}>
                    <Typography variant="h5" component="h3" color={"error"}>
                      Геолокация недоступна
                    </Typography>
                  </Grid>
                ) : ('')
              }
            </Grid>

            <WeatherCard key={"default"} cityWeatherData={this.props.mainCityWeather} isFavorite={false}/>

            <FavoriteCitiesContainer/>

          </Container>
        </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  state => ({
    mainCityWeather: state.main
  }),
  {
    fetchCity
  }
)(App);
