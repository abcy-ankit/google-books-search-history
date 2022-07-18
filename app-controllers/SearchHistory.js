const SearchHistory = require("../app-models/SearchHistory");

const saveHistory = async (req, res) => {
    const { query, name, email } = req.body;
    if (!query) {
        res.status(422).send("Please provide a valid query");
    }
    if (!name) {
        res.status(422).send("Please provide a valid name");
    }
    if (!email) {
        res.status(422).send("Please provide a valid email");
    }
    try {
        const emailExists = await SearchHistory.findOne({ email });
        if (!emailExists) {
            await SearchHistory.create({ name, email, searchQueries: { query } });
        } else {
            await SearchHistory.findOneAndUpdate({ email }, { $push: { searchQueries: { query } } });
        }
        res.status(200).send(`Added new book search query for ${email}`);
    } catch (error) {
        console.log(error);
        res.status(422).send("Unexpected error!");
    }
};

const getHistory = (req, res) => {
    SearchHistory.find()
    .select("name email searchQueries -_id")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(422).json(err));
};

module.exports = { saveHistory, getHistory };