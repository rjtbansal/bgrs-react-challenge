import { LinearProgress, List, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";

const MoviesList = ({ movieList, isLoading }) => {
  return(<Paper>
    <Typography variant="caption" body="caption">Movies</Typography>
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
  </Paper>);

}

export default MoviesList;