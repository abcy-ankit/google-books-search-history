const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({
    query: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
}, { _id : false });

const SearchHistorySchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	searchQueries: { type: [QuerySchema], default: [] }
}, { timestamps: true });

module.exports = SearchHistory = mongoose.model("query", SearchHistorySchema);