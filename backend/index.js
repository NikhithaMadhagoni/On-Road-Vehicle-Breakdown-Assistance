const express = require('express')
const app = express()
const PORT = 3020
const routes = require("./routes/indexroutes.js")
const mongoose = require('mongoose')

app.use(express.json());

mongoose.connect(`mongodb://localhost:27017/ORVBA`)
    .then(() => console.log("Database Connected Sucessfully"))
    .catch((err) => console.log("Error in connecting database", err))


app.use("/api", routes)

app.listen(PORT, () => { console.log(`server is running in ${PORT}`) })