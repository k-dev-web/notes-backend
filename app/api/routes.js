module.exports = function (express) {

    let router = express.Router();
    require('./notes/route_notes')(router);
    require('./categories/route_categories')(router);

    return router;
}
