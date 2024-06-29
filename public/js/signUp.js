// Sign up form 
const signupFormHandler = async (event) => {
    event.preventDefault();
    hideSignUpAlert();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if(!username || !password || password.length < 8) {signUpAlert()}
  
    if (username && password && password.length > 8) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
    // This automatically logs the user in after a successful sign up
      if (response.ok) {
        document.location.replace('/');
      } else {
        signUpAlert();
      }
    }
  };

  const signUpAlert = () => {
    const signUpAlert = document.querySelector('#signUpAlert');
    signUpAlert.style.display = 'block';
  }
  
  const hideSignUpAlert = () => {
    const signUpAlert = document.querySelector('#signUpAlert');
    signUpAlert.style.display = 'none';
  }
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);

  document
    .querySelector('#signupBtn')
    .addEventListener('submit', signupFormHandler);

    
  