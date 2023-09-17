//Weather Forecast
const getDataForecast = async () => {
	const response = await fetch('https://the-ultimate-api-challenge.herokuapp.com/https://www.metaweather.com/api/location/834463/');
	return await response.json();
}


const generateWeather = async () => {
	const weather = await getDataForecast();

	let todo = document.getElementById("todo");
	todo.classList.add('rightColumn');

	const weatherContainer = document.createElement('div');


	const span = document.createElement('span');
	span.textContent = 'Weather Forecast';
	span.classList.add('forecast-span');

	const ol = document.createElement('ol');
	ol.classList.add('daysForecast');

	weather.consolidated_weather.map((day)=>{
		const { weather_state_abbr, max_temp, applicable_date } = day;
		const li = document.createElement('li');
		li.classList.add('dayForecastItem');
		li.classList.add('dayForecastItemColumn')
		const img = document.createElement('img');
		const spanDay = document.createElement('span');
		const spanTemp = document.createElement('span');

		img.style.width = '30px';
		img.src = `https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`;
		spanDay.textContent = `${daysOfWeekWeather[new Date(applicable_date).getDay()]}`;
		spanTemp.textContent = `${Math.round(max_temp)}\u{00B0}`;

		li.append(img);
		li.append(spanDay);
		li.append(spanTemp);

		ol.append(li);
	})


	weatherContainer.append(span);
	weatherContainer.append(ol);

	todo.prepend(weatherContainer);
}

generateWeather();