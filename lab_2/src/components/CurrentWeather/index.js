import React from 'react';

import {Grid} from '@material-ui/core/index';
import Typography from '@material-ui/core/Typography/index';
import Paper from "@material-ui/core/Paper/index";
import Fab from "@material-ui/core/Fab/index";
import Hidden from "@material-ui/core/Hidden/index";
import CloseIcon from '@material-ui/icons/Close';
import LoadingSpinner from '../LoadingSpinner';

import './style.sass';

class CurrentWeather extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      error: null,
      data: null
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.getWeatherData()
    }
  }

  componentDidMount() {
    this.getWeatherData()
  }

  getWeatherData() {
    this.setState({...this.state, isLoading: true})

    let url = ''
    const location = this.props.location

    if (Array.isArray(location)) {
      url = `http://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=263bacc60191ddc5e17b82d2d0c753d4`
    } else if (typeof location === 'string' && location.length) {
      url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=263bacc60191ddc5e17b82d2d0c753d4`
    } else return

    fetch(url)
      .then(res => res.json())
      .then((data) => {
        if (data.cod == 200)
          this.setState({...this.state, data: data, isLoading: false})
        else if (data.cod == 404) {
          this.props.removeCity(this.props.location)
        }
      })
      .catch(e => {
        console.log(e);
      })
  }

  onRemoveCityClick() {
    this.props.removeCity(this.props.location)
  }

  render() {
    const { data, isLoading, error} = this.state;

    if (isLoading) {
      return ( <LoadingSpinner/> )
    }

    if (data) {
      const K = 273.15; // для перевода Кельвин в Цельсия
      const temperatureCelsius = Math.round(data.main.temp - K);

      return (
        <Grid container direction={this.props.isFavorite ? "column" : "row"} spacing={4}
             className={`CurrentWeather ${this.props.isFavorite ? "isFavorite" : ""}`}>

          <Grid container item xs={12} md={this.props.isFavorite ? 12 : 6}
                direction={this.props.isFavorite ? "row" : "column"} alignItems={"center"} className={"weather-main"}>
            <Grid container item sm={this.props.isFavorite ? 4 : false} justify={"space-between"}>
              <Typography variant="h5" component="h2">
                <b>{data.name}</b>
              </Typography>
              <Hidden smUp>
                {this.props.isFavorite &&
                <Fab color="primary" size={"small"} onClick={this.props.onRemoveCityClick.bind(this, this.props.location)}>
                  <CloseIcon/>
                </Fab>
                }
              </Hidden>
            </Grid>
            <Grid item container sm={this.props.isFavorite ? 7 : false} alignItems={"center"}
                  justify={"space-evenly"} className={"weather-temperature"}>
              <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt=""/>
              <Typography variant={this.props.isFavorite ? "h3" : "h1"} component="h2">
                {temperatureCelsius}°C
              </Typography>
            </Grid>
            <Hidden only="xs">
              <Grid container item sm={1} justify={"flex-end"}>
                {this.props.isFavorite &&
                <Fab color="primary" size={"small"} onClick={this.props.onRemoveCityClick.bind(this, this.props.location)}>
                  <CloseIcon/>
                </Fab>
                }
              </Grid>
            </Hidden>
          </Grid>

          <Grid item xs={12} md={this.props.isFavorite ? 12 : 6} className={"weather-items"}>
            <Paper elevation={1} className={"weather-item"}>
              <span><b>Ветер</b></span>
              <span>{data.wind.speed} м/с</span>
            </Paper>

            <Paper elevation={1} className={"weather-item"}>
              <span><b>Облачность</b></span>
              <span>{data.weather[0].description}</span>
            </Paper>

            <Paper elevation={1} className={"weather-item"}>
              <span><b>Давление</b></span>
              <span>{data.main.pressure} hpa</span>
            </Paper>

            <Paper elevation={1} className={"weather-item"}>
              <span><b>Влажность</b></span>
              <span>{data.main.humidity} %</span>
            </Paper>

            <Paper elevation={1} className={"weather-item"}>
              <span><b>Координаты</b></span>
              <span>[{data.coord.lon}, {data.coord.lat}]</span>
            </Paper>
          </Grid>
        </Grid>
      )
    }

    return null;
  }
}

export default CurrentWeather;
