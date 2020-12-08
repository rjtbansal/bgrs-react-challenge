import { FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import MoviesList from "../MoviesList";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
    await Promise.all(filmUrls.map(filmUrl => axios.get("https://cors-anywhere.herokuapp.com/"+filmUrl).then(response => {
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
    <>
    <FormControl className={classes.formControl}>
      <InputLabel id="character-label">
        Select Character 
      </InputLabel>
      <Select labelId="character-label" id="character-select" value={character} onChange={handleCharacterSelection}>
        {
          characterProps.map(characterProp => <MenuItem value={characterProp.name.toLowerCase()} key={characterProp.name.toLowerCase()}>{ characterProp.name }</MenuItem>)
        }
      </Select>
    </FormControl>
      <MoviesList movieList={moviesByCharacter} isLoading={areMoviesLoading} />
      <Typography component="p" variant="caption">Last Title & Year</Typography>
      {
        lastMovieTitleAndYear && <Typography component="p" variant="h4">{`${lastMovieTitleAndYear.title} - ${lastMovieTitleAndYear.release_year}`}</Typography> 
      }
      </>
  )
}

export default CharacterDropdown;
