function roadRadar(speed, area) {

    let status;
    let difference;

    if (area === `motorway`) {
        if (speed > 130) {
            difference = speed - 130;
            if (difference <= 20) {
                status = `speeding`;
            }
            else if (difference <= 40) {
                status = `excessive speeding`
            }
            else {
                status = `reckless driving`;
            }
            console.log(`The speed is ${difference} km/h faster than the allowed speed of 130 - ${status}`);
        }
        else{
            console.log(`Driving ${speed} km/h in a ${130} zone`);
        }
    }
    else if (area === `interstate`) {
        if (speed > 90) {
            difference = speed - 90;
            if (difference <= 20) {
                status = `speeding`;
            }
            else if (difference <= 40) {
                status = `excessive speeding`
            }
            else {
                status = `reckless driving`;
            }
            console.log(`The speed is ${difference} km/h faster than the allowed speed of 90 - ${status}`);
        }
        else{
            console.log(`Driving ${speed} km/h in a ${90} zone`);
        }
    }
    else if (area === `city`) {
        if (speed > 50) {
            difference = speed - 50;
            if (difference <= 20) {
                status = `speeding`;
            }
            else if (difference <= 40) {
                status = `excessive speeding`
            }
            else {
                status = `reckless driving`;
            }
            console.log(`The speed is ${difference} km/h faster than the allowed speed of 50 - ${status}`);
        }
        else{
            console.log(`Driving ${speed} km/h in a ${50} zone`);
        }
    }
    else {
        if (speed > 20) {
            difference = speed - 20;
            if (difference <= 20) {
                status = `speeding`;
            }
            else if (difference <= 40) {
                status = `excessive speeding`
            }
            else {
                status = `reckless driving`;
            }
            console.log(`The speed is ${difference} km/h faster than the allowed speed of 20 - ${status}`);
        }
        else{
            console.log(`Driving ${speed} km/h in a ${20} zone`);
        }
    }
}
roadRadar(40, 'city')