import React from 'react';
import './App.css';
import {Container, Grid, Button, TextField, Fab, createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import makeStyles from "@material-ui/core/styles/makeStyles";
import CurrentWeather from "../CurrentWeather";
import Typography from "@material-ui/core/Typography";

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

function App() {
  const styles = useStyles()

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
          <CurrentWeather isFavorite={false} />
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
            />
            <Fab size="small" color="primary" aria-label="add" className={styles.fab}>
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>

        <Grid container spacing={4} component={"section"}>
          <Grid item xs={12} md={6}>
            <CurrentWeather isFavorite />
          </Grid>
          <Grid item xs={12} md={6}>
            <CurrentWeather isFavorite />
          </Grid>
        </Grid>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
