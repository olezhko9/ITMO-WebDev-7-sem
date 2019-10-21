import {Grid} from "@material-ui/core/index";
import Typography from "@material-ui/core/Typography/index";
import {RingLoader} from "react-spinners/index";
import React from "react";


function LoadingSpinner() {
  return (
    <Grid container justify={"center"}>
      <Grid container justify={"center"}>
        <Typography variant={"h5"} component="h3" align={"center"} gutterBottom>
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
