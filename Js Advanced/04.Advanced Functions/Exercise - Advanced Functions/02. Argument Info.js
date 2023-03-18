function solve(...arg) {

    const obj = {};

    for (const el of arg) {
        let type = typeof(el);
        console.log(`${type}: ${el}`);

        if (!obj.hasOwnProperty(type)) {
            obj[type] = 1;
            continue;
        }
        obj[type]++;

    }
    Object.entries(obj)
    .sort((a,b) => b[1] - a[1])
    .forEach(el => console.log(`${el[0]} = ${el[1]}`));

}
solve({ name: 'bob'}, 3.333, 9.999)