function TodoController() {
	// new up the TodoService that has already been configured for your use
	// You will need four methods
	// getTodos should request your api/todos and give an array of todos to your callback fn
	// addTodo takes in a todo and posts it to the server
	// toggleTodoStatus takes in a todo marks its status as completed and puts it to the server
	// removeTodo takes in a todoId and sends a delete request to the server
	// **** HINT: Everytime you make a change to any todo don't forget to get the todo list again
	var todoService = new TodoService()

	var $parentDiv = $('#todo')
	var todoBaseTmp = `
		<span class="todos-counter d-inline-block pb-3 ml-2"></span>
		<form class="todos-form"></form>
		<a class="show-add-form text-light" href="#">New Todo</a>
	`

	var addForm = `
		<form class="add-todo">
			<div class="form-group">
				<label for="todo-title" class="d-none">New Todo</label>
				<input id="todo-title" class="form-control" type="text" placeholder="New Todo" name="title">
			</div>
			<button type="submit" class="submit btn btn-sm btn-light btn-block">Add</button>
		</form>
	`

	// Use this getTodos function as your callback for all other edits
	function getTodos(){
		//FYI DONT EDIT ME :)
		todoService.getTodos(draw)
	}

	function draw(todos) {
		// console.log('todos:', todos)
		$parentDiv.html(todoBaseTmp)
		$counter = $('.todos-counter')
		$counter.html(`${todoService.getUncompletedTodos()} of ${todoService.getTotalTodos()}`)
		
		if (todos.length) {
			todos.forEach( todo => {
				var addedClass = ""
				if (todo.completed === true || todo.complete === "true") {
					addedClass = "line-through"
				}
				var todoTmp = `
					<div class="form-group todo">
						<div>
							<input class="todo-checkbox" type="checkbox" name="completed" ${todo.checked} data-todoid="${todo.id}">
							<span class="todo-title ${addedClass}" name="todo">${todo.title}</span>
						</div>
						<div class="ml-2 d-flex align-items-center">
							<a class="remove-todo text-light" href="#" data-todoid="${todo.id}">
								<i class="remove-icon fas fa-minus-circle" data-todoid="${todo.id}"></i>
							</a>
						</div>
					</div>
				`
				$('.todos-form').append(todoTmp)
			})
		}

		listenForNewTodo()
		listenForRemoveTodo()
		listenForTodoStatusChange()
	}

	function showAddForm() {
		$parentDiv.append(addForm)
		listenToAddForm()
	}

	function hideAddForm() {
		$('.add-todo').remove()
	}

	function listenToAddForm() {
		var $form = $('.add-todo')
		$form.on('submit', (evt) => {
			evt.preventDefault()
			addTodoFromForm(evt)
		})
	}

	function listenForNewTodo() {
		var $btn = $('.show-add-form')
		$btn.on('click', (evt) => {
			showAddForm()
		})
	}

	function listenForRemoveTodo() {
		var $btn = $('.remove-todo')
		$btn.on('click', (evt) => {
			var todoID = evt.target.getAttribute('data-todoid')
			removeTodo(todoID)
		})
	}

	function listenForTodoStatusChange() {
		var $checkbox = $('.todo-checkbox')
		$checkbox.on('change', (evt) => {
			var $thisCheckbox = $(evt.target)
			var $titleSpan = $thisCheckbox.next()
			$titleSpan.toggleClass('line-through')
			var todoID = $thisCheckbox.attr('data-todoid')
			toggleTodoStatus(todoID)
		})
	}

	function addTodoFromForm(evt) {
		// evt.preventDefault() // <-- hey this time its a freebie don't forget this
		// TAKE THE INFORMATION FORM THE FORM
		var form = evt.target
		var title = form.title.value
		
		//PASSES THE NEW TODO TO YOUR SERVICE
		//DON'T FORGET TO REDRAW THE SCREEN WITH THE NEW TODO
		//YOU SHOULDN'T NEED TO CHANGE THIS
		todoService.addTodo(title, getTodos)
		                         //^^^^^^^ EXAMPLE OF HOW TO GET YOUR TOODOS AFTER AN EDIT
	}

	function toggleTodoStatus(todoID) {

		// asks the service to edit the todo status
		todoService.toggleTodoStatus(todoID, draw)
		// YEP THATS IT FOR ME
	}

	function removeTodo(todoID) {
		// ask the service to run the remove todo with this id
		// console.log('todoID:', todoID)
		todoService.removeTodo(todoID, draw)
		// ^^^^ THIS LINE OF CODE PROBABLY LOOKS VERY SIMILAR TO THE toggleTodoStatus
	}

	// IF YOU WANT YOUR TODO LIST TO DRAW WHEN THE PAGE FIRST LOADS WHAT SHOULD YOU CALL HERE???
	getTodos()
}
