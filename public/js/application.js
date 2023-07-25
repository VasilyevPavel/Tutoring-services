const teacherForm = document.querySelector('#teacherCabinet');
if (teacherForm) {
  const teacherCabinet = document.querySelector('#teacherCabinet');
  const teacherId = teacherCabinet.name;
  const subjectBtns = document.querySelectorAll('.subjectBtn');
  let calendar;
  const selectedEvents = [];

  async function fetchTimeslots() {
    try {
      const response = await fetch(`/teacher/${teacherId}/timeslots/all`);
      if (response.ok) {
        const { timeslots } = await response.json();
        const filteredTimeSlots = timeslots.filter((el) => el.teacherId === parseInt(teacherId));
        console.log(filteredTimeSlots);

        calendar.getEvents().forEach((event) => {
          event.remove();
        });

        filteredTimeSlots.forEach((timeslot) => {
          calendar.addEvent(formatTimeslotEvent(timeslot));
        });
      } else {
        console.log('Error fetching timeslots');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function formatTimeslotEvent(timeslot) {
    return {
      title: 'Lesson',
      start: timeslot.startTime,
      end: timeslot.endTime,
      allDay: false,
      backgroundColor: 'red',
      timeslotId: timeslot.id,
    };
  }

  if (subjectBtns) {
    subjectBtns.forEach((subjectBtn) => {
      const subjectId = subjectBtn.getAttribute('data-subject-id');
      const calendarContainer = document.getElementById('calendlyContainer');
      const screenWidth = window.innerWidth;
      const calendarWidth = (screenWidth * 70) / 100;
      calendarContainer.style.width = `${calendarWidth}px`;
      const saveButtonContainer = document.getElementById('saveButtonContainer');
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';

      calendar = new FullCalendar.Calendar(calendarContainer, {
        buttonText: {
          prev: 'Prev',
          next: 'Next',
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day',
          color: 'black',
        },
        themeSystem: 'bootstrap5',
        bootstrapFontAwesome: {
          prev: 'fa-chevron-left',
          next: 'fa-chevron-right',
        },
        bootstrapFontAwesomeV5: {
          prev: 'fas fa-chevron-left',
          next: 'fas fa-chevron-right',
        },
        windowResizeDelay: 200,
        initialView: 'timeGridWeek',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay',
        },
        selectable: true,
        select(info) {
          const eventObj = {
            title: 'Lesson',
            start: info.startStr,
            end: info.endStr,
            allDay: false,
            backgroundColor: 'red',
          };

          calendar.unselect();
          calendar.addEvent(eventObj);
          selectedEvents.push(eventObj);
        },
      });

      let calendarVisible = false;

      subjectBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        if (!calendarVisible) {
          calendarVisible = true;
          calendarContainer.style.display = 'block';
          calendar.render();

          await fetchTimeslots();

          saveButtonContainer.appendChild(saveButton);

          saveButton.addEventListener('click', async () => {
            try {
              const response = await fetch(`/teacher/${teacherId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ events: selectedEvents, subjectId }),
              });

              if (response.ok) {
                const newTimeslot = await response.json();
                calendar.addEvent(formatTimeslotEvent(newTimeslot));
                selectedEvents.length = 0;
                calendar.removeAllEvents();
                fetchTimeslots();
              } else {
                console.log('Error saving timeslots');
              }
            } catch (error) {
              console.log(error);
            }
          });
        } else {
          calendarVisible = false;
          calendarContainer.style.display = 'none';
          calendar.removeAllEvents();
          saveButtonContainer.innerHTML = '';
        }
      });
    });
  }

  const deleteLessonBtn = document.querySelectorAll('.delete-lesson-btn');

  if (deleteLessonBtn) {
    deleteLessonBtn.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        const timeslotId = event.target.getAttribute('data-timeslot-id');

        try {
          const response = await fetch(`/teacher/${timeslotId}/delete`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.status === 200) {
            const cardsContainer = document.querySelector('#lessonCardsContainer');
            if (cardsContainer) {
              const lessonCard = button.closest('.lesson-card');
              cardsContainer.removeChild(lessonCard);
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
  }
}
