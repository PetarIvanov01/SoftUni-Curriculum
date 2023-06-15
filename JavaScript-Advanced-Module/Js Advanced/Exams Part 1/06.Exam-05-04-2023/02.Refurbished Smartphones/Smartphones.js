class RefurbishedSmartphones {
    constructor(retailer) {
        this.retailer = retailer;
        this.availableSmartphones = [];
        this.soldSmartphones = [];
        this.revenue = 0
    }

    addSmartphone(model, storage, price, condition) {

        if (model == '' || storage < 0 || !Number.isInteger(storage) || typeof price !== 'number' || price < 0 || condition === '') {
            throw new Error('Invalid smartphone!');
        }

        this.availableSmartphones.push({ model, storage, price, condition });

        return `New smartphone added: ${model} / ${storage} GB / ${condition} condition - ${price.toFixed(2)}$`
    }

    sellSmartphone(model, desiredStorage) {
        const phone = this.availableSmartphones.find(phone => phone.model == model)

        if (phone == undefined) {
            throw new Error(`${model} was not found!`)
        }
        const currStorage = phone.storage;
        const diffInStorage = Math.abs(currStorage - desiredStorage)
        if (currStorage >= desiredStorage) {
            //The price stays the same 
        }
        else if (diffInStorage <= 128) {
            phone.price = phone.price * 0.90;
        }
        else if (diffInStorage > 128) {
            phone.price = phone.price * 0.80;
        }
        const index = this.availableSmartphones.indexOf(phone);
        const soldPhone = this.availableSmartphones.splice(index, 1)[0];

        this.soldSmartphones.push(soldPhone);
        this.revenue += soldPhone.price;

        return `${model} was sold for ${soldPhone.price.toFixed(2)}$`

    }

    upgradePhones() {
        if (this.availableSmartphones.length == 0) {
            throw new Error('There are no available smartphones!');
        }
        let result = 'Upgraded Smartphones:\n';
        this.availableSmartphones.map(doubleTheStorage);
        function doubleTheStorage(phone) {

            phone.storage *= 2;
            result += `${phone.model} / ${phone.storage} GB / ${phone.condition} condition / ${phone.price.toFixed(2)}$\n`
        }
        return result.trim()
    }

    salesJournal(criteria) {
        //storage or model
        if (criteria !== 'storage' && criteria !== 'model') {
            throw new Error('Invalid criteria!');
        }
        if (criteria == 'storage') {
            this.soldSmartphones.sort((a, b) => b.storage - a.storage);
        }
        else if (criteria == 'model') {
            this.soldSmartphones.sort((a, b) => (a.model).localeCompare(b.storage));
        }
        let result = `${this.retailer} has a total income of ${this.revenue.toFixed(2)}$\n${this.soldSmartphones.length} smartphones sold:`
        this.soldSmartphones.forEach(el => result += `\n${el.model} / ${el.storage} GB / ${el.price.toFixed(2)}$`)
        return result.trim();
    }

}
let retailer = new RefurbishedSmartphones('SecondLife Devices');
retailer.addSmartphone('Samsung S20 Ultra', 256, 1000, 'good');
retailer.addSmartphone('Iphone 12 mini', 128, 800, 'perfect');
retailer.addSmartphone('Xiaomi Redmi Note 10 Pro', 128, 330, 'perfect');
retailer.sellSmartphone('Samsung S20 Ultra', 256);
retailer.sellSmartphone('Xiaomi Redmi Note 10 Pro', 256);
console.log(retailer.salesJournal('model'));

