const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb+srv://taner16:taner123@cluster0.guofsiq.mongodb.net/movie-api",
    {
      useUnifiedTopology: true,
    }
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("MongoDB: Connected");
  });

  mongoose.Promise = global.Promise;
};
