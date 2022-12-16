const login = document.querySelector("#login-form"); // create a variable to store the login form
login.addEventListener("submit", (e) => {
  // add an event listener to the login form
  e.preventDefault(); // prevent the default action of the form,prevent means stop the default action of the form
  // get user info
  const email = login["login-email"].value; // get the email value from the login form
  const password = login["login-password"].value; // get the password value from the login form
  // log the user in
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      // sign in the user with the email and password
      console.log("user logged in");
      location.href = "users.html"; // redirect the user to the index.html page
    })
    .catch((err) => {
      // if there is an error
      console.log(err.message); // log the error message
      const loginerror = document.querySelector("#login-error"); // create a variable to store the login error
      loginerror.innerHTML = err.message; // display the error message
    });
});
