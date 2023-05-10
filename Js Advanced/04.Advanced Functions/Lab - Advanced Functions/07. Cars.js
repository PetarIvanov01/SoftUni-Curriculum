function create(input) {

    let object = {};

    let create = (name, parentName) => {

        let parent = parentName ? object[parentName] : null;
        object[name] = Object.create(parent);

        
    }

    let set = (name, key, value) => {

        object[name][key] = value

    }

    let print = (name) => {

        const obj = object[name];
        const result = [];
        for (const key in obj) {

            result.push(`${key}:${obj[key]}`);

        }
        console.log(result.join(','));

    }

    for (const el of input) {
        let [command, par2, par3, par4] = el.split(' ');

        switch (command) {
            case 'create': create(par2, par4);
                break;
            case 'set': set(par2, par3, par4);
                break;
            case 'print': print(par2);
                break;
                
        }

    }

}
create(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2'])