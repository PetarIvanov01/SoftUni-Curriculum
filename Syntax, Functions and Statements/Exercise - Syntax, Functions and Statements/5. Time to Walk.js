function timeToWalk(stepsNumber, stepsMetersHr, studentSpeed) {

    let distanceMeters = stepsNumber * stepsMetersHr;
    let speedMetersSec = studentSpeed / 3.6;
    let time = distanceMeters / speedMetersSec;
    let rest = Math.floor(distanceMeters / 500);

    let timeMin = Math.floor(time / 60);
    let timeSec = Math.round(time - (timeMin * 60));
    let timeHr = Math.floor(time / 3600);

    console.log(timeHr.toFixed(0).padStart(2, '0') + `:` + (timeMin + rest).toFixed(0).padStart(2, '0') + `:` + timeSec.toFixed(0).padStart(2, '0'));

}
timeToWalk(4000, 0.60, 5)