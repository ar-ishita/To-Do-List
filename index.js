//this is doing for input
let todoInput = document.querySelector(".input");
//this is doing for button
let addTodoButton = document.querySelector(".button");
//get the container to show the todos list
let showTodos = document.querySelector(".todos-container");
//to get the todo input
let todo;

// Function to get the current date, time, and day
function getCurrentDateAndTime() {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const dateString = today.toLocaleDateString("en-US", options);
  return dateString;
}

//when we are refreshing we should get the same value
let localData = JSON.parse(localStorage.getItem("todo"));

//creating todo-list array
let todoList = localData || [];

/*creating function to get unique id*/
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (param) {
      let number = (Math.random() * 16) | 0;
      let randomNumber = param == "x" ? number : (number & 0x3) | 0x8;
      return randomNumber.toString(16);
    }
  );
}

//add event listener to the button
addTodoButton.addEventListener("click", (e) => {
  //using arrow function
  e.preventDefault(); //prevent our website to do the default action of reloading the page
  todo = todoInput.value; //get the value from the input

  if (todo.length > 0) {
    const currentDayTime = getCurrentDateAndTime();
    todoList.push({
      id: uuid(),
      todo,
      isCompleted: false,
      dateTime: currentDayTime,
    });
  }
  renderTodoList(todoList);
  //adding local storage
  localStorage.setItem("todo", JSON.stringify(todoList)); //we are storing entire todo list in the local storage
  todoInput.value = "";
  //console.log(todoList);
});

showTodos.addEventListener("click", (e) => {
  //lets the capture the todo item
  let key = e.target.dataset.key;
  //for delete button
  let delTodoKey = e.target.dataset.todokey;
  todoList = todoList.map((todo) =>
    todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  //deleting or removing from the array
  //this is will give all todos which are not equal to this delTodoKey
  todoList = todoList.filter((todo) => todo.id !== delTodoKey);
  localStorage.setItem("todo", JSON.stringify(todoList));
  renderTodoList(todoList);
  console.log(todoList);
});

/* function to show the input into container*/
function renderTodoList(todoList) {
  showTodos.innerHTML = todoList.map(
    ({ id, todo, isCompleted, dateTime }) => `
    <div class="todo relative">
      <div>
        <input id="item-${id}" class="t-checkbox t-pointer" type="checkbox" data-key=${id} ${
      isCompleted ? "checked" : ""
    }> 
    <button class="absolute right-0 button cursor"> 
        <span data-todokey=${id} class="del-btn material-icons-outlined">delete</span>
      </button>
        <label for="item-${id}" class="todo todo-text t-pointer ${
      isCompleted ? "checked-todo" : ""
    }" data-key=${id}>${todo}</label>
      </div>
      <div class="date-and-day">${dateTime}</div>
      
    </div>`
  );
}

renderTodoList(todoList);
