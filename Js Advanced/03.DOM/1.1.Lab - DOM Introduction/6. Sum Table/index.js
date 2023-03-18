// function sum() {

//     let data = document.querySelectorAll('tr','td')
//     let sum = 0

//     for (const el of data) {
//         sum += Number(el.children[1].textContent)
//     }
//     document.getElementById('sum').textContent = sum
// }

function sum(params) {

    let data = document.querySelectorAll('table tr');
    let total = 0;

    for (let i = 1; i < data.length; i++) {
        let cols = data[i].children
        let cost = cols[cols.length-1].textContent;
        total += Number(cost);
    }
    document.getElementById('sum').textContent = total
}