const router = require('express').Router();

const Home = require('../views/Home');
const Login = require('../views/Login');
const Registration = require('../views/Registration');
const TeacherCabinet = require('../views/TeacherCabinet');
const StudentCabinet = require('../views/StudentCabinet');
const {
  Student, Teacher, Subject, StudentTeacher, Timeslot,
} = require('../../db/models');
const isAuth = require('../middlewares/isAuth');

router.get('/random-book-cover', async (req, res) => {
  try {
    const bookId = ['OL4469414M', 'OL27835839M', 'OL12127740M', 'OL11454270M', 'OL6645622M', 'OL35348960M',
      'OL25481058M', 'OL23389372M', 'OL11253194M', 'OL25225825M', 'OL25225825M', 'OL14021704M', 'OL23719248M', 'OL26284107M',
      'OL1549221M', 'OL1549221M', 'OL7435107M', 'OL23419984M', 'OL5183975M', 'OL15010481M', 'OL11094198M', 'OL25612600M'];
    const randomId = bookId[Math.floor(Math.random() * bookId.length)];

    const response = await fetch(`https://openlibrary.org/works/${randomId}.json`);
    const data = await response.json();
    if (data && data.title) {
      const coverId = data.covers[0];
      const bookTitle = data.title;

      if (coverId) {
        const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
        res.json({ coverUrl, bookTitle });
      } else {
        res.status(400).json({ error: 'Обложка книги не найдена.' });
      }
    } else {
      res.status(400).json({ error: 'Книги не найдены.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const title = 'Home';
    const { login, userType } = req.session;

    const randomCoverResponses = await Promise.all([
      fetch('http://localhost:3000/random-book-cover'),
      fetch('http://localhost:3000/random-book-cover'),
      fetch('http://localhost:3000/random-book-cover'),
    ]);

    const randomCoverData = await Promise.all(randomCoverResponses.map((response) => response.json()));

    const books = randomCoverData.map((data) => {
      const coverUrl = data.coverUrl || '';
      const bookTitle = data.bookTitle || '';
      return { coverUrl, bookTitle };
    });

    res.render(Home, {
      title,
      login,
      userType,
      books,
    });
  } catch (error) {
    console.error(error);
  }
});

router.get('/login', (req, res) => {
  const title = 'Login';
  const { login, user, userType } = req.session;
  res.render(Login, {
    title, login, user, userType,
  });
});

router.get('/registration', (req, res) => {
  const title = 'Registration';
  res.render(Registration, { title });
});

router.get('/teacher', isAuth, async (req, res) => {
  const title = 'Home';
  const subjectsAdd = await Subject.findAll({ raw: true });
  const { login, user, userType } = req.session;
  const teacher = await Teacher.findOne({ where: { login }, raw: true });
  const teacherId = teacher.id;

  const subjectNames = await Subject.findAll({ raw: true });

  try {
    const timeslots = await Timeslot.findAll({
      where: { teacherId },
      raw: true,
    });

    res.render(TeacherCabinet, {
      title,
      login,
      user,
      subjectsAdd,
      teacherId,
      timeslots,
      subjectNames,
      userType,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/student', isAuth, async (req, res) => {
  const title = 'Home';
  const { login, user, userType } = req.session;

  const student = await Student.findOne({
    where: { login },

    raw: true,
    nest: true,
  });
  const lessons = await Timeslot.findAll({
    where: { studentId: student.id }, raw: true, nest: true,
  });

  const subjectsAdd = await Subject.findAll({ raw: true });

  res.render(StudentCabinet, {
    title, login, user, subjectsAdd, lessons, userType,
  });
});

module.exports = router;
