const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const createResult = require("../utils/result");

// users endpoints

// 1: POST /users - Register New User
router.post("/", async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword)
    return res.send(createResult("Passwords do not match", null));
  const sql =
    "INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
  const { firstName, lastName, email, password } = req.body;
  db.query(sql, [firstName, lastName, email, password], (err, result) => {
    if (err) return next(err);
    // if(result.affectedRows == 0)
    //     return res.send(createResult('Email already exists', null))
    const user = {
      uid: result.insertId,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    res.send(createResult(null, user));
  });
});

// 2: GET /users/:id - Get User by ID
router.get("/:id", (req, res, next) => {
  const sql =
    "SELECT id, firstName, lastName, email, phoneno, address FROM user WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return next(err);
    let user = null;
    let error = err;
    if (result.length > 0) user = result[0];
    else error = "User not found";
    res.send(createResult(error, user));
  });
});

// 3: PUT /users/:id - Update User Profile
router.put("/:id", (req, res, next) => {
  const sql =
    "UPDATE user SET firstName = ?, lastName = ?, phoneno = ?, address = ? WHERE id = ?";
  const { firstName, lastName, phoneno, address } = req.body;
  const { id } =req.params
  db.query(sql, [firstName, lastName, phoneno, address, id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows == 0)
      return res.send(createResult("User not found", null));
    res.send(createResult(null, "Profile updated"));
  });
});

// 4: POST /users/signin - Login
router.post("/signin", (req, res, next) => {
  const sql =
    "SELECT id, firstName, lastName, email, password, phoneno, address FROM user WHERE email = ?";
  db.query(sql, [req.body.email], async (err, result) => {
    if (err) return next(err);
    let user = null;
    let error = err;
    let passwordMatched = false;
    if (result.length > 0) {
      passwordMatched = req.body.password === result[0].password;
      if (passwordMatched) {
        user = result[0];
        delete user.password;
      }
    }
    if (!passwordMatched) error = "Invalid email or password";
    res.send(createResult(error, user));
  });
});

module.exports = router;
