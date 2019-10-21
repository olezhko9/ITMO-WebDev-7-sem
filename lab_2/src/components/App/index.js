import React from 'react';
import './App.css';
import {Container, Grid, Button, TextField, Fab, createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import makeStyles from "@material-ui/core/styles/makeStyles";
import CurrentWeather from "../CurrentWeather";
import Typography from "@material-ui/core/Typography";

import {connect} from 'react-redux';
import {addCity, removeCity} from "../../store/actions";

const useStyles = makeStyles(theme => ({
  fab: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
}));

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
      enteredCity: '',
      currentLocation: ''
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position => {
          this.setState({
            ...this.state,
            currentLocation: [position.coords.latitude, position.coords.longitude]
          })
        }),
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.log("User denied the request for Geolocation.");
          }
          this.setState({
            ...this.state,
            currentLocation: 'London'
          })
        });
    } else {
      console.log("Geolocation is disabled")
    }
  }

  addCityToFavorite() {
    if (this.state.enteredCity !== "")
      this.props.addCity(this.state.enteredCity)
  }

  removeCityFromFavorite(cityName) {
    console.log(cityName)
    this.props.removeCity(cityName)
  }

  onCityInput(e) {
    const city = e.target.value
    this.setState({enteredCity: city})
  }

  render() {
    // const styles = useStyles()
    return (
      <MuiThemeProvider theme={theme}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={1} component={"section"}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h4" component="h2">
                Погода здесь
              </Typography>
            </Grid>
            <Grid container item xs={12} sm={6} md={4}>
              <Button variant="contained" color="primary" fullWidth>
                Обновить геолокацию
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={1} component={"section"}>
            <CurrentWeather key={"default"} location={this.state.currentLocation} isFavorite={false}/>
          </Grid>

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
                onChange={this.onCityInput.bind(this)}
              />
              <Fab size="small" color="primary" onClick={this.addCityToFavorite.bind(this)}>
                <AddIcon/>
              </Fab>
            </Grid>
          </Grid>

          <Grid container spacing={4} component={"section"}>
            {this.props.cities.map((city, index) =>
              <Grid key={index} item xs={12} md={6}>
                <CurrentWeather location={city} isFavorite onRemoveCityClick={this.removeCityFromFavorite.bind(this)}/>
              </Grid>
            )}
          </Grid>

        </Container>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  state => ({
    cities: state
  }),
  {
    addCity,
    removeCity
  }
)(App);

