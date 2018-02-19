function DateController() {
    
    var dateService = new DateService()
    var intervalID;

    function getSettings() {
        SettingsController.getSettings( (settings) => {
			if (settings) {
				// console.log(settings)
				DateController.start(settings.timeFormat, settings.user)
			} else {
				// console.log('no settings')
				DateController.start("12-hour", "")
			}
		})
    }

    DateController.start = function(timeFormat, user) {
        drawDate(timeFormat, user)
        if (intervalID) {
            clearInterval(intervalID)
        }
        scheduleTimeUpdate(timeFormat, user)
    }

    function drawDate(timeFormat, user) {
        // console.log('tick')
        var time = dateService.getTime(timeFormat)
        var clockTime = time.time
        var timeOfDay = time.timeOfDay
        var $parentDiv = $('#date')    
        var dateTmp = `<span class="time">${clockTime}</span>`
        if (user !== "") {
            dateTmp += `<span class="greeting">Good ${timeOfDay}, ${user}!</span>`
        } else {
            dateTmp += `<span class="greeting">Good ${timeOfDay}!</span>`
        }
        $parentDiv.html(dateTmp)
    }

    function scheduleTimeUpdate(timeFormat, user) {
        return intervalID = setInterval( () => {
            drawDate(timeFormat, user)
        }, 1000)
    }

    getSettings()
}