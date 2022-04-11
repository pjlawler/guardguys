const router = require('express').Router();
const { Event, User } = require('../../models');
const { getWeekParams } = require('../../utils/helpers');
const { Op } = require('sequelize');

// create
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
// read all
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
        res.status(500).json(err)
    });
});
// read one
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
        res.status(500).json(err);
    });
});
// read all for week
router.get('/weekof/:week', (req, res)=> {
    const date_range = getWeekParams(req.params.week);
    Event.findAll({
        where: { date: {[Op.between]: [date_range.from, date_range.to]}},
        include: {
            model: User,
            attributes: ['username']
        },
        order: ['date']
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }); 
})
// update
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
// delete
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