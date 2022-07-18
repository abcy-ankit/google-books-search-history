const express = require("express");
const mongoDB = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/search-history", require("../app-routes/books-search-history"));

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.log("Please set your DB URL");
    process.exit(1);
} else {
    mongoDB.connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log("Database connected!");
    }).catch((error) => {
        console.log(error);
        process.exit(1);
    });
}
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));