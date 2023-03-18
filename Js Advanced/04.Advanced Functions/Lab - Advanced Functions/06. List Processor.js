function processor(input) {

    let collection = []
    let obj = {
        add: (s) => collection.push(s),
        remove: (s) => collection = collection.filter(el => el !== s),
        print: () => console.log(collection.join(',')),
    }
    
    for (const el of input) {

        let [command, string] = el.split(' ');
        obj[command].call(obj,string)
        
    }
}
processor(
    ['add hello',
        'add again',
        'remove hello',
        'add again',
        'print']
)