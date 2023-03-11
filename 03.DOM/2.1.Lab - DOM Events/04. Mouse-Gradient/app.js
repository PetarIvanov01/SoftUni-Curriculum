function attachGradientEvents() {

    let result = document.getElementById('result');

    let gradiant = document.getElementById('gradient');

    gradiant.addEventListener('mousemove', detected);
    gradiant.addEventListener('mouseout', mouseout);

    function detected(event) {

        let power = event.offsetX / (event.target.clientWidth - 1);
        result.textContent = Math.trunc(power * 100) + `%`;

    }
    function mouseout() {

       result.textContent = '';

    }
}