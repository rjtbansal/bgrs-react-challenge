import { FormControl, Grid, MenuItem, Paper, Select, Typography } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import MoviesList from "../MoviesList";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  gridContainer: {
    marginTop: theme.spacing(2)
  },
  characterListPaper: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(1),
  },
  labelHeading: {
    paddingBottom: theme.spacing(1)
  },
  lastTitleAndYearPaper: {
    padding: theme.spacing(1)
  },
  gridItem: {
    width: theme.spacing(40)
  }
}));

const CharacterDropdown = ({ characterProps }) => {
   const classes = useStyles();
  const [character, setCharacter] = useState('');
  const [moviesByCharacter, setMoviesByCharacter] = useState([]);
  const [areMoviesLoading, setAreMoviesLoading] = useState(false);
  const [lastMovieTitleAndYear, setLastMovieTitleAndYear] = useState(null);

  const handleCharacterSelection = async(event) => {
    setCharacter(event.target.value);
    setMoviesByCharacter(await loadMovieList(event.target.value));
  }

  const loadMovieList = async (characterSelected) => { 
    const characterSelectedObj = characterProps.filter(characterProp => characterProp.name.toLowerCase() === characterSelected);
    const filmUrls = characterSelectedObj[0].films;
    const filmNames = [];
    setAreMoviesLoading(true);
    await Promise.all(filmUrls.map(filmUrl => axios.get(filmUrl).then(response => {
      filmNames.push(response.data);
      setAreMoviesLoading(false);
    })
      .catch(err => console.error(err))));
    return filmNames;
  }

  const getLastMovieTitleAndYear = useCallback(() => {
    if (moviesByCharacter.length) {
      const moviesTitleAndReleaseYear = moviesByCharacter.map(movie => ({ title: movie.title, release_year: new Date(movie.release_date).getFullYear() }));
      moviesTitleAndReleaseYear.sort((a, b) => b.release_year - a.release_year);
      const { title, release_year } = moviesTitleAndReleaseYear[0];
      setLastMovieTitleAndYear({ title, release_year });
    }
  }, [moviesByCharacter]);

  useEffect(() => {
    getLastMovieTitleAndYear();
  }, [moviesByCharacter.length, getLastMovieTitleAndYear])

  return (
    <Grid container spacing={2} direction="column" justify="center" alignItems="center" className={classes.gridContainer}>
      <Grid item classes={{ item: classes.gridItem }}>
        <Typography component="p" variant="h3" className={classes.labelHeading}>Character List</Typography>
        <Paper elevation={2} className={classes.characterListPaper}>
          <FormControl className={classes.formControl} fullWidth>
            <Select id="character-select" value={character} onChange={handleCharacterSelection}>
              {
                characterProps.map(characterProp => <MenuItem value={characterProp.name.toLowerCase()} key={characterProp.name.toLowerCase()}>{ characterProp.name }</MenuItem>)
              }
            </Select>
            </FormControl>
        </Paper>
    </Grid>
    <Grid item classes={{ item: classes.gridItem }}>  
        <MoviesList movieList={moviesByCharacter} isLoading={areMoviesLoading} />
      </Grid>
    <Grid item classes={{ item: classes.gridItem }}>
        <Typography component="p" variant="h3" className={classes.labelHeading}>Last Title & Year</Typography>
        <Paper elevation={2} className={classes.lastTitleAndYearPaper}>
      {
        lastMovieTitleAndYear && <Typography component="p" variant="h4">{`${lastMovieTitleAndYear.title} - ${lastMovieTitleAndYear.release_year}`}</Typography> 
          }
        </Paper>
        </Grid>
      </Grid>
  )
}

export default CharacterDropdown;
