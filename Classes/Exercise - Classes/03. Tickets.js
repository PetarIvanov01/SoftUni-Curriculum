function ticketFac(data, sortingCr) {

    class Tickets {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }
    let array = [];
    for (const el of data) {
        let [destination, price, status] = el.split('|');
        array.push(new Tickets(destination, Number(price), status))
    };

    const compareFunctions = {
        destination: (a, b) => a.destination.localeCompare(b.destination),
        price: (a, b) => a.price - b.price,
        status: (a, b) => a.status.localeCompare(b.status),
    };

    array.sort(compareFunctions[sortingCr]);

    return array;

}
ticketFac(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination')