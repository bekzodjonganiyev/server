const express = require("express")
const router = express.Router()

router.get("/",  (req, res) => {
    res.send("Server is running and up")
})

module.exports = router