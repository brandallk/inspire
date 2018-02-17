function SettingsService() {

    function Settings(settings) {
        this.user = settings.user,
        this.timeFormat = settings.timeFormat,
        this.theme = settings.themeObj,
        this.tempScale = settings.tempScale
    }

    var defaultSettings = {
        user: null,
        timeFormat: "12h",
        theme: {
            font: "sans-serif",
            fontColor: "rgb(255,255,255)"
        },
        tempScale: "F"
    }

    var settingsCache = null
    var baseUrl = 'https://inspire-server.herokuapp.com/api/brk83604/settings'
    
    function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
	}
    
    this.getSettings = function(cb) {
        $.get(baseUrl)
        .then( res => {
            console.log(res)
            // settingsCache = res
            // cb(res)
        })
        .fail(logError)
    }

    this.addSettings = function(settings, cb) {
        var newSettings = new Settings(settings)
        $.post(baseUrl, newSettings)
        .then( res => {
            console.log(res)
            // settingsCache = res.data
            // cb(res.data)
        })
        .fail(logError)
    }

    this.removeSetting = function(settingName, setting, cb) {
        var settings = settingsCache
        settings[settingName] = setting
        var id = settings.id // settingsCache should have an id from the server response
        $.ajax({
            method: 'PUT',
            contentType: 'application/json',
            url: baseUrl + '/' + id,
            data: JSON.stringify(settings)
        })
        .then( res => {
            this.getSettings(cb)
        })
        .fail(logError)
    }

}