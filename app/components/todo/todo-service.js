function TodoService() {

	function Todo(title) {
		this.title = title
		this.completed = false
		this.checked = ""
	}

	// A local copy of your todos
	var todoList = []
	// var baseUrl = 'https://inspire-server.herokuapp.com/api/todos/brk83604'
	var baseUrl = 'https://inspire-server.herokuapp.com/api/brk83604'

	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
		//CAN YOU NOTIFY THE USER IF SOMETHING BREAKS? 
		//do this without breaking the controller/service responsibilities
	}

	this.getUncompletedTodos = function() {
		return todoList.filter( todo => {
			return todo.completed === false || todo.completed === "false"
		}).length
	}

	this.getTotalTodos = function() {
		return todoList.length
	}

	this.getTodos = function (draw) {
		$.get(baseUrl)
			.then(function (res) { // <-- WHY IS THIS IMPORTANT????
				console.log('getTodos res:', res)
				todoList = res
				draw(res)
			})
			.fail(logError)
	}

	this.addTodo = function (title, cb) {
		var newTodo = new Todo(title)
		$.post(baseUrl, newTodo)
			.then(function(res){ // <-- WHAT DO YOU DO AFTER CREATING A NEW TODO?
				// console.log('addTodo res:', res)
				todoList.push(res.data)
				cb(res)
			}) 
			.fail(logError)
	}

	this.toggleTodoStatus = function (todoID, cb) { console.log(todoList)
		// MAKE SURE WE THINK THIS ONE THROUGH
		//STEP 1: Find the todo by its index **HINT** todoList
			var todo = todoList.find( todo => todo.id === todoID)
		//STEP 2: Change the completed flag to the opposite of what is is **HINT** todo.completed = !todo.completed
				
			if (todo.completed === false || todo.completed === "false") {
				todo.completed = true
			} else {
				todo.completed = false
			}
			
			todo.checked = todo.checked == "" ? "checked" : ""
		//STEP 3: Here is that weird Ajax request because $.put doesn't exist
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: baseUrl + '/' + todoID,
			data: JSON.stringify(todo)
		})
			.then( (res) => {
				//DO YOU WANT TO DO ANYTHING WITH THIS?
				// console.log('toggle res:', res)
				this.getTodos(cb)
			})
			.fail(logError)
	}

	this.removeTodo = function (todoID, cb) {
		// Umm this one is on you to write.... It's also unique, like the ajax call above. The method is a DELETE
		$.ajax({
			url: baseUrl + '/' + todoID,
			method: 'DELETE'
		})
		.then( () => {
			todoList.splice(todoList.find( todo => todo.id === todoID), 1)
			this.getTodos(cb)
		})
		.fail(logError)
	}

}
