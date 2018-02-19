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

    // Attempted use of Vue, which works, but can't be successfully called from settings-controller.js
    
    // let Date = {
    //     template: `
    //         <div>
    //             <span class="time">{{ clockTime }}</span>
    //             <span class="greeting">Good {{ timeOfDay }}</span>
    //             <span class="username" v-if="showUser">, {{ user }}</span>
    //             <span class="greeting-end">!</span>
    //         </div>
    //     `,
    //     data() {
    //         return {
    //             clockTime: '',
    //             timeOfDay: '',
    //             user: '',
    //             showUser: false,
    //             intervalID: null
    //         }
    //     },
    //     methods: {
    //         renewTime() {
    //             var time = dateService.getTime(this.timeFormat)
    //             this.clockTime = time.time
    //             this.timeOfDay = time.timeOfDay
    //         },
    //         scheduleTimeUpdate() {
    //             if (this.intervalID) {
    //                 clearInterval(intervalID)
    //             }
    //             this.intervalID = setInterval( () => {
    //                 // console.log('tick')
    //                 this.renewTime()
    //             }, 1000)
    //         },
    //         start() {
    //             SettingsController.getSettings( (settings) => {
    //                 if (settings) {
    //                     this.timeFormat = settings.timeFormat
    //                     this.user = settings.user !== '' ? settings.user : ''
    //                     this.showUser = settings.user !== '' ? true : false
    //                     this.renewTime()
    //                     this.scheduleTimeUpdate()
    //                 } else {
    //                     this.clockTime = '00:00'
    //                     this.timeOfDay = ''
    //                     this.user = ''
    //                 }
    //             })
    //         }
    //     },
    //     mounted() {
    //         this.start()
    //     }
    // }

    // let vue = new Vue({
    //     el: '#date',
    //     components: {
    //         'date': Date
    //     }
    // })

    // DateController.start = function() {
    //     // This does not clear a previous intervalID
    //     vue.$options.components.date.methods.start()
    // }
}