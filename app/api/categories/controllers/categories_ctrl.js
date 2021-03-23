const {sequelize} = require('../../../database/models/index.js')
const fs = require("fs")


module.exports = {
    createCategories: createCategories,
    upCategories: upCategories,
    getCategories: getCategories,
    deleteCategories: deleteCategories
};


/* Function is use to Register new product
 * @return json
 */
async function createCategories(req, res) {
    const name = req.body.name ? req.body.name : null;
    const description = req.body.description ? req.body.description : null;
    if (!name) {
        return res.status(500).send({message: 'need name'})
    }
    let newCategory = {
        name: name,
        description:description
    }
    try {

        let category = await sequelize.models.Categories.create(newCategory);
        return res.status(200).send({message: 'Ok', category: category})
    } catch (error) {
        return res.status(500).send({message: 'something is wrong, please try again', error: error})
    }

}

/* Function is use to Register new product
 * @return json
 */

async function upCategories(req, res) {
    if (Object.keys(req.body).length < 2) {
        return res.status(500).send({message: 'empty data'});
    }
    const id = req.body.id ? req.body.id : null;
    const name = req.body.name ? req.body.name : null;
    const description = req.body.description ? req.body.description : null;
    if (!id || isNaN(id)) {
        return res.status(500).send({message: 'need id category'})
    }

    let newCategory = {};
    if (name && name.length) {
        newCategory.name = name;
    }

    if (description && description.length) {
        newCategory.description = description;
    }

    try {
        let note = await sequelize.models.Categories.update(newCategory, {where: {id: id}});
        return res.status(200).send({message: 'Ok', data: note});
    } catch (error) {
        console.log('this', error)
        return res.status(500).send({message: 'something is wrong, please try again', error: error});
    }


}


/* Function is use to get list products
 * @return json
 */
async function getCategories(req, res) {
    try {
        let categories = await sequelize.models.Categories.findAll({attributes: ['id', 'name', 'description']});
        return res.status(200).send({message: 'ok', categories: categories})
    } catch (error) {
        return res.status(500).send({message: 'something is wrong, please try again', error: error})

    }

}


/* Function is use to delete product
 * @return json
 */
async function deleteCategories(req, res) {
    const id = req.query.id ? req.query.id : null;
    if (!id || isNaN(id)) {
        return res.status(500).send({message: 'need id category'})
    }
    try {
        let notes = await sequelize.models.Notes.findOne({
            where: {category_id: id}
        })
        if (notes) {
            return res.status(500).send({message: 'delete all notes who have this category for deleting this category'})

        }
        let category = await sequelize.models.Categories.destroy({where: {id: id}});
        return res.status(200).send({message: 'ok'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'something is wrong, please try again', error: error})

    }


}
