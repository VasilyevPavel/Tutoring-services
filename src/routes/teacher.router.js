const express = require('express');

const router = express.Router();
const { Subject, Teacher, Timeslot } = require('../../db/models');
const isAuth = require('../middlewares/isAuth');

router.get('/:id/timeslots', isAuth, async (req, res) => {
  try {
    const teacherId = req.params.id;
    const timeslots = await Timeslot.findOne({ teacherId });
    res.json(timeslots);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/:id/timeslots/all', isAuth, async (req, res) => {
  try {
    const subjectNames = await Subject.findAll({ raw: true });
    const teacherId = req.params.id;
    const timeslots = await Timeslot.findAll({ teacherId });
    res.json({ timeslots, subjectNames });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// DELETE /timeslot/:id
router.delete('/:id/delete', isAuth, async (req, res) => {
  try {
    const timeslotId = req.params.id;
    await Timeslot.destroy({ where: { id: timeslotId } });
    res.status(200).json({ message: 'Timeslot deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:id', isAuth, async (req, res) => {
  const { events } = req.body;

  try {
    await events.forEach((event) => {
      Timeslot.create({
        teacherId: req.params.id,
        subjectId: req.body.subjectId,
        startTime: event.start,
        endTime: event.end,
      });
    });
    res.status(200).json({ message: 'Timeslots saved successfully' });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
