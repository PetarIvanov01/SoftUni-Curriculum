function jsonToHtml(input) {

    let obj = JSON.parse(input)

    let columnNames = Object.keys(obj[0])
    let values = obj.map(el => Object.values(el))


    let result = `<table>\n`;

    appendHeaders(columnNames)
    appendValues(values)

    result += `</table>`

    function appendValues(values) {
        for (let value of values) {
            result += `   <tr>`
            for (const command of value) {
                
            result += `<td>${escape(command)}</td>`
            //<table>
            //<tr><th>Name</th><th>Score</th><th>Grade</th></tr>
            // <tr><td>Pesho</td><td>4</td><td>8</td></tr>
            //<tr><td>Gosho</td><td>5</td><td>8</td></tr>
            // <tr><td>Angel</td><td>5.5</td><td>10</td></tr>
            //</table>

            }
            result += `</tr>`
            result += `\n`
        }
    }

    function appendHeaders(columnNames) {
        result += `   <tr>`
        for (let columName of columnNames) {

            result += `<th>${columName.trim()}</th>`

        }
        result += `</tr>\n`
    }
    function escape(value) {
        return value.toString().replace('<', '&lt;').replace('>', '&gt;')
    }
    console.log(result);


}
jsonToHtml(`[{"Name":"Stamat",

"Score":5.5},

{"Name":"Rumen",

"Score":6}]`)