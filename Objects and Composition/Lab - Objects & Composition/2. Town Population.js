function townPopulation(input) {

    let obj = {}
    input.map(el => {
        el = el.split(` <-> `);
        if (!obj.hasOwnProperty(el[0])) {


            return obj[el[0]] = Number(el[1])
        } else {
          
            obj[el[0]] += Number(el[1])

        }
    })

    for (const [key, value] of Object.entries(obj)) {
        console.log(`${key} : ${value}`);
    }
}
townPopulation(['Istanbul <-> 100000',

    'Honk Kong <-> 2100004',

    'Jerusalem <-> 2352344',

    'Mexico City <-> 23401925',

    'Istanbul <-> 1000'])