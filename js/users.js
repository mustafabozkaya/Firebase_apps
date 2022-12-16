let spandate = document.getElementById("date");
let spantime = document.getElementById("time");
let spanmonth = document.getElementById("month");
let spanyear = document.getElementById("year");
let spanweekday = document.getElementById("weekday");

let todoContainer = document.getElementById("todo-container");
let username = document.getElementById("username");

// logout function (called when the logout button is clicked
const logout = () => {
  auth.signOut().then(() => {
    console.log("user logged out");
    alert("You have been logged out");
    location.href = "index.html";
  });
};

const loadpage = () => {
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
  spanmonth.innerHTML = month;
  spanyear.innerHTML = year;
  spanweekday.innerHTML = weekday;
};

// get current hour
const dateObj = new Date();
const hour = dateObj.getHours();
let greeting;
if (hour < 12) {
  greeting = "Good Morning";
} else if (hour < 18) {
  greeting = "Good Afternoon";
} else {
  greeting = "Good Evening";
}

document.getElementById("greetings").innerHTML = greeting;

const renderTodo = (doc) => {
  console.log(doc);
  let li = document.createElement("li");
  li.setAttribute("data-id", doc.id);
  li.className = "w-100 d-flex todo-box";

  // create a div to store the todo text
  let todoText = document.createElement("p"); //
  todoText.textContent = doc.data().todo;

  //trash button
  let trash = document.createElement("i"); //
  trash.className = "fas fa-trash-alt";
  let trahsBtn = document.createElement("button");

  trahsBtn.appendChild(trash); // add the trash icon to the trash button
  li.appendChild(trahsBtn); // add the trash button to the todo list item
  li.appendChild(todoText); // add the todo text to the todo list item

  // insert li last in the todo container
  todoContainer.appendChild(li);
  // delete data
  trahsBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // stop the event from bubbling up
    let id = e.target.parentElement.parentElement.getAttribute("data-id");
    const ıserid = auth.currentUser.uid;
    console.log(id);
    console.log(ıserid);
    db.collection("todos").doc(ıserid).collection("userTodos").doc(id).delete();
  });
};

// get user data
auth.onAuthStateChanged((user) => {
  // alert("user logged in" + user.uid);
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          username.innerHTML = doc.data().name;
          // alert("user logged in" + doc.data().name);
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else {
    console.log("user logged out");
  }
});

// add todos
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dateObj = new Date();
  const timestamp = dateObj.getTime(); // get the current time in milliseconds
  console.log(timestamp);

  const todo = form["todos"].value;

  console.log("form submitted" + todo);

  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection("todos")
        .doc(user.uid)
        .collection("userTodos")
        .doc("_" + timestamp)
        .set({
          timestamp,
          todo,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      console.log("user logged out");
    }
  });

  form.reset();
});

//retrieve login users todos
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("todos") // get the todos collection
      .doc(user.uid) // get the document with the id of the logged in user
      .collection("userTodos") // get the userTodos collection
      .orderBy("timestamp", "desc") // order the todos by time
      .onSnapshot((snapshot) => {
        // listen for changes in the collection
        let changes = snapshot.docChanges(); // get the changes
        changes.forEach((change) => {
          if (change.type == "added") {
            // if a new todo is added
            renderTodo(change.doc); // render the todo
          } else if (change.type == "removed") {
            let li = todoContainer.querySelector(
              "[data-id=" + change.doc.id + "]"
            );
            todoContainer.removeChild(li);
          } else if (change.type == "modified") {
            let li = todoContainer.querySelector(
              "[data-id=" + change.doc.id + "]"
            );
            todoContainer.removeChild(li);
            renderTodo(change.doc);
          } else {
            console.log("error");
          }

          // if a todo is removed

          // if a todo is modified

          // if an error occurs
        });
      });
  } else {
    console.log("user logged out");
  }
});
