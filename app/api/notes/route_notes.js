module.exports = function (router) {

    const notes = require('./controllers/notes_ctrl');

    router.post('/createNotes', [], notes.createNotes);
    router.put('/upNotes', [], notes.upNotes);
    router.get('/getNotes', [], notes.getNotes);
    router.delete('/deleteNotes', [], notes.deleteNotes);


    return router;
}
