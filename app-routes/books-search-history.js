const AppRouter = require("express").Router();
const { saveHistory, getHistory } = require("../app-controllers/SearchHistory");

AppRouter.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    getHistory(req, res);
});

AppRouter.post("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    saveHistory(req, res);
});

module.exports = AppRouter;
