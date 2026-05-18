 const express = require("express");

 const router = express.Router();

 const {
    handleGenerateShortURL,
    getAnalytics
} = require("../controllers/urls");

 router.post("/", handleGenerateShortURL)

 router.get("/analytics/:shortId", getAnalytics)
 module.exports = router;