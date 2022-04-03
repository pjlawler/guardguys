const router = require('express').Router();
const { Event, User } = require('../../models');

//Create
router.post('/', (req, res) => {
    Event.create({
        date: req.body.date,
        start_time: req.body.start_time,
        event: req.body.event,
        onsite: req.body.onsite,
        notes: req.body.notes,
        duration: req.body.duration,
        recurring: req.body.recurring,
        user_id: req.body.user_id
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Read All
router.get('/', (req, res) => {
    Event.findAll({
        include: {
            model: User,
            attributes: ['username']
        }
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        // res.status(500).json(err)
        res.status(501).json({message: 'error in event get all'})
    });
});
router.get('/:id', (req, res) => {
    Event.findOne({
        where: { id: req.params.id },
        include: {
            model: User,
            attributes: ['username']
        }
    })
    .then(dbEventData => {
        if(!dbEventData){
            res.json(404).json({message: 'No event found with this id'});
            return;
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        // res.status(500).json(err);
        res.status(501).json({message: 'error in event get one'})
    });
});

// Update
router.put('/:id', (req, res) => {
    Event.update(req.body, {
        where: { id: req.params.id }
    })
    .then(dbEventData => {
        if(!dbEventData[0]) {
            res.status(404).json({ message: 'No event found with this id'});
            return;
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete
router.delete('/:id', (req, res) => {
    Event.destroy({
        where: { id: req.params.id }
    })
    .then(dbEventData => {
        if(!dbEventData) {
            res.status(404).json({message: 'No event found with this id'});
            return;
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router;