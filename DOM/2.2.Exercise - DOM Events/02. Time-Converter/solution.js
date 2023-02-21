function attachEventsListeners() {

    let daysInput = document.getElementById('days')
    let hoursInput = document.getElementById('hours')
    let minutesInput = document.getElementById('minutes')
    let secondsInput = document.getElementById('seconds')

    let main = document.getElementsByTagName('main')[0]
    main.addEventListener('click', function convert(event) {

        let daysBtn = document.getElementById("daysBtn")
        let hoursBtn = document.getElementById("hoursBtn")
        let minutesBtn = document.getElementById("minutesBtn")
        let secondsBtn = document.getElementById("secondsBtn")

        let target = event.target

        if ((target !== daysBtn) && (target !== hoursBtn) && (target !== minutesBtn) && (target !== secondsBtn)) {
            return
        };

        if (target === daysBtn) {
            hoursInput.value = Number(daysInput.value) * 24;
            minutesInput.value = Number(hoursInput.value) * 60;
            secondsInput.value = Number(minutesInput.value) * 60;
        }
        else if (target === hoursBtn) {
            daysInput.value = Number(hoursInput.value) / 24;
            minutesInput.value = Number(hoursInput.value) * 60;
            secondsInput.value = Number(minutesInput.value) * 60;
        }
        
        else if (target == minutesBtn) {
            hoursInput.value = Number(minutesInput.value) / 60;
            daysInput.value = Number(hoursInput.value) / 24;
            secondsInput.value = Number(minutesInput.value) * 60;
        }
        else if (target === secondsBtn) {
            minutesInput.value = Number(secondsInput.value) / 60;
            hoursInput.value = Number(minutesInput.value) / 60;
            daysInput.value = Number(hoursInput.value) / 24;
        }
    })
}