function SettingsController() {

    var settingsService = new SettingsService()

    SettingsController.getSettings = function(cb) {
        settingsService.getSettings(cb)
    }

    var $parentDiv = $('#settings')
    var formTmp = `
        <form class="edit-settings">
            <h3 class="text-center">Settings</h3>
			<div class="form-group">
				<label for="set-user" class="">Username:</label>
				<input id="set-user" class="form-control" type="text" placeholder="Your name" name="user">
			</div>
			<div class="form-group">
				<label for="set-timeformat" class="">Time format:</label>
                <select id="set-timeformat" class="form-control" name="timeformat">
                    <option>12-hour</option>
                    <option>24-hour</option>
                </select>
			</div>
			<div class="form-group">
				<label for="set-theme" class="">Theme:</label>
                <select id="set-theme" class="form-control" name="theme">
                    <option>dark</option>
                    <option>light</option>
                </select>
			</div>
			<div class="form-group">
				<label for="set-tempscale" class="">Temp Scale:</label>
                <select id="set-tempscale" class="form-control" name="tempscale">
                    <option value="F">Fahrenheit</option>
                    <option value="C">Celcius</option>
                    <option value="K">Kelvin</option>
                </select>
			</div>
			<button type="submit" class="submit btn btn-sm btn-dark btn-block">Submit</button>
			<button type="button" class="settings-cancel btn btn-sm btn-light btn-block">Cancel</button>
		</form>
    `

    function setTheme(theme) {
        var $themeComponents = $('body, #date, #weather, #quote')
        if (theme === "light") {
            $themeComponents.each( function() {
                $(this).removeClass('dark')
                $(this).addClass('light')
            })
        } else {
            $themeComponents.each( function() {
                $(this).removeClass('light')
                $(this).addClass('dark')
            })
        }
    }

    function drawToggleIcon() {
        $parentDiv.html(`<a href="#" class="settings-toggle"><i class="fas fa-cog"></i></a>`)
        listenForToggle()
    }

    function listenForToggle() {
        var $toggleBtn = $('.settings-toggle')
        $toggleBtn.on('click', (evt) => {
            evt.preventDefault()
            settingsService.getSettings(drawSettingsForm)
        })
    }

    function drawSettingsForm(settings) {
        $parentDiv.html(formTmp)
        $('#set-user').get(0).value = settings.user
        $('#set-timeformat').get(0).value = settings.timeFormat
        $('#set-theme').get(0).value = settings.theme
        $('#set-tempscale').get(0).value = settings.tempScale
        listenForSettingChange()
        listenForFormCancel()
    }

    function listenForSettingChange() {
        var $form = $('.edit-settings')
        $form.on('submit', (evt) => {
            evt.preventDefault()
            var settings = {
                user: $form.get(0).user.value,
                timeFormat: $form.get(0).timeformat.value,
                theme: $form.get(0).theme.value,
                tempScale: $form.get(0).tempscale.value
            }
            settingsService.setSettings(settings, (res) => {
                drawToggleIcon()
                if (res) {
                    WeatherController.getWeather(res.tempScale)
                    DateController.start(res.timeFormat, res.user)
                    setTheme(res.theme)
                } else {
                    WeatherController.getWeather("F")
                    DateController.start("12-hour", "")
                    setTheme("dark")
                }
            })
        })
    }

    function listenForFormCancel() {
        var $cancelBtn = $('.settings-cancel')
        $cancelBtn.on('click', () => {
            drawToggleIcon()
        })
    }

    settingsService.getSettings( res => {
        if (res) {
            settingsService.setSettings(res, (res) => {
                drawToggleIcon()
                setTheme(res.theme)
            })
        } else {
            settingsService.setSettings(settingsService.getDefaultSettings(), (res) => {
                drawToggleIcon()
                setTheme("dark")
            })
        }
    })
}