function addRemoveEl(input) {
    
    let arr = []
    let increasedNum = 1
    for (let i = 0; i < input.length; i++) {
        if (input[i] === `add` ) {
            arr.push(increasedNum + i)
        }
        else{
            arr.pop()
        }        
    }
    if (arr.length === 0)  return `Empty`
    
    return arr.join(`\n`)
}
addRemoveEl(['add',
'add',
'add',
'add'])