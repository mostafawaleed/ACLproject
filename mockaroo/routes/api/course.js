const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  axios.get("https://api.mockaroo.com/api/cd7d21e0?count=50&key=78e63b20")
  .then(mock => {
    res.json(mock.data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json([]);
  });
});

module.exports = router;
