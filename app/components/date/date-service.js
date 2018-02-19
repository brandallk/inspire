function DateService() {

    this.getTime = function(timeFormat) {
        var date = new Date()
        var hours = date.getHours()
        var mins = date.getMinutes()
        var period = hours > 12 ? "pm" : "am"
        var timeOfDay = ""
    
        if (mins < 10) {
            mins = "0" + mins
        }
    
        if (period === "pm") {
            timeOfDay = "afternoon"
            if (hours > 17) {
                timeOfDay = "evening"
            }
            if (timeFormat === "12-hour") {
                hours -= 12
            }
        } else {
            timeOfDay = "morning"
        }

        var time = {
            time: timeFormat === "12-hour" ? `${hours}:${mins} ${period}` : `${hours}:${mins}`,
            timeOfDay: timeOfDay
        }
    
        return time
    }
}