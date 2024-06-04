// Functions for my ease

const getInputFieldValue = (id) => document.getElementById(id).value;

const showtoast = (msg, type) => {
  let first = "";
  let second = "";
  if (type == "error") {
    first = "black";
    second = "red";
  } else if (type == "success") {
    first = " #00b09b";
    second = "#96c93d";
  }

  Toastify({
    text: msg,
    duration: 2000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "left",
    stopOnFocus: true,

    style: {
      background: `linear-gradient(to right, ${first},${second})`,
    },
    onClick: function () {},
  }).showToast();
};

// Register User
let users = [];

function registerUser(event) {
  event.preventDefault();

  let email = getInputFieldValue("reg-email");
  let password = getInputFieldValue("reg-password");

  email = email.trim();
  password = password.trim();

  if (email.length <= 4) {
    showtoast("Please enter at least 5 characters in email field", "error");
    return;
  } else if (password.length <= 4) {
    showtoast("Please enter at least 5 characters in Password field", "error");
    return;
  }

  users.push({ email, password, uid: crypto.randomUUID() });

  localStorage.setItem("Users", JSON.stringify(users));
  console.log("Users:", users);

  document.getElementById("reg-email").value = "";
  document.getElementById("reg-password").value = "";
  showtoast("you are Successfully Register", "success");

  setInterval(() => {
    window.location.replace("./login.html");
  }, 3000);
}

// Login User

function loginUser() {
  event.preventDefault();
  let users1 = localStorage.getItem("Users");
  users1 = JSON.parse(users1);

  console.log("users1", users1);

  let logemail = getInputFieldValue("log-email");
  let logpassword = getInputFieldValue("log-password");

  logemail = logemail.trim();
  logpassword = logpassword.trim();

  if (logemail.length <= 4) {
    showtoast("Email must be atleast 5 characters long.", "error");
    return;
  } else if (logpassword.length <= 5) {
    showtoast("Password must be atleast 6 characters long.", "error");
    return;
  }

  for (let i = 0; i < users1.length; i++) {
    if (users1[i].email == logemail) {
      showtoast("Email is correct!", "success");
    } else {
      showtoast("Email is incorrect!", "error");
      return;
    }
    if (users1[i].password == logpassword) {
      showtoast("Password is correct!", "success");
    } else {
      showtoast("Password is not correct!", "error");
      return;
    }
  }

  localStorage.setItem("currentUser", logemail);

  setInterval(() => {
    window.location.replace("./todo.html");
  }, 3000);
}
