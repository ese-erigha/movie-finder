
![Home Page](home.png?raw=true "MFlix")

# Movie-Finder-App

https://mflix.eseerigha.com/movies


A simple app for browsing movies powered by [The Movie Database API (TMBD)](https://developers.themoviedb.org/3/getting-started/introduction)


Application provides the following features:

* Filter movies based on categories
* Search for movie
* View movie details


Development:

* [create-react-app](https://create-react-app.dev/)
* [react-bootstrap](https://react-bootstrap.github.io/)
* [react-hooks](https://reactjs.org/docs/hooks-intro.html)
* [react-context](https://reactjs.org/docs/context.html)
* [font-awesome](https://fontawesome.com/v4.7.0/)
* [axios](https://www.npmjs.com/package/axios)
* [rescripts](https://github.com/harrysolovay/rescripts)

Testing:

* [react-testing-library](https://www.npmjs.com/package/@testing-library/react)
* [nock](https://www.npmjs.com/package/nock)
* [history](https://www.npmjs.com/package/history)


## Getting Started

### Prerequisites
Install [Node](https://nodejs.org/en/download/)

### Installing
Clone the repository
```
git clone https://github.com/eseerigha/movie-finder.git
```
Install dependencies
```
yarn
```
Configure environment variables
```
Create a .env file in the application root
```
Add the following config to the .env file
```
REACT_APP_MOVIE_DB_API_KEY=<insert api key>
REACT_APP_MOVIE_DB_BASE_URL=<https://api.themoviedb.org/3>
```

### Running application

Development Environment
```
yarn run start
```
Production Environment
```
yarn run build

yarn add global serve

serve -s build
```

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

![Alt text](movie.png?raw=true "MFlix")

