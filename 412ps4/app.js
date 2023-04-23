// app.js
const express = require("express")
const path = require("path")
const ps4Router = require("./routes/ps4")

const app = express()

// set up middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// set up routes
app.use("/ps4", ps4Router)

// set up template engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// set up static files
app.use(express.static(path.join(__dirname, "public")))

// start server
app.listen(3000, () => {
  console.log("Server started on port 3000")
})
