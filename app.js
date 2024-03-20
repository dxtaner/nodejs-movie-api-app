const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index.js");
const movieRouter = require("./routes/movie.js");
const directorRouter = require("./routes/director.js");

const app = express();

// Veritabanı bağlantısı
const db = require("./helper/db.js")();

// Konfigürasyon
const config = require("./config.js");
app.set("api_secret_key", config.api_secret_key);

// Middleware
const verifyToken = require("./middleware/verify-token.js");

// Görünüm motoru ayarı
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Rotalar
app.use("/", indexRouter);
app.use("/api", verifyToken);
app.use("/api/movies", movieRouter);
app.use("/api/directors", directorRouter);

// 404 hatası için middleware
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Hata işleyici
app.use((err, req, res, next) => {
  // sadece geliştirme ortamında hata ayrıntıları gösterilsin
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Hata sayfasını render et
  res.status(err.status || 500);
  res.json({ error: { message: err.message, code: err.code } });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
