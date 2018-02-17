function SettingsController() {

    var settingsService = new SettingsService()
    var $parentDiv = $('#settings')

    function drawToggleIcon() {
        $parentDiv.html(`<i class="settings-toggle fas fa-cog"></i>`)
        listenForToggle()
    }

    function listenForToggle() {
        // event listener for click on the toggle icon
        var $toggleBtn = $('.settings-toggle')
        $toggleBtn.on('click', (evt) => {
            settingsService.getSettings(drawSettingsForm)
        })
    }

    function drawSettingsForm(settings) {
        // use the current settings, build the form, add it to the DOM, and attach listeners for the controls

    }

    drawToggleIcon()
}