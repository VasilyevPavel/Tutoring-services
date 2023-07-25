const React = require('react');
const Layout = require('./Layout');

module.exports = function StudentCabinet({
  title, login, user, subjectsAdd, lessons,
}) {
  console.log(lessons);
  return (
    <Layout user={user}>
      <h3 style={{ textAlign: 'center' }}>Добавьте предмет для изучения</h3>
      <form method="get" id="studentCabinet" className="cabinetForm">
        <div>
          <table>
            <tbody className="flexBtns">
              {subjectsAdd.map((subject) => (
                <tr key={subject.id}>
                  <td>
                    <button
                      className="studentSubjectBtn button"
                      id={subject.id}
                      type="submit"
                      data-subject-id={subject.id}
                    >
                      {subject.name}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
      <div id="studentContainer" />
      <h3 style={{ textAlign: 'center' }}>Предстоящие уроки</h3>
      {lessons.length > 0 ? (
        <div id="lessonCardsContainer" className="lesson-cards">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card card">
              <h4>
                Предмет:
                {subjectsAdd.find((el) => el.id === lesson.subjectId).name}
                {lesson.subject}
              </h4>
              <h4>
                Начало:
                {' '}
                {lesson.startTime.toString().slice(0, 21)}
              </h4>
              <h4>
                Конец:
                {' '}
                {lesson.endTime.toString().slice(0, 21)}
              </h4>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>Нет запланированных уроков</p>
      )}
    </Layout>
  );
};
