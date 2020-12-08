# Running the project

- Download the zip
- Run the following:
  - yarn install
  - yarn start

# Completed Features:

- Getting characters for dropdown from Swapi API (no hardcoding)
- Displaying movies and the last movie with year
- Added a test for CharacterDropdown component

# Issues Encountered

- Swapi Api can be unstable and periodically throw CORS issues as libary [is no longer maintained](https://github.com/phalt/swapi). This really increased development time.
- Workaround for above issue has been done by appending [heroku-cors](https://github.com/phalt/swapi/issues/104) before reaching out to URL. However,
it can still throw CORS issue once in a while. Refresh the page a few times and it will work. 

# Decisions taken in the interest of time

- As I had no experience with redux, I decided to use props.
- Would have liked to add more complex tests
- Would have liked to enhance error handling with Snackbars 