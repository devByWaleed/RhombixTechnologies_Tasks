// Grasping All Elements
let todoInputField = document.getElementById("todo-input");
let submitButton = document.getElementById("submit-btn");
let todoContainer = document.getElementById("todo-item");
let clearButton = document.getElementById("clear-btn");



// All Events
submitButton.addEventListener("click", handleButtonClick);
document.addEventListener("DOMContentLoaded", loadTodos);
todoContainer.addEventListener("click", handleEditOrDeleteEvent);
clearButton.addEventListener("click", clearAllTodos);



// Function to display To-Do's from localStorage
function addTodoItem(event) {
  event.preventDefault();  // Prevent page reload on submit

  let newTodo = todoInputField.value.trim().toLowerCase();  // Get the value from input and convert to lowercase

  if (newTodo === "") {
    alert("You must write something!");  // Alert if input is empty
  } else {
    let savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

    // Convert all existing todos to lowercase for comparison
    let savedTodosLowerCase = savedTodos.map(todo => todo.toLowerCase());

    if (!savedTodosLowerCase.includes(newTodo)) {
      // Save new todo to local storage
      saveToLocalStorage(todoInputField.value.trim());  // Save the original case

      // Create ToDo Div
      let todoDiv = document.createElement("div");
      todoDiv.classList.add("display-cont");

      // Display User's ToDo
      let todoTextElement = document.createElement("p");
      todoTextElement.innerHTML = todoInputField.value;  // Display the original case
      todoTextElement.classList.add("edit-txt");

      // Create buttons div
      let buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("btns");

      // Edit Button
      let editButton = document.createElement("button");
      editButton.classList.add("edit-btn");
      editButton.innerHTML = '<i class="bi bi-pencil-fill"></i>';

      // Remove Button
      let deleteButton = document.createElement("button");
      deleteButton.classList.add("remove-btn");
      deleteButton.innerHTML = '<i class="bi bi-trash-fill"></i>';

      // Append buttons to div
      buttonsDiv.appendChild(editButton);
      buttonsDiv.appendChild(deleteButton);

      // Append text and buttons to the item div
      todoDiv.appendChild(todoTextElement);
      todoDiv.appendChild(buttonsDiv);

      // Append the item div to the display area
      todoContainer.appendChild(todoDiv);

      // Clear the input field after adding the to-do
      todoInputField.value = "";
    } else {
      alert("This To-Do already exists!!!");
    }
  }
}



// Function to handle Edit or Delete button clicks
function handleEditOrDeleteEvent(event) {
  const clickedElement = event.target;  // Get the clicked element

  if (clickedElement.classList.contains("remove-btn")) {
    const todoDiv = clickedElement.closest(".display-cont");  // Find parent container
    deleteFromLocalStorage(todoDiv);  // Remove from localStorage
    todoDiv.remove();  // Remove from the DOM
  }

  if (clickedElement.classList.contains('edit-btn')) {
    submitButton.innerText = 'Edit';  // Change submit button to "Edit"
    const todoDiv = clickedElement.closest(".display-cont");
    const todoTextElement = todoDiv.querySelector('.edit-txt');  // Find the current todo text

    // Populate input field with the existing todo for editing
    todoInputField.value = todoTextElement.innerHTML;

    // Store the original text in a data attribute
    submitButton.setAttribute('data-old-todo', todoTextElement.innerHTML);
  }
}



// Handle adding or editing a todo
function handleButtonClick(event) {
  event.preventDefault();  // Prevent default page reload

  const clickedButton = event.target;

  if (clickedButton.innerText === "Add") {
    addTodoItem(event);  // Add a new to-do
  }

  if (clickedButton.innerText === 'Edit') {
    updateTodoItem(event);  // Update existing to-do
    submitButton.innerText = 'Add';  // Change button text back to "Add"
  }
}



// Function for saving to localStorage
function saveToLocalStorage(todo) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));  // Save updated array to localStorage
}



// Update the todo in localStorage
function updateTodoItem() {
  let savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const oldTodoText = submitButton.getAttribute('data-old-todo');  // Get the original to-do text

  const todoIndex = savedTodos.indexOf(oldTodoText);  // Find the index of the old to-do
  if (todoIndex !== -1) {
    // Replace the old value with the new one from the input field
    savedTodos[todoIndex] = todoInputField.value;
    localStorage.setItem('todos', JSON.stringify(savedTodos));  // Update localStorage

    // Update the DOM by resetting the todo list
    todoContainer.innerHTML = "";  // Clear the display area
    loadTodos();  // Re-display all todos
    todoInputField.value = "";  // Clear the input field
  }
}



// Function to get To-Do's from localStorage and display them
function loadTodos() {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  savedTodos.forEach(function (todo) {
    // Create ToDo Div
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("display-cont");

    // Display User's ToDo
    let todoTextElement = document.createElement("p");
    todoTextElement.classList.add("edit-txt");
    todoTextElement.innerHTML = todo;

    // Create buttons div
    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("btns");

    // Edit Button
    let editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.innerHTML = '<i class="bi bi-pencil-fill"></i>';

    // Remove Button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("remove-btn");
    deleteButton.innerHTML = '<i class="bi bi-trash-fill"></i>';

    // Append buttons to div
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    // Append text and buttons to the item div
    todoDiv.appendChild(todoTextElement);
    todoDiv.appendChild(buttonsDiv);

    // Append the item div to the display area
    todoContainer.appendChild(todoDiv);
  });
}



// Function to delete the To-Do from localStorage
function deleteFromLocalStorage(todoDiv) {
  let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoText = todoDiv.querySelector(".edit-txt").innerText;  // Get the todo text

  const todoIndex = savedTodos.indexOf(todoText);  // Find the index in the array
  if (todoIndex !== -1) {
    savedTodos.splice(todoIndex, 1);  // Remove the todo
    localStorage.setItem("todos", JSON.stringify(savedTodos));  // Update localStorage
  }
}



// Function to clear all To-Do's
function clearAllTodos() {
  localStorage.clear();
  todoContainer.innerHTML = "";
}