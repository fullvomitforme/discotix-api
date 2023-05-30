const db = require("../models/index.model");
const Film = db.film;
require("dotenv").config();

// Get all films
exports.getAllfilm = async (req, res) => {
  try {
    const films = await Film.findAll();
    res.status(200).json({ data: films });
  } catch (error) {
    console.error("Failed to fetch films:", error);
    res.status(500).json({
      message: `Failed to fetch films. Error: ${error.message} 😔🎥 Oh no! We couldn't retrieve the films due to an error. The disco projector seems to be acting up. Let's troubleshoot and get those films shining on the big screen again! 🎬💫`,
    });
  }
};

// Get film by ID
exports.getFilmById = async (req, res) => {
  const filmId = req.params.id;

  try {
    const film = await Film.findOne({
      where: {
        film_id: filmId,
      },
    });

    if (!film) {
      return res.status(400).json({
        message:
          "Couldn't find any film with that ID. 😔🎥 Oh no! It looks like the film you're searching for is missing from the disco archives. Keep exploring, and let's find a film that will light up your movie night! 🎬✨",
      });
    }
    res.status(200).json({ data: film });
  } catch (error) {
    console.error("Film search failed:", error);
    res.status(404).json({
      message:
        "Film search failed. 😔🎥 Oops! We encountered an issue while trying to search for the film. The disco movie database seems to be having a dance-off. Let's fix the steps and get back on track to find that perfect film! 💃🔍",
    });
  }
};

// Create a new film
exports.createFilm = async (req, res) => {
  const {
    film_title,
    film_rating,
    release_date,
    genre,
    director,
    language,
    duration,
    description,
    production_company,
    cast,
  } = req.body;

  const userInput = {
    film_title,
    film_rating,
    release_date,
    genre,
    director,
    language,
    duration,
    description,
    production_company,
    cast,
  };

  const existFilm = await Film.findOne({
    where: { film_title: userInput.film_title },
  });

  if (existFilm) {
    return res.status(400).json({
      message:
        "Film already exists. 🎥🚫 Uh-oh! It seems like the film you're trying to add is already here, rocking the disco screens. Let's keep the collection unique and find another film that will make the dance floor shine! 💃✨",
    });
  }

  try {
    const createFilm = await Film.create(userInput);
    res.status(200).json({
      data: createFilm,
      message:
        "Film added successfully! 🎉🎥 Welcome aboard the disco movie collection! Get ready for a cinematic experience that will make your dance moves groove to the rhythm of the film! 🍿🎬",
    });
  } catch (error) {
    console.error("Failed to create film:", error);
    res.status(400).json({ message: error.message });
  }
};
