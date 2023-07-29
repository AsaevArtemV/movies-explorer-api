const mangoose = require('mongoose');
const { Schema } = require('mongoose');
const validationСheck = require('../utils/validationСheck');

const movieSchema = new Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
  },
  director: {
    type: Number,
    required: [true, 'Поле "director" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  image: {
    type: String,
    validate: validationСheck,
    required: [true, 'Поле "image" должно быть заполнено'],
  },
  trailerLink: {
    type: String,
    validate: validationСheck,
    required: [true, 'Поле "image" должно быть заполнено'],
  },
  thumbnail: {
    type: String,
    validate: validationСheck,
    required: [true, 'Поле "image" должно быть заполнено'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
  },
});

module.exports = mangoose.model('movie', movieSchema);
