function daysInM(month, year) {

    let date = new Date (year,month,0)
    let day = date.getDate()

    console.log(day);

}
daysInM(1, 2012)