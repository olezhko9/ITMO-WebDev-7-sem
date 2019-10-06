import React from 'react';
import './App.css';
import {Container, Grid, Button, TextField, Fab} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import makeStyles from "@material-ui/core/styles/makeStyles";
import CurrentWeather from "./components/CurrentWeather";

const useStyles = makeStyles(theme => ({
  fab: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
}));

function App() {
  const styles = useStyles()

  return (
    <Container maxWidth={"lg"}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <h1>Погода здесь</h1>
        </Grid>
        <Grid container item xs={4} alignItems="center" justify="center">
          <Button variant="contained" color="primary">
            Обновить геолокацию
          </Button>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>

      <CurrentWeather />

      <Grid container>
        <Grid item xs={6}>
          <h1>Избранное</h1>
        </Grid>
        <Grid container item xs={6} alignItems="center" justify="flex-end">
          <TextField
            label="Добавить новый город"
            placeholder="Город"
            margin="normal"
          />
          <Fab size="small" color="primary" aria-label="add" className={styles.fab}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
