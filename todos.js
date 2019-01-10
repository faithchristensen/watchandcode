var todos = ['item 1', 'item 2', 'item 3'];

function displayTodos() {
    console.log('My Todos:', todos);
}

function addTodos(todo) {
    todos.push(todo);
    displayTodos();
}

function changeTodos(position, newTodo) {
    todos[position] = newTodo;
    displayTodos();
}

function deleteTodo(todo) {
    todos.splice(todo, 1);
    displayTodos();
}
