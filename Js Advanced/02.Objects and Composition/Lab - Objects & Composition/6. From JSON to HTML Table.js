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
        return value.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
    console.log(result);
}
jsonToHtml(`[{"Name":"Stamat",

"Score":5.5},

{"Name":"Rumen",

"Score":6}]`)