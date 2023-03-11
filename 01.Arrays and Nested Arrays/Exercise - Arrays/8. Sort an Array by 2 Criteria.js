function sortArray(input) {

    let sorted = input.sort((a, b) => a.length - b.length || a.localeCompare(b));

    return sorted.join(`\n`);
}
sortArray([`alpha`, `beta`, `gamma`])