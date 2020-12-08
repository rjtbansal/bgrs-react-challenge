import { Container, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CharacterDropdown from "../../components/CharacterDropdown";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  starWarsTitle: {
    textAlign: "center",
    marginTop: "2rem"
  }
}));

const StarWarsCharacters = () => {

  const classes = useStyles();
  const [charactersFetched, setCharactersFetched] = useState([]);
  const loadCharacters = async() => {
    try{
      const response = await axios.get("https://cors-anywhere.herokuapp.com/https://swapi.dev/api/people");
      setCharactersFetched(response.data.results);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadCharacters();
  }, []);

  return  (
    <Container>
      <Typography variant="h1" body="h1" className={classes.starWarsTitle}>
        Welcome to StarWars Characters!
     </Typography>
      {charactersFetched.length ? <CharacterDropdown characterProps={charactersFetched} /> : <LinearProgress /> }
    </Container>
  ) 
    
}

export default StarWarsCharacters;