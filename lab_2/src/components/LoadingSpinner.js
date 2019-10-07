import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {RingLoader} from "react-spinners";
import React from "react";

function LoadingSpinner(props) {
  return (
    <Grid container justify={"center"}>
      <Grid container justify={"center"}>
        <Typography variant={props.textSize} component="h3" gutterBottom>
          Подождите, данные загружаются
        </Typography>
      </Grid>
      <Grid container justify={"center"}>
        <RingLoader
          sizeUnit={"px"}
          size={60}
          color={'#123abc'}
          loading={true}
        />
      </Grid>
    </Grid>
  )
}

export default LoadingSpinner;
