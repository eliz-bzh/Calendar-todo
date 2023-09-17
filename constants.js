const months = ['January','February','March','April','May','June','July','August','September','October','November','December']; 
const daysOfWeekWeather = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const daysOfWeek = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

const createBtn = (label, color) => {
	const btn = document.createElement('button');
	btn.style.color = color;

	const icon = document.createElement('span');
	icon.classList.add('material-icons-outlined');
	icon.textContent = label;
	btn.append(icon);

	return btn;
}