let spandate = document.getElementById("date");
let spantime = document.getElementById("time");
let spanmounth = document.getElementById("mounth");
let spanyear = document.getElementById("year");
let spanweekday = document.getElementById("weekday");

const Loadpage = () => {
  const dateObj = new Date();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const weekday = dateObj.toLocaleString("default", { weekday: "long" });
  const year = dateObj.getFullYear();
  const date = dateObj.getDate();
  const time = dateObj.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  spandate.innerHTML = date;
  spantime.innerHTML = time;
  spanmounth.innerHTML = month;
  spanyear.innerHTML = year;
  spanweekday.innerHTML = weekday;

  // get the user info if the user is signed in
  const user = auth.currentUser;
  if (user) {
    console.log(user + " is signed in");
  } else {
    console.log("No user is signed in");
  }
};

const signup = document.getElementById("signup-form");

signup.addEventListener("submit", (e) => {
  e.preventDefault(); //

  // get user info
  const name = signup["name"].value;
  const email = signup["email"].value;
  const password = signup["password"].value;
  console.log(name, email, password);

  signup.reset(); // reset the form

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    return db
      .collection("users") // create a collection in the database
      .doc(cred.user.uid) // create a document in the collection
      .set({
        name: name,
        email: email,
        password: password,
      }) // set the data in the document
      .then(() => {
        console.log("user added to the database");
        location.href = "login.html";
      }) // redirect to the login page
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      }); // catch any errors
  });
});
