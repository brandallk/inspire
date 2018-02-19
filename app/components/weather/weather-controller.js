function WeatherController(){
	
	var weatherService = new WeatherService()

	var $parentDiv = $('#weather')
	var weatherTmp = `
		<img class="weather-icon" src="" alt="weather icon">
		<span class="weather-temp"></span>
		<span class="weather-loc"></span>
	`

	function getSettings() {
		SettingsController.getSettings( (settings) => {
			if (settings) {
				// console.log(settings)
				WeatherController.getWeather(settings.tempScale)
			} else {
				// console.log('no settings')
				WeatherController.getWeather("F")
			}
		})
	}

	WeatherController.getWeather = function(tempScale) {
		weatherService.getWeather(function(weather){
			// console.log(weather);
			var baseTemp = weather.main.temp
			var loc = weather.name
			var iconCode = weather.weather[0].icon
			var iconSrc = `http://openweathermap.org/img/w/${iconCode}.png`
			drawWeather(iconSrc, baseTemp, tempScale, loc)
		})
	}

	function drawWeather(iconSrc, baseTemp, tempScale, loc) {
		var temp = {
			K: Math.floor(baseTemp),
			C: Math.floor(baseTemp - 273.15),
			F: Math.floor((baseTemp - 273.15) * 1.8 + 32)
		}
		$parentDiv.html(weatherTmp)
		$('.weather-icon').attr("src", iconSrc)
		$('.weather-temp').html(`${temp[tempScale]}&deg; ${tempScale}`)
		$('.weather-loc').text(loc)
	}

	getSettings()
}
