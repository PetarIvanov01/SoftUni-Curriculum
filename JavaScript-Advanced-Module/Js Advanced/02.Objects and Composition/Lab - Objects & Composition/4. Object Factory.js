function objectFactory(libraryObj, orders) {

    let result = [];
    
    for (const {template, parts} of orders) {
        let order = Object.assign({},template);

        for (const part of parts) {

            let func = libraryObj[part] ;
            order[part] = func;

        } 
        result.push(order);
    }

    return result;
}
const library =
{
    print: function () {
        console.log(`${this.name} is printing a page`);
    },
    scan: function () {
        console.log(`${this.name} is scanning a document`);
    },
    play: function (artist, track) {
        console.log(`${this.name} is playing '${track}' by ${artist}`);
    },
};
const orders = [
    {
        template: { name: 'ACME Printer' },
        parts: ['print']
    },
    {
        template: { name: 'Initech Scanner' },
        parts: ['scan']
    },
    {
        template: { name: 'ComTron Copier' },
        parts: ['scan', 'print']
    },
    {
        template: { name: 'BoomBox Stereo' },
        parts: ['play']
    }];
const products = objectFactory(library, orders); 
products.forEach(el=>console.log(el))