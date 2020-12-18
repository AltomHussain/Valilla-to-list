// The video will be here to continue https://www.youtube.com/watch?v=Ttf3CEsEwMQ

//Selectors
document.addEventListener("DOMContentLoaded", getTodos);
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
let warning = document.querySelector("#warning");
//Event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodos);
//Functions
function addTodo(e) {
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Add todo to localStorage
  saveLocalTodos(todoInput.value);
  //check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  ///append todo list
  if (todoInput.value !== "" && todoInput.value !== null) {
    todoList.appendChild(todoDiv);
     warning.innerText = ""
  } else {
    // let warning = document.createElement("p")
    warning.innerText = "What are you doing fill the field DUDE 😜";
  
   
  }
  //clear the input value
  todoInput.value = "";
}
//Delete function
function deleteCheck(e) {
  const item = e.target;
  //delete todo
  //console.log(item.classList[0], item.parentElement);
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTdo(todo);
    todo.addEventListener("transitioned", function () {
      todo.remove();
    });
  }

  //Check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodos(e) {
  let todos = Array.from(todoList.childNodes);
  todos.shift();
  todos.forEach((todo) => {
    console.log(todo);
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//this function will save the todos in the localStorage
function saveLocalTodos(todo) {
  //check--- do i have thing in there
  let todos;
  //To refactor maybe put this in small reusable function
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todoInput.value !== "" && todoInput.value !== null
    ? todos.push(todo)
    : alert("What are you doing dude 😂😜");

  localStorage.setItem("todos", JSON.stringify(todos));
}

//get todos from the localStorage
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //Should refactor it
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    ///append todo list
    todoList.appendChild(todoDiv);
  });
}
function removeLocalTdo(todo) {
  //check--- do i have thing in there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //You need to get the text from localStorage to delete
  const todoIndex = todo.children[0].innerText; //get the text from the List
  todos.splice(todos.indexOf(todoIndex), 1); //remove the indexof it
  //Set back the localStorage after you deleted it
  localStorage.setItem("todos", JSON.stringify(todos));
}
