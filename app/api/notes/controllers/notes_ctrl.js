const {sequelize} = require('../../../database/models/index.js')
const moment = require('moment')
const fs = require("fs")


module.exports = {
    createNotes: createNotes,
    upNotes: upNotes,
    getNotes: getNotes,
    deleteNotes: deleteNotes
};


/* Function is use to Register new product


 * @return json
 */
async function createNotes(req, res) {
    if (Object.keys(req.body).length == 0) {
        return res.status(500).send({message: 'empty data'})
    }
    const name = req.body.name ? req.body.name : null;
    const time_stamp = req.body.time_stamp ? req.body.time_stamp : null;
    const description = req.body.description ? req.body.description : null;
    const category_id = req.body.category_id ? req.body.category_id : null;
    if (!name || !moment.isDate(time_stamp) || !time_stamp || !description || !category_id || isNaN(category_id)) {
        return res.status(500).send({message: 'not full or incorrect data'})
    }
    let newNotes = {
        name: name,
        time_stamp: time_stamp,
        description: description,
        category_id: category_id
    }
    try {
        let category = await sequelize.models.Category.findOne({where: {id: category_id}});
        console.log('category in create Notes');
        console.log(category)
        if (!category) {
            return res.status(500).send({message: 'invalid category id'})
        }
        let note = await sequelize.models.Notes.create(newNotes);
        return res.status(200).send({message: 'Ok', data: note})
    } catch (error) {
        return res.status(500).send({message: 'something is wrong, please try again', error: error})
    }

}


/* Function is use to update product
 * @return json
 */
async function upNotes(req, res) {
    if (Object.keys(req.body).length < 2) {
        return res.status(500).send({message: 'empty data'});

    }
    const id = req.body.id ? req.body.id : null;
    const name = req.body.name ? req.body.name : null;
    const time_stamp = req.body.time_stamp ? req.body.time_stamp : null;
    const description = req.body.description ? req.body.description : null;
    const category_id = req.body.category_id ? req.body.category_id : null;
    if (!id || isNaN(id)) {
        return res.status(500).send({message: 'need id note'})
    }

    let newNotes = {};
    if (name && name.length) {
        newNotes.name = name;
    }
    if (time_stamp) {
        if (!moment.isDate(time_stamp)) {
            return res.status(500).send({message: 'incorrect format date'})
        }
        newNotes.time_stamp = time_stamp;
    }
    if (category_id) {
        if (isNaN(category_id)) {
            return res.status(500).send({message: 'incorrect category id'})
        }
        newNotes.category_id = category_id;
    }
    if (description && description.length) {
        newNotes.description = description;
    }

    try {
        let category = await sequelize.models.Category.findOne({where: {id: category_id}});
        if (!category) {
            return res.status(500).send({message: 'invalid category id'})
        }
        let note = await sequelize.models.Notes.update(newNotes, {where: {id: id}});

        return res.status(200).send({message: 'Ok', data: note});
    } catch (error) {
        console.log('this', error)
        return res.status(500).send({message: 'something is wrong, please try again', error: error});
    }


}


/* Function is use to get list products
 * @return json
 */
async function getNotes(req, res) {
    try {
        let notes = await sequelize.models.Notes.findAll({
            attributes: ['id', 'name', 'time_stamp', 'description'],
            include: {
                model: sequelize.models.Categories,
                attributes: ['id','name'],

            }

        });
        return res.status(200).send({message: 'ok', notes: notes})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'something is wrong, please try again', error: error})

    }

}


/* Function is use to delete product
 * @return json
 */
async function deleteNotes(req, res) {
    const id = req.body.id ? req.body.id : null;
    if (!id || isNaN(id)) {
        return res.status(500).send({message: 'need id note'})
    }

    try {
        let note = await sequelize.models.Notes.destroy({where: {id: id}});
        return  res.status(200).send({message: 'ok'})
    } catch (error) {
        return  res.status(500).send({message: 'something is wrong, please try again', error: error})

    }


}
