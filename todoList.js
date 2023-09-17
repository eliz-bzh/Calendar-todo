let input, todoData, currentTaskDay;
const containerToDo = document.createElement('div');

const generateTodo = (date) => {
	
	maxId = 0;
	currentTaskDay = date;
	
	const todo = document.getElementById("todo");

	containerToDo.innerHTML = '';
	containerToDo.classList.add('todo');

	const span = document.createElement('span');
	span.textContent = 'To do';
	const dateSpan = document.createElement('span');
	dateSpan.textContent = `${currentTaskDay.toLocaleString('en-GB', {dateStyle:'medium'})}`;
	//dateSpan.classList.add('date-span');
	span.append(dateSpan);
	span.classList.add('todo-span');

	form = document.createElement('form');
	form.classList.add('item-add-form');
	form.addEventListener('submit', onSubmit)

	input = document.createElement('input');
	input.classList.add('form-control');
	
	input.type = 'text';
	input.placeholder = 'What needs to be done';
	input.name = 'label';
	
	let button = createBtn('add_circle_outline', '#B7B7B7');

	todoData = document.createElement('ol');
	todoData.classList.add('list-group')
	todoData.classList.add('todo-list')

	const data = getTasksByDate(currentTaskDay);
	(data && data.length)?data.map((el)=>addItem(el)):(null);

	form.append(input);
	form.append(button);

	containerToDo.append(span);
	containerToDo.append(form);
	containerToDo.append(todoData);

	todo.append(containerToDo);
}



let maxId = 0;


const createTodoItem = (label)=>{
	const li = document.createElement('li');
	li.classList.add('list-group-item');

	const div = document.createElement('div');
	div.classList.add('todo-list-item');
	const span = document.createElement('span');
	span.classList.add('todo-list-item-label');
	span.textContent = label;
	li.id = maxId;
	maxId++;
	const buttonDel = createBtn('delete', 'red');
	buttonDel.addEventListener('click', ()=>removeItem(li));

	/*const buttonUpdate = document.createElement('button');
	buttonUpdate.textContent = 'update';
	buttonUpdate.addEventListener('click', ()=>removeItem(li));
	*/

	div.appendChild(span)
	div.appendChild(buttonDel)

	li.append(div);

	input.value = '';
	return li;
};

const addToLocaleStorage = (date, label) => {
    // Parse any JSON previously stored in allEntries
    let todoDataByDate = getTasksByDate(date);
    if(todoDataByDate == null) todoDataByDate = [];
    todoDataByDate.push(label);
    localStorage.setItem(`${date.toLocaleDateString('en-GB')}`, JSON.stringify(todoDataByDate));
}

const getTasksByDate = (date) => {
	return JSON.parse(localStorage.getItem(`${date.toLocaleDateString('en-GB')}`));
}

const removeToLocaleStorage = (date, id) =>{
	let todoDataByDate = getTasksByDate(date);
    const  newArray = [...todoDataByDate.slice(0, id), ...todoDataByDate.slice(id + 1)];
    localStorage.setItem(`${date.toLocaleDateString('en-GB')}`, JSON.stringify(newArray));
}

const removeItem = (item)=>{
	const idDel = [...document.querySelector('.todo-list').children].findIndex((li)=>li.id === item.id)
	removeToLocaleStorage(currentTaskDay, idDel);
	item.remove();
}

const addItem=(text)=>{
    const newItem = createTodoItem(text);
    todoData.appendChild(newItem);
};

const onSubmit=(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const label = formData.get('label');
    if(label.length !== 0){
    	addItem(label);
    	addToLocaleStorage(currentTaskDay, label);
    }
};


generateTodo(new Date());