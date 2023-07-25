const { regForm, logForm } = document.forms;
const registerInfo = document.querySelector('#registerInfo');
const loginInfo = document.querySelector('#loginInfo');

regForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch('/auth/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: e.target.name.value,
      lastName: e.target.lastName.value,
      login: e.target.login.value,
      password: e.target.password.value,
      userType: e.target.userType.value,
    }),
  });
  const responseJson = await response.json();
  if (response.status === 200) {
    registerInfo.innerHTML = responseJson.success;

    if (e.target.userType.value === 'teacher') {
      setTimeout(() => {
        window.location.href = '/teacher';
      }, 3000);
    } else {
      setTimeout(() => {
        window.location = '/student';
      }, 3000);
    }
  } else {
    registerInfo.innerHTML = responseJson.error;
  }
  // if (isValidEmail(e.target.login.value)) {
  //   const response = await submitForm('/auth/reg', e.target);
  //   if (response.status === 200) {
  //     window.location.href = '/login';
  //   } else if (response.status === 401) {
  //     errorMessage(
  //       'Адрес электронной почты уже занят',
  //       regForm,
  //     );
  //   }
  // } else {
  //   errorMessage(
  //     'Не верный формат электронной почты.',
  //     regForm,
  //   );
  // }
});
logForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch('/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      login: e.target.login.value,
      password: e.target.password.value,
      userType: e.target.userType.value,
    }),
  });
  const responseJson = await response.json();
  if (response.status === 200) {
    loginInfo.innerHTML = responseJson.success;

    if (e.target.userType.value === 'teacher') {
      setTimeout(() => {
        window.location.href = '/teacher';
      }, 3000);
    } else {
      setTimeout(() => {
        window.location = '/student';
      }, 3000);
    }
  } else {
    loginInfo.innerHTML = responseJson.error;
  }

  // if (isValidEmail(e.target.login.value)) {
  //   const response = await submitForm('/auth/login', e.target);
  //   if (response.status === 200) {
  //     window.location.href = '/';
  //   } else {
  //     errorMessage(
  //       'Неправильный адрес электронной почты или пароль',
  //       logForm,
  //     );
  //   }
  // } else {
  //   errorMessage(
  //     'Введите правильный формат электронной почты.',
  //     logForm,
  //   );
  // }
});
