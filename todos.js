var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
      editMode: false,
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  enableEditMode: function(position) {
    var todo = this.todos[position];
    todo.editMode = true;
  },
  disableEditMode: function(position){
    var todo = this.todos[position];
    todo.editMode = false;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function(position, newText) {
    todoList.changeTodo(position, newText);
    todoList.disableEditMode(position);
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(id) {
    todoList.toggleCompleted(id);
    view.displayTodos();
  },
  enableEditMode: function(position){
    todoList.enableEditMode(position);
    view.displayTodos();
  },
  disableEditMode: function(position){
    todoList.disableEditMode(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');

      if (todo.completed === true) {
       todoLi.classList.add("line_through") 
      }
      
      if (todo.editMode === true) {
        var editInput = document.createElement('input')
        editInput.className = 'editInput'
        editInput.value = todo.todoText
        todoLi.appendChild(editInput)
        todoLi.appendChild(this.createSaveButton());
      } else {
        todoLi.textContent = todo.todoText;
        todoLi.appendChild(this.createEditButton());
      }
      
      todoLi.id = position;
      todoLi.prepend(this.createCheckbox(todo.completed));
      todoLi.appendChild(this.createDeleteButton());
      
      todosUl.appendChild(todoLi);
      
    }, this);  
    },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createEditButton: function() {
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editButton';
    editButton.classList.add("todo-buttons");
    return editButton;
  },
  createSaveButton: function() {
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'saveButton';
    return saveButton;
  },
  createCheckbox: function(completed) {
    var checkboxButton = document.createElement('input');
    checkboxButton.type = 'checkbox';
    checkboxButton.className = 'checkboxButton';
    if (completed){
      checkboxButton.checked = true
    }
    return checkboxButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target;   
      if (elementClicked.classList.contains('deleteButton')) {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
      if (elementClicked.classList.contains('editButton')) {
        handlers.enableEditMode(parseInt(elementClicked.parentNode.id))
      }
      if (elementClicked.classList.contains('saveButton')) {
        var parentId = parseInt(elementClicked.parentNode.id)
        
        var parentNode = elementClicked.parentNode
        var editInput = parentNode.getElementsByClassName('editInput')[0]
        var text = editInput.value
        
        handlers.changeTodo(parentId, text)
      }
      if (elementClicked.classList.contains('checkboxButton')) {
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }
    });
  },
};

view.setUpEventListeners();