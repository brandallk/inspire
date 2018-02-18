function SettingsController() {

    var settingsService = new SettingsService()
    var $parentDiv = $('#settings')
    var formTmp = `
        <form class="edit-settings">
            <f3 class="text-center">Settings</f3>
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
			<button type="submit" class="submit btn btn-sm btn-light btn-block">Submit</button>
		</form>
    `

    function drawToggleIcon() { console.log('drawing toggle icon')
        $parentDiv.html(`<a href="#" class="settings-toggle"><i class="fas fa-cog"></i></a>`)
        listenForToggle()
    }

    function listenForToggle() { console.log('listening for toggle')
        var $toggleBtn = $('.settings-toggle');  console.log('toggle icon:', $toggleBtn)
        $toggleBtn.on('click', (evt) => { console.log('click on toggle icon')
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
            settingsService.setSettings(settings, drawToggleIcon)
        })
    }

    this.getSettings = function() {
        settingsService.getSettings( (res) => {
            // if a settings object already exists on the server...
            if (res) {
                return res // ... return it
            } else {
                return settingsService.getDefaultSettings() // ...otherwise return defaults
            }
        })
    }

    settingsService.setSettings(settingsService.getDefaultSettings(), drawToggleIcon)
}