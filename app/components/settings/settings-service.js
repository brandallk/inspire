function SettingsService() {

    function Settings(settings) {
        for (let key in settings) {
            this[key] = settings[key]
        }
        // this.user = settings.user,
        // this.timeFormat = settings.timeFormat,
        // this.theme = settings.theme,
        // this.tempScale = settings.tempScale
    }

    var currentSettings = {}
    var defaultSettings = {
        user: null,
        timeFormat: "12h",
        theme: "dark",
        tempScale: "F"
    }

    var baseUrl = 'https://inspire-server.herokuapp.com/api/brk83604settings'
    
    function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
    }
    
    this.getDefaultSettings = function() {
        return defaultSettings
    }
    
    this.getSettings = function(cb) {
        $.get(baseUrl)
        .then( res => {
            // console.log('got settings:', res[0])
            currentSettings = res[0]
            cb(res[0])
        })
        .fail(logError)
    }

    this.setSettings = function(settings, cb) {
        this.getSettings( (res) => {
            // if a settings object already exists on the server...
            if (res) {
                // console.log('found existing settings:', res)
                this.updateSettings(settings, cb) // ...update it
            } else {
                // console.log('found NO existing settings; creating new')
                this.createSettings(settings, cb) // ...otherwise, create it
            }
        })
    }

    this.createSettings = function(settings, cb) {
        var newSettings = new Settings(settings)
        $.post(baseUrl, newSettings)
        .then( res => {
            // console.log('new settings:', res.data)
            this.getSettings(cb)
        })
        .fail(logError)
    }

    this.updateSettings = function(settings, cb) {
        var newSettings = new Settings(settings)
        var settingsID = currentSettings.id
        $.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: baseUrl + '/' + settingsID,
			data: JSON.stringify(newSettings)
        })
        .then( (res) => {
            // console.log('updated settings:', res)
            this.getSettings(cb)
        })
        .fail(logError)
    }
}