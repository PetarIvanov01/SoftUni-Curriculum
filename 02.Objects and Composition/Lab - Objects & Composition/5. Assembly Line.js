function createAssemblyLine(car) {

    return {

        hasClima(car) {
            car.temp = 21;
            car.tempSettings = 21
            car.adjustTemp = function () {

                if (this.temp < this.tempSettings) {
                    return this.temp += 1
                }
                else if (this.tempSettings < this.temp) {
                    return this.temp -= 1
                }
            }
        },

        hasAudio(car) {
            car.currentTrack = {
                name: null,
                artist: null,
            }
            car.nowPlaying = function () {
                if (this.currentTrack.name !== null) {
                    return console.log(`Now playing '${currentTrack.name}' by ${currentTrack.artist}`);
                }
            }
        },

        hasParktronic(car) {
            car.checkDistance = function (distance) {
                if (distance < 0, 1) {
                    return console.log(`Beep! Beep! Beep!`);
                }
                else if (distance < 0, 25) {
                    return console.log(`Beep! Beep!`);
                }
                else if (distance < 0, 5) {
                    return console.log(`Beep!`);
                }
            }
        },
    }
}

const assemblyLine = createAssemblyLine();
const myCar = {
    make: 'Toyota',
    model: 'Avensis'
};

assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings = 18;
myCar.adjustTemp();
console.log(myCar.temp);