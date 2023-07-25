const React = require('react');
const Layout = require('./Layout');

module.exports = function TeacherCabinet({
  title, login, user, subjectsAdd, teacherId,
  timeslots, subjectNames,
}) {
  return (
    <Layout user={user}>
      <h3 style={{ textAlign: 'center' }}>Добавьте предмет для преподавания</h3>
      <form name={teacherId} method="get" id="teacherCabinet" className="cabinetForm">
        <div className="teacherBtn">
          <table>
            <tbody className="flexBtns">
              {subjectsAdd.map((subject) => (
                <tr key={subject.id}>
                  <td>
                    <button
                      className="subjectBtn"
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

        <h3>Предстоящие занятия</h3>
        {timeslots.length > 0 ? (
          <div id="lessonCardsContainer" className="lesson-cards">
            {timeslots.map((timeslot) => {
              const cardColorClass = timeslot.isBooked ? 'card-red' : 'card-green';
              const subject = subjectNames.find((el) => el.id === timeslot.subjectId);
              return (
                <div key={timeslot.id} className={`lesson-card card ${cardColorClass}`}>
                  <h4>
                    Предмет:
                    {' '}
                    {subject ? subject.name : ''}
                  </h4>
                  <h4>
                    Начало:
                    {' '}
                    {timeslot.startTime.toString().slice(0, 21)}
                  </h4>
                  <h4>
                    Конец:
                    {' '}
                    {timeslot.endTime.toString().slice(0, 21)}
                  </h4>
                  <button
                    className="delete-lesson-btn"
                    type="submit"
                    method="delete"
                    data-timeslot-id={timeslot.id}
                  >
                    Отменить занятие
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Нет запланированных уроков</p>
        )}
        <div name={teacherId} id="saveButtonContainer" />

        <div id="calendlyContainer" />
        <div />
      </form>
    </Layout>
  );
};
