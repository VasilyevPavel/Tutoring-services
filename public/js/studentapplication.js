const studentForm = document.querySelector('#studentCabinet');
if (studentForm) {
  const studentSubjectBtn = document.querySelectorAll('.studentSubjectBtn');

  if (studentSubjectBtn) {
    studentSubjectBtn.forEach((studentBtn) => {
      studentBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const subjectId = studentBtn.getAttribute('data-subject-id');

        try {
          const response = await fetch(`/student/lessons/${subjectId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const availebleLessons = await response.json();

            if (typeof availebleLessons === 'object' && availebleLessons !== null) {
              const mainContainer = document.querySelector('#studentContainer');
              let divLessons = document.querySelector('.divLessons');

              if (divLessons) {
                divLessons.remove();
              } else {
                divLessons = document.createElement('div');
                divLessons.classList = 'divLessons';

                const { availebleLessons: lessons, teachers, subjects } = availebleLessons;
                console.log(availebleLessons);

                lessons.forEach((lesson) => {
                  const { startTime, endTime, teacherId } = lesson;
                  const lessonCard = document.createElement('div');

                  lessonCard.classList = 'lesson-card card';
                  lessonCard.innerHTML = `
                  <h4>Предмет:${subjects.find((el) => el.id === lesson.subjectId).name}</h4>
                    <h4>Дата урока: ${new Date(startTime).toLocaleDateString()}</h4>
                    <h4>Начало: ${new Date(startTime).toLocaleTimeString()}</h4>
                    <h4>Конец: ${new Date(endTime).toLocaleTimeString()}</h4>
                    <h4>Преподаватель: ${teachers.find((el) => el.id === teacherId).name}</h4>
                    <button class="bookLessonBtn" data-lesson-id="${lesson.id}" data-subject-id="${subjectId}">Забронировать</button>

                  `;

                  lessonCard.querySelector('.bookLessonBtn').addEventListener('click', async (event) => {
                    event.preventDefault();

                    const timeslotId = event.target.getAttribute('data-lesson-id');
                    try {
                      console.log('test');
                      const response = await fetch(`student/lessons/lesson/${timeslotId}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });

                      if (response.status === 200) {
                        setTimeout(() => {
                          window.location.reload();
                        }, 1000);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  });

                  divLessons.appendChild(lessonCard);
                });

                mainContainer.appendChild(divLessons);
              }
            } else {
              console.log('что-то не так с объектом');
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
  }
}
