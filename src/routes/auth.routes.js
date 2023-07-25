const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Student, Teacher } = require('../../db/models');
const isAuth = require('../middlewares/isAuth');

router.post('/register', async (req, res) => {
  try {
    const {
      name, lastName, login, password, userType,
    } = req.body;

    if (userType === 'student') {
      const existingStudent = await Student.findOne({
        where: { login },
      });

      if (existingStudent) {
        res.status(400).json({ error: 'Пользователь с таким логином уже существует' });
      } else {
        await Student.create({
          name,
          lastName,
          login,
          password,
        });
        req.session.login = login;
        req.session.user = name;
        req.session.role = userType;
        res.json({ success: 'Пользователь создан, вы будуте перенаправлены в личный кабинет' });
      }
    } else if (userType === 'teacher') {
      const existingTeacher = await Teacher.findOne({
        where: { login },
      });

      if (existingTeacher) {
        res.status(400).json({ error: 'Пользователь с таким логином уже существует' });
      } else {
        await Teacher.create({
          name,
          lastName,
          login,
          password,
        });
        req.session.login = login;
        req.session.user = name;
        req.session.role = userType;
        res.json({ success: 'Пользователь создан, вы будуте перенаправлены в личный кабинет' });
      }
    }
    // const sikret = await bcrypt.hash(req.body.password, 10);
    // const {
    //   name, lastName, login, password,
    // } = req.body;
    // await User.create(
    //   {
    //     name,
    //     lastName,
    //     login,
    //     password,
    //   },
    //   {
    //     returning: true,
    //     plain: true,
    //   },
    // );

    // res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
  }
});

router.post('/login', async (req, res) => {
  const { login, password, userType } = req.body;

  if (userType === 'student') {
    const student = await Student.findOne({ where: { login, password } });

    if (!student) {
      return res.status(400).json({ error: 'Логин или пароль не правильные' });
    }
    // const passwordIsValid = await bcrypt.compare(password, user.password);
    // if (!passwordIsValid) {
    //   return res.sendStatus(401);
    // }
    req.session.login = login;
    req.session.user = student.name;
    req.session.role = userType;

    res.json({ success: `Добро пожаловать ${student.name}` });
  } else if (userType === 'teacher') {
    const teacher = await Teacher.findOne({ where: { login, password } });
    if (!teacher) {
      return res.status(400).json({ error: 'Логин или пароль не правильные' });
    }
    // const passwordIsValid = await bcrypt.compare(password, user.password);
    // if (!passwordIsValid) {
    //   return res.sendStatus(401);
    // }
    req.session.login = login;
    req.session.user = teacher.name;
    req.session.role = userType;
    res.json({ success: `Добро пожаловать ${teacher.name}` });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((e) => {
    if (e) {
      console.log(e);
      return;
    }
    res.clearCookie('UserAuth');
    res.redirect('/');
  });
});

module.exports = router;
