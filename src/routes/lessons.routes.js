const express = require('express');

const router = express.Router();
const {
  Subject, Teacher, Timeslot, Student,
} = require('../../db/models');
const isAuth = require('../middlewares/isAuth');

router.get('/:subjectId', isAuth, async (req, res) => {
  const { subjectId } = req.params;
  try {
    const subjects = await Subject.findAll({ raw: true });
    const teachers = await Teacher.findAll({ raw: true });
    const availebleLessons = await Timeslot.findAll({
      where: { subjectId, isBooked: false }, raw: true,
    });
    // console.log(availebleLessons);
    res.json({ availebleLessons, teachers, subjects });
  } catch (error) {
    console.log(error);
  }
  // try {
  //   const subject = await Subject.findOne({
  //     where: { id: subjectId },
  //     include: { model: Teacher },
  //   });

  //   if (subject) {
  //     const teachers = await subject.getTeachers();
  //     res.json(teachers);
  //   } else {
  //     res.status(404).json({ error: 'Subject not found' });
  //   }
  // } catch (error) {
  //   res.status(500).json({ error: 'Internal server error' });
  // }
});
router.put('/lesson/:lessonId', isAuth, async (req, res) => {
  try {
    const timeslotId = req.params.lessonId;
    const { login } = req.session;

    const timeslotToBook = await Timeslot.findByPk(timeslotId);
    const student = await Student.findOne({ where: { login }, raw: true });
    timeslotToBook.isBooked = true;
    timeslotToBook.studentId = student.id;
    await timeslotToBook.save();
    res.end();
  } catch (error) {
    console.log(error);
  }
});
router.post('/api/teacher/lessons', isAuth, async (req, res) => {
  try {
    const savedTimeslots = await Promise.all(
      events.map((event) => Timeslot.create({
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
        backgroundColor: event.backgroundColor,

      })),
    );

    res.status(200).json({ message: 'Timeslots saved successfully', timeslots: savedTimeslots });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
