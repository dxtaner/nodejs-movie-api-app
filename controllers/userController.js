const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const home = (req, res, next) => {
  res.status(200).json({
    status: true,
    message: "Express server is running successfully",
    data: {
      title: "Express",
    },
  });
};

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "Bu kullanıcı adı zaten kullanılmaktadır.",
      });
    }

    if (password.length < 5) {
      return res.status(400).json({
        status: false,
        message: "Şifre en az 5 karakter olmalıdır.",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hash,
    });

    const data = await user.save();
    res.json({
      status: true,
      data,
    });
  } catch (err) {
    res.json({
      status: false,
      error: err,
    });
  }
};

const authenticate = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res.json({
        status: false,
        message: "Kimlik doğrulama başarısız oldu, kullanıcı bulunamadı.",
      });
    } else {
      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        res.json({
          status: false,
          message: "Kimlik doğrulama başarısız oldu, yanlış şifre.",
        });
      } else {
        const payload = {
          username,
        };
        const token = jwt.sign(payload, req.app.get("api_secret_key"), {
          expiresIn: 720,
        });

        res.json({
          status: true,
          user: user,
          token: token,
        });
      }
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  home,
  register,
  authenticate,
};
