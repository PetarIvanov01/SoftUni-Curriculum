function lowestPriceInCities(input) {

    let products = [];

    for (const el of input) {
        let [town, product, price] = el.split(` | `)

        if (products.filter(x => x.product === product).length > 0) {

            let obj = products.find(x => x.product === product)


            if (obj.price > Number(price)) {

                obj.price = price;
                obj.town = town;

            }
        }
        else {
            let obj = { product, town, price: Number(price), }
            products.push(obj);
        }
    }

    for (const el of products) {

        console.log(`${el.product} - ${el.price} (${el.town})`);
    
    }

}
lowestPriceInCities
    ([
        'Sample Town | Sample Product | 1000',
        'Sample Town | Orange | 2',
        'Sample Town | Peach | 1',
        'Sofia | Orange | 3',
        'Sofia | Peach | 2',
        'New York | Sample Product | 1000.1',
        'New York | Burger | 10'
    ])