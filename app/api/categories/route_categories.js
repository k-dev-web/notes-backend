module.exports = function (router) {

    const categories = require('./controllers/categories_ctrl');

    router.post('/createCategories', [], categories.createCategories);
    router.put('/upCategories', [], categories.upCategories);
    router.get('/getCategories', [], categories.getCategories);
    router.delete('/deleteCategories', [], categories.deleteCategories);


    return router;
}
