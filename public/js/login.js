// Handles login
const loginFormHandler = async (event) => {
  event.preventDefault();
  hideLoginAlert();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the home page
      // document.location = ('/');
      document.location.replace('/');
      // changed from this to render logout button on login not on next page load
    } else {
      loginAlert();
    }
  }
};

const loginAlert = () => {
  const loginAlert = document.querySelector('#loginAlert');
  loginAlert.style.display = 'block';
}

const hideLoginAlert = () => {
  const loginAlert = document.querySelector('#loginAlert');
  loginAlert.style.display = 'none';
}

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('#loginBtn')
  .addEventListener('click', loginFormHandler);