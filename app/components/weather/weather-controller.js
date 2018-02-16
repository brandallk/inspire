function WeatherController(){
	
	var weatherService = new WeatherService();

	var $parentDiv = $('div#weather')
	var weatherTmp = `
		<img class="weather-icon" src="" alt="weather icon">
		<span class="weather-temp"></span>
		<span class="weather-loc"></span>
	`
	
	weatherService.getWeather(function(weather){
		// console.log(weather);
		var tempK = weather.main.temp
		var tempF = Math.floor((tempK - 273.15) * 1.8 + 32)
		var loc = weather.name
		var iconCode = weather.weather[0].icon
		var iconSrc = `http://openweathermap.org/img/w/${iconCode}.png`
		drawWeather(iconSrc, tempF, loc)
	})

	function drawWeather(iconSrc, tempF, loc) {
		$parentDiv.html(weatherTmp)
		$('img.weather-icon').attr("src", iconSrc)
		$('span.weather-temp').text(tempF + "deg F")
		$('span.weather-loc').text(loc)
	}

}
