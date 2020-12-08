import { LinearProgress, List, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  labelHeading: {
    paddingBottom: theme.spacing(1)
  }
}));

const MoviesList = ({ movieList, isLoading }) => {
  
  const classes = useStyles();
  return (
    <>
    <Typography variant="h3" body="caption" className={classes.labelHeading}>Movies</Typography>
    <Paper>
    <List>
      {
        !isLoading
        ?
        movieList.map((movie, index) => (<ListItem key={index}>
          <ListItemText primary={movie.title} />
        </ListItem>))
          :
        <LinearProgress />
      }
    </List>
  </Paper></>);

}

export default MoviesList;