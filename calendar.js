const currentDate = new Date();
const calendar = document.getElementById('calendar');
calendar.classList.add('first-column');
const buttonPreviousMonth = createBtn('arrow_back_ios', '#B7B7B7');
const buttonNextMonth = createBtn('arrow_forward_ios', '#B7B7B7');

const previousMonth = () => {
	currentDate.setMonth(currentDate.getMonth() - 1);
	generateCalendar(currentDate);
}

const nextMonth = () => {
	currentDate.setMonth(currentDate.getMonth() + 1);
	generateCalendar(currentDate);
}

buttonPreviousMonth.addEventListener('click', ()=>previousMonth());
buttonNextMonth.addEventListener('click', ()=>nextMonth());


const getDaysInMonth = (date) => {
	const firstDayNextMonth = new Date(date.getFullYear(), date.getMonth() + 1);
	const firstDayCurrentMonth = new Date(date.getFullYear(), date.getMonth());
	const diff = firstDayNextMonth - firstDayCurrentMonth;
	return diff / (1000 * 60*60*24);
}

const getLastDayInPreviousMonth = (date) =>{
	let lastDay = new Date(date.getFullYear(), date.getMonth());
	lastDay.setDate(0);
    return lastDay.getDate();
}

const generateCalendar = (date) => {

	calendar.innerHTML = '';

	let firstDay = new Date(date.getFullYear(), date.getMonth()).getDay();
	const lastDayInPreviousMonth = getLastDayInPreviousMonth(date);
	const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();

	//name current month
	const header = document.createElement('div');
	header.classList.add('header');

	let monthName = document.createElement('span');
	monthName.classList.add('month-name');
	monthName.textContent = `${months[date.getMonth()]}, ${currentDate.getFullYear()}`;


	header.append(buttonPreviousMonth);
	header.append(monthName);
	header.append(buttonNextMonth);

	//names days of week
	let daysOfWeekList = document.createElement('ol');
	daysOfWeekList.classList.add('day-of-week');
	getDaysOfWeek(daysOfWeek, daysOfWeekList);


	//days in calendar
	let days = document.createElement('ol');
	days.classList.add('days-grid');
	daysFromPreviousMonth(lastDayInPreviousMonth, firstDay, days);
	daysFromCurretMonth(getDaysInMonth(date), days);
	daysFromNextMonth(lastDayOfMonth, days);


	calendar.append(header);
	calendar.append(daysOfWeekList);
	calendar.append(days);
}

const getDaysOfWeek = (daysOfWeek, daysOfWeekList) => {
	for(let i = 0; i != daysOfWeek.length; i++){
		let li = document.createElement('li');
		li.classList.add('day-name');
		let span = document.createElement('span');
		span.textContent = daysOfWeek[i];
		li.append(span);
		daysOfWeekList.append(li)
	}
}

const daysFromPreviousMonth = (lastDayInPreviousMonth, indexFirstDayCurrentMonth, days) =>{
	if(indexFirstDayCurrentMonth === 0){
		indexFirstDayCurrentMonth = 7
	}
	for(let i = lastDayInPreviousMonth-(indexFirstDayCurrentMonth-1); i != lastDayInPreviousMonth; ++i){
		let li = document.createElement('li');
		let d = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
		if(isWeeked(i + 1, d)){
			li.classList.add('weekend');
		}
		li.classList.add('calendar-day');
		li.classList.add('previous-month-day');
		let span = document.createElement('span');
		span.textContent = `${i + 1}`;
		li.append(span);
		days.append(li)
	}
}

const daysFromCurretMonth = (amountDays, days) => {
	
	//const currentDay = new Date().getDate();
	for (let i = 1; i <= amountDays; i++) {
		let li = document.createElement('li');
		if(isCurrentDay(i, currentDate)){
			li.classList.add('current-day');
			li.classList.add('active')
		}
		if(isWeeked(i, currentDate)){
			li.classList.add('weekend');
		}
		li.classList.add('calendar-day');
		const dateTaskDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
		li.addEventListener('click', ()=> {
			[...days.children].map((day)=>day.classList.remove('active'));
			li.classList.add('active')
			generateTodo(dateTaskDay)
		})
		let span = document.createElement('span');
		span.textContent = `${i}`;
		li.append(span);
		days.append(li)
	}
}

const daysFromNextMonth = (indexLastDayCurrentMonth, days) => {
	let day = 1;
	if(indexLastDayCurrentMonth !== 0){
		for (let i = indexLastDayCurrentMonth; i < 7; i++) {
			let li = document.createElement('li');
			let d = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
			if(isWeeked(day, d)){
				li.classList.add('weekend');
			}
			li.classList.add('calendar-day');
			li.classList.add('next-month-day');
			let span = document.createElement('span');
			span.textContent = `${day}`;
			day++;
			li.append(span);
			days.append(li)
		}
	}
}

const isCurrentDay = (day, date) => {
	return new Date().getFullYear() === date.getFullYear() &&
	 new Date().getMonth() === date.getMonth() &&
	  new Date().getDate() === day;
}

const isWeeked = (day, date) => {
	const dayMonth = new Date(date.getFullYear(), date.getMonth(), day)
	const dayInMonth = dayMonth.getDay();
	return dayInMonth % 6 === 0 || dayInMonth % 7 === 0;
}

generateCalendar(currentDate)