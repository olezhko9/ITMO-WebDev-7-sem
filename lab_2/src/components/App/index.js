import React from 'react';
import './App.css';

import {Container, Grid, Button, createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { SnackbarProvider } from 'notistack';

import WeatherCard from "../WeatherCard";
import FavoriteCitiesContainer from "../FavoriteCitiesContainer";

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


  render() {
    // const styles = useStyles()
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
                <Button variant="contained" color="primary" fullWidth>
                  Обновить геолокацию
                </Button>
              </Grid>
            </Grid>

            <WeatherCard key={"default"} location={this.state.currentLocation} isFavorite={false}/>

            <FavoriteCitiesContainer/>

          </Container>
        </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
