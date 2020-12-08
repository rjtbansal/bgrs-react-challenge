import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useState } from "react";
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
    })
      .catch(err => console.error(err))));
    setAreMoviesLoading(false);
    return filmNames;
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="character-label">
        Select Character 
      </InputLabel>
      <Select labelId="character-label" id="character-select" value={character} onChange={handleCharacterSelection}>
        {
          characterProps.map(characterProp => <MenuItem value={characterProp.name.toLowerCase()} key={characterProp.name.toLowerCase()}>{ characterProp.name }</MenuItem>)
        }
      </Select>
      <MoviesList movieList={moviesByCharacter} isLoading = {areMoviesLoading} />
    </FormControl>
  )
}

export default CharacterDropdown;
