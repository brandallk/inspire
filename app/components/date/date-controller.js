function DateController() {
    
    var dateService = new DateService()

    function drawDate() {
        var time = dateService.getTime()
        var clockTime = time.time
        var timeOfDay = time.timeOfDay
        var $parentDiv = $('#date')    
        var dateTmp = `
            <span class="time">${clockTime}</span>
            <span class="greeting">Good ${timeOfDay}!</span>
        `
        $parentDiv.html(dateTmp)
    }

    function scheduleTimeUpdate() {
        return setInterval(drawDate, 1000)
    }

    drawDate()
    scheduleTimeUpdate()
}