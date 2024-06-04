// Toastify
const showtoast = (msg, type) => {
  let first = "";
  let second = "";
  if (type == "error") {
    first = "red";
    second = "#0000";
  } else if (type == "success") {
    first = " #00b09b";
    second = "#96c93d";
  }

  Toastify({
    text: msg,
    duration: 3000,
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

// Todo List

const titleField = document.getElementById("titleField");
const descriptionField = document.getElementById("descriptionField");
const addBtn = document.getElementById("btn-add");
const editBtn = document.getElementById("btn-edit");
const updateBtn = document.getElementById("btn-update");
const todoList = [];

class TodoTask {
  constructor(title, description, date, id, status, createdAt, userId) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
    this.userId = userId;
  }
}

function getDate() {
  const dateObj = new Date();
  const month = dateObj.getMonth();
  const date = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${date}/${month + 1}/${year}`;
}

addBtn.addEventListener("click", (e) => {
  if (titleField.value === "" || descriptionField === "") {
    showtoast("Fill out both input fields.", "error");
    return;
  }
  const task = new TodoTask(
    titleField.value,
    descriptionField.value,
    getDate(),
    crypto.randomUUID().slice(0, 5),
    false,
    new Date(),
    JSON.parse()(JSON.parse(localStorage.getItem("currentUser")))
  );

  todoList.push(task);
  console.log(todoList);
  updateList();
});

let taskIndex;
let isEditing = false;
editBtn.addEventListener("click", (e) => {
  taskIndex = Number(
    prompt("Enter serial number of the task you want to edit:")
  );
  if (taskIndex > todoList.length) {
    showtoast("Index value is greater than number of tasks.", "error");
    return;
  }
  if (taskIndex <= 0) {
    showtoast("Enter a valid index.", "error");
    return;
  }
  isEditing = true;
  titleField.value = todoList[taskIndex - 1].title;
  descriptionField.value = todoList[taskIndex - 1].description;
  showtoast(`Selected index ${taskIndex} for editing.`, "success");
});

updateBtn.addEventListener("click", (e) => {
  if (!isEditing) {
    showtoast(
      "Use the Edit button to select a task before you can update it.",
      "error"
    );
  }
  isEditing = false;
  todoList[taskIndex - 1].title = titleField.value;
  todoList[taskIndex - 1].description = descriptionField.value;
  updateList();
  showtoast("Updated the task.", "success");
});

function updateList() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  todoList.forEach((task, i) => {
    tbody.innerHTML += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${task.title}</td>
    <td>${task.description}</td>
    <td>${task.date}</td>
    <td>${task.status === false ? "❌" : "✔️"}</td>
    </tr>`;
  });
}

document.getElementById("logout").addEventListener("click", (e) => {
  window.location.replace("./login.html");
});
