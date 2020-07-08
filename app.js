// Defining variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
	// DOM load event
	document.addEventListener("DOMContentLoaded", getTasks);

	//Add task form
	form.addEventListener("submit", addTask);

	//Remove tasks
	taskList.addEventListener("click", removeTask);

	//Clear tasks
	clearBtn.addEventListener("click", clearTasks);

	// Filter tasks
	filter.addEventListener("keyup", filterTasks);
}

//get tasks (from the local storage)
function getTasks() {
	// First we are retrieving an tasks form local storage and checking if its empty if yes create new empty array named tasks. if its not empty then parse the values and add those values into tasks array
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		// Converting the string value into array
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	// Here we are iterating over an array and adding the individual task which is element in tasks array to the tasksList which will be showed in the browser
	tasks.forEach(function (task) {
		// Create li element
		const li = document.createElement("li");

		// Add class to li for styling
		li.className = "collection-item";

		// Create text node and append child to li
		li.appendChild(document.createTextNode(task));

		// Create new link element
		const link = document.createElement("a");

		// Add class to the link
		link.className = "delete-item secondary-content";

		//Add icon to the link
		link.innerHTML = '<i class="fa fa-remove"></i>';

		console.log(li);
		// Append li to ul
		taskList.appendChild(li);

		// Append the link  to li
		li.appendChild(link);
	});
}

// Add task function
function addTask(e) {
	if (taskInput.value === " ") {
		alert("Please enter some task");
	}
	// Create li element
	const li = document.createElement("li");

	// Add class to li for styling
	li.className = "collection-item";

	// Create text node and append child to li
	li.appendChild(document.createTextNode(taskInput.value));

	// Create new link element
	const link = document.createElement("a");

	// Add class to the link
	link.className = "delete-item secondary-content";

	//Add icon to the link
	link.innerHTML = '<i class="fa fa-remove"></i>';

	console.log(li);
	// Append li to ul
	taskList.appendChild(li);

	// Append the link  to li
	li.appendChild(link);

	// Store tasks in local storage
	storeTaskInLocalStorage(taskInput.value);

	// Clear the input, every time when we add the task
	taskInput.value = "";

	e.preventDefault();
}

function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		// Converting the string value into array
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}
	tasks.push(task);
	// Converting the array back to string for storing the value into browser
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove tasks
function removeTask(e) {
	//console.log(e.target.parentElement.parentElement);
	if (e.target.parentElement.classList.contains("delete-item")) {
		console.log("delete button clicked");

		if (confirm("Are your sure ?")) {
			// Removing li from the DOM
			e.target.parentElement.parentElement.remove();

			// Remove task from local storage is called
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
	e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem) {
	console.log(taskItem);
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		// Converting the string value into array
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	// Now we iterate over the tasks array and check if the li content matches with the li we have clicked on

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			// if the content matched then we delete that element from an array //using splice where the current index is index and 1 means delete 1 element
			tasks.splice(index, 1);
		}
	});

	// Now we change store the modified array into browser's local storage
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear tasks
function clearTasks() {
	//taskList.innerText = "";
	// or we can use
	//taskList.innerHTML = "";

	// Faster way for removing list items
	// While loop runs till there is a first child in parent element
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear tasks local storage
	clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
	localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	//Query selector returns a nodeList
	document.querySelectorAll(".collection-item").forEach(function (task) {
		const item = task.firstChild.textContent;
		// Following statement states that if the item's indexOf value is not equal to text entered -1 (means no match) and combined with != states that there is a match between item and text
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
}
