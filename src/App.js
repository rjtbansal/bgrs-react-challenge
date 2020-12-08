/**
 * It’s just a simple dropdown where you can select the character and we will see a list of movies that they were cast. 
 * When user changes selection, shows loading bar and refresh the list with new information you fetch from the API. 
 * Item 1, Item 2 and so on are dynamic data related to the movies that you fetch from the API related to the character you choose. 
 * Last information that you need to present is the last year of the character has been in a movie.
API doc: https://swapi.dev/

Please demonstrate the use redux and responsive layout: MUI or Bootstrap or other preferred library.

The final UX styles is up to you, it’s nice to show creative aspect of UI development capability.

It would be nice to have a unit test example.
 */
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core";
import StarWarsCharacters from "./containers/StarWarsCharacters";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StarWarsCharacters />
    </ThemeProvider>
  );
}

export default App;
