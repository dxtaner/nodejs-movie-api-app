const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  director_id: {
    type: Schema.Types.ObjectId,
    ref: "director",
  },
  title: {
    type: String,
    required: [true, "Başlık alanı zorunludur."],
    maxlength: [50, "Başlık alanı en fazla 50 karakter olmalıdır."],
    minlength: [3, "Başlık alanı en az 3 karakter olmalıdır."],
  },
  category: {
    type: String,
    maxlength: 30,
    minlength: 1,
  },
  country: {
    type: String,
    maxlength: 30,
    minlength: 1,
  },
  year: {
    type: Number,
    max: [2040, "Yıl alanı en fazla 2040 olmalıdır."],
    min: [1900, "Yıl alanı en az 1900 olmalıdır."],
  },
  imdb_score: {
    type: Number,
    max: [10, "IMDB puanı en fazla 10 olmalıdır."],
    min: [0, "IMDB puanı en az 0 olmalıdır."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
