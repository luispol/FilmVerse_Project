// Import movies model
import movie from "../models/movie.js";

// CRUD ACTIONS

// GETTING ALL MOVIES FOR CARROUSELS AND OTHERS
// We probably gonna need to filter this better.
const getAllMovies = async (request, response) => {
    // We dont need filter the data in this 
    const movies = await movie.find();
    response.json(movies);
};

const getMoviesCard = async (request, response) => {
    // We dont need filter the data in this 
    const movies = await movie.find({ _id: request.query.id });
    // try in postman, Example: localhost:3001/api/movies/card?id=64741fc21a010ea6c8fb068d
    console.log(movies)
    response.json(movies);
};

const setMovie = async (request, response) => {
    const movies = new movie(request.body);
    console.log(request.body);
    try {
        const movieSave = await movies.save();
        console.log(movieSave);
        response.json(movieSave);
    } catch (error) {
        console.log(`An error ocurred while inserting the movie: ${error}`);
    }
};

//  Try this body in postman
/* {
  "title": "The Movie",
  "genres": ["Action", "Drama"],
  "fullplot": "This is the full plot of the movie.",
  "released": "2022-05-30",
  "tomatoes": {
    "rating": 8
  }
}
*/

const editMovie = async (request, response) => {
    try {
    // try in postman, Example: localhost:3001/api/movies/card?id=64741fc21a010ea6c8fb068d
      const updatedMovie = await movie.findOneAndUpdate(
        { _id: request.query.id },
        request.body,
        { new: true }
      );
      response.json(updatedMovie);
    } catch (error) {
      console.log(`An error occurred while updating the movie: ${error}`);
      response.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const deleteMovie = async (request, response) => {
    // try in postman, Example: localhost:3001/api/movies/card?id=64741fc21a010ea6c8fb068d
    try {
      const deletedMovie = await movie.findOneAndDelete({ _id: request.query.id });
      response.json(deletedMovie);
    } catch (error) {
      console.log(`An error occurred while deleting the movie: ${error}`);
      response.status(500).json({ error: 'Internal server error' });
    }
  };
  

// EXPORTING
export {
    getAllMovies,
    getMoviesCard,
    setMovie,
    editMovie,
    deleteMovie
}
