let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoBtn = document.getElementById("addTodoButton");
let saveTodoBtn = document.getElementById("saveTodoButon");

// Function to save todo in browser temporary storage
function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();

saveTodoBtn.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

let todosCount = todoList.length;

// Function to change the todo status when the checkbox is checked
function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    // if(checkboxElement.checked === true) {
    //     labelElement.classList.add("checked");
    // } else {
    //     labelElement.classList.remove("checked");
    // }
    labelElement.classList.toggle("checked", checkboxElement.checked);
    let todoObjectIndex = todoList.findIndex(
        function(eachTodo) {
            let eachTodoId = "todo" + eachTodo.uniqueNo;
            if (eachTodoId === todoId) {
                return true;
            } else {
                return false;
            }
        }
    );
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

// Function to delete a todo item
function onDeleteTodo(todoId) {
    let todoELement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoELement);
    let deleteElementIndex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId) {
            return true
        } else {
            return false
        }
    });
    todoList.splice(deleteElementIndex, 1);
}

// Function to create and append the todos to the todoList
function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoItem = document.createElement("li");
    todoItem.classList.add("todo-item-container");
    todoItem.id = todoId;
    todoItemsContainer.appendChild(todoItem);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    todoItem.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");
    todoItem.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.innerHTML = todo.text;
    labelElement.id = labelId;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked"); 
    }
    labelContainer.appendChild(labelElement);

    let deleteItemContainer = document.createElement("div");
    labelContainer.appendChild(deleteItemContainer);

    let deleteBtn = document.createElement("button");
    deleteBtn.style.cursor = "pointer";
    deleteBtn.classList.add("material-symbols-outlined");
    deleteBtn.innerHTML = "delete";
    deleteBtn.onclick = function() {
        onDeleteTodo(todoId);
    };
    labelContainer.appendChild(deleteBtn);
}

for (let items of todoList) {
    createAndAppendTodo(items);
}

// Function to restrict the input box
function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if(userInputValue === "") {
        alert("Please add a task");
        return;
    }
    todosCount += 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";    
}

addTodoBtn.onclick = function() {
    onAddTodo();
};