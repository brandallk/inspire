function DateService() {

    this.getTime = function() {
        var date = new Date()
        var hours = date.getHours()
        var mins = date.getMinutes()
        var period = hours > 12 ? "pm" : "am"
        var timeOfDay = ""
    
        if (mins < 10) {
            mins = "0" + mins
        }
    
        if (period === "pm") {
            hours -= 12
            timeOfDay = "afternoon"
            if (hours > 5) {
                timeOfDay = "evening"
            }
        } else {
            timeOfDay = "morning"
        }

        var time = {
            time: `${hours}:${mins} ${period}`,
            timeOfDay: timeOfDay
        }
    
        return time
    }
}