class OnlineShop {
    constructor(warehouseSpace) {
        this.warehouseSpace = Number(warehouseSpace);
        this.products = [];
        this.sales = [];
    }

    loadingStore(product, quantity, spaceRequired) {
        if (this.warehouseSpace < spaceRequired) {
            throw new Error('Not enough space in the warehouse.')
        }
        this.products.push({ product, quantity })
        this.warehouseSpace -= spaceRequired;
        return `The ${product} has been successfully delivered in the warehouse.`
    }
    quantityCheck(product, minimalQuantity) {
        if (!this.products.some(el => el.product === product)) {
            throw new Error(`There is no ${product} in the warehouse.`)
        }
        if (minimalQuantity <= 0) {
            throw new Error('The quantity cannot be zero or negative.')
        }
        for (const el of this.products) {
            if (el.product === product) {
                if (el.quantity >= minimalQuantity) {

                    return `You have enough from product ${product}.`

                }
                else {
                    let diff = minimalQuantity - el.quantity
                    el.quantity = minimalQuantity;
                    return `You added ${diff} more from the ${product} products.`
                }
            }
        }
    }
    sellProduct(product) {
        if (!this.products.some(el => el.product === product)) {
            throw new Error(`There is no ${product} in the warehouse.`)
        }
        for (const el of this.products) {
            if (el.product === product) {
                el.quantity -= 1;
                this.sales.push({ product, quantity: 0 })
                this.sales.forEach(el => {
                    if (el.product === product) {
                        el.quantity += 1
                    }
                })
                return `The ${product} has been successfully sold.`
            }
        }
    }
    revision() {
        if (this.sales.length === 0) {
            throw new Error('There are no sales today!');
        }
        let output = '';
        let sales = this.sales.reduce((a, b) => a + b.quantity, 0);
        output += `You sold ${sales} products today!\n`;
        output += 'Products in the warehouse:\n';
        this.products.forEach(el => {
            let [p, q] = Object.values(el);
            output += `${p}-${q} more left\n`;
        })
        return output.trim();
    }


}
const myOnlineShop = new OnlineShop(500)
console.log(myOnlineShop.loadingStore('headphones', 10, 200));
console.log(myOnlineShop.loadingStore('laptop', 5, 200));

console.log(myOnlineShop.quantityCheck('headphones', 10));
console.log(myOnlineShop.quantityCheck('laptop', 10));

console.log(myOnlineShop.sellProduct('headphones'));
console.log(myOnlineShop.sellProduct('laptop'));
console.log(myOnlineShop.revision());



// const myOnlineShop = result;
// let Shop = new myOnlineShop(500);

// assert.equal(Shop.loadingStore('headphones', 10, 200), "The headphones has been successfully delivered in the warehouse.");
// assert.equal(Shop.loadingStore('laptop', 5, 200), "The laptop has been successfully delivered in the warehouse.");
// assert.equal(Shop.quantityCheck('headphones', 10), "You have enough from product headphones.");
// assert.equal(Shop.quantityCheck('laptop', 10), "You added 5 more from the laptop products.");
// expect(() => Shop.quantityCheck('TV', 10)).to.throw("There is no TV in the warehouse.");



