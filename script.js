const createBtn = document.querySelector(".create-task-btn");
const createForm = document.querySelector(".create-task-form");
let inputTitle = document.querySelector("#input-title");
let inputDiscription = document.querySelector("#input-discription");

const mainField = document.querySelector(".main-field");
const curentTasks = document.querySelector("#development");
const doneTask = document.querySelector("#done");
const allTasksContainer = document.querySelector(".task-container-all");
const listAllTasks = document.querySelector(".list-all-task");
const lineTasks = document.querySelector(".task-line");

const selectDevelopment = document.querySelector("#select-development");
const selectDone = document.querySelector("#select-done");
const selectAll = document.querySelector("#select-all");
const closeAllTasks = document.querySelector(".close ");

// открыть форму создания задачи
createBtn.addEventListener("click", () => {
  createForm.style.display = "flex";
  inputTitle.focus();
});

// закрыть форму при клике вне ее
document.addEventListener("click", (e) => {
  if (
    e.target.closest(".create-task-form") === null &&
    e.target !== createBtn
  ) {
    closeForm();
  }
});

//получить данные из формы и создать задачу
createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTask = document.createElement("div");
  newTask.classList.add("task");
  curentTasks.append(newTask);

  const taskText = document.createElement("div");
  const taskDiscription = document.createElement("div");
  taskText.classList.add("task-text");
  taskDiscription.classList.add("task-text-discription");
  taskText.innerHTML = inputTitle.value;
  taskDiscription.innerHTML = inputDiscription.value;
  taskText.append(taskDiscription);
  newTask.append(taskText);

  const optionContainer = document.createElement("div");
  optionContainer.classList.add("option-container");

  const solvedBtn = document.createElement("button");
  solvedBtn.classList.add("option-btn");
  solvedBtn.id = "solved-btn";
  solvedBtn.innerHTML = '<img src="./img/check.png" alt="решено">';
  optionContainer.append(solvedBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("option-btn");
  deleteBtn.id = "delete-btn";
  deleteBtn.innerHTML = '<img src="./img/delete.png" alt="удалить">';
  optionContainer.append(deleteBtn);

  newTask.append(optionContainer);

  const newTaskHeight = newTask.offsetHeight;
  const mainFieldHeight = mainField.scrollHeight;
  mainField.style.height = mainFieldHeight + newTaskHeight + "px";

  closeForm();
});

// удалить задачу
document.addEventListener("click", (e) => {
  if (e.target.parentNode.id === "delete-btn") {
    const task = e.target.closest(".task");

    const taskHeight = task.offsetHeight;
    const mainFieldHeight = mainField.scrollHeight;
    mainField.style.height = mainFieldHeight - taskHeight + "px";

    task.remove();
  }
});

// отметить задачу как выполненную
document.addEventListener("click", (e) => {
  if (e.target.parentNode.id === "solved-btn") {
    const task = e.target.closest(".task");

    const returnBtn = e.target.parentNode;
    returnBtn.id = "return-btn";
    returnBtn.innerHTML = '<img src="./img/return.png" alt="вернуть">';
    doneTask.append(task);
  } else return;
});

//вернуть задачу как нерешенную
document.addEventListener("click", (e) => {
  if (e.target.parentNode.id === "return-btn") {
    const task = e.target.closest(".task");

    const solvedBtn = e.target.parentNode;
    solvedBtn.id = "solved-btn";
    solvedBtn.innerHTML = '<img src="./img/check.png" alt="выполнено">';
    curentTasks.append(task);
  } else return;
});

//показать/скрыть описание задачи
document.addEventListener("click", (e) => {
  if (e.target.closest(".task")) {
    const discriptionTask = e.target.closest(".task").firstChild.lastChild;
    const mainFieldHeight = mainField.scrollHeight;

    if (discriptionTask.style.display === "block") {
      mainField.style.height = mainFieldHeight - 80 + "px";
      discriptionTask.style.display = "none";
    } else {
      mainField.style.height = mainFieldHeight + 80 + "px";
      discriptionTask.style.display = "block";
    }
  }
});

// показать текущие задачи
selectDevelopment.addEventListener("click", () => {
  lineTasks.style.right = "0";
  allTasksHidden();
});

// показать выполненые задачи
selectDone.addEventListener("click", () => {
  lineTasks.style.right = "100%";
  allTasksHidden();
});

//показать все задачи
selectAll.addEventListener("click", () => {
  allTasksContainer.style.left = "0";
  selectAll.disabled = true;
  const curentTasksChildren = [...curentTasks.children];
  const doneTasksChildren = [...doneTask.children];

  curentTasksChildren.forEach((el) => {
    if (el.tagName === "DIV") {
      let elClone = el.cloneNode(true);
      elClone.lastChild.remove();
      listAllTasks.append(elClone);
    }
  });
  doneTasksChildren.forEach((el) => {
    if (el.tagName === "DIV") {
      let elClone = el.cloneNode(true);
      elClone.lastChild.remove();
      elClone.firstChild.style.textDecoration = "line-through solid red";
      listAllTasks.append(elClone);
    }
  });
});

//закрыть меню всех задач
closeAllTasks.addEventListener("click", () => {
  allTasksHidden();
});

function allTasksHidden() {
  allTasksContainer.style.left = "-1000px";
  listAllTasks.replaceChildren(closeAllTasks);
  selectAll.disabled = false;
}

function closeForm() {
  createForm.style.display = "none";
  inputTitle.value = "";
  inputDiscription.value = "";
}
