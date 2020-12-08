import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const CharacterDropdown = ({ characterProps }) => {
   const classes = useStyles();
  const [character, setCharacter] = useState('');

  const handleCharacterSelection = event => {
    setCharacter(event.target.value);
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
    </FormControl>
  )
}

export default CharacterDropdown;
