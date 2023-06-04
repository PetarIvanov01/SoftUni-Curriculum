function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick() {

      let input = JSON.parse(document.querySelector('#inputs textarea').value);

      let restourantObj = {};
      let bestRestourantOutput = document.querySelector('#bestRestaurant p');
      let bestWorkersOutput = document.querySelector('#workers p');

      for (const currentRow of input) {
         let [restourant, ...other] = currentRow.split(' - ');
         let workersWithSalary = other.join(', ').split(', ');

         for (const row of workersWithSalary) {
            let [worker, salary] = row.split(' ')

            if (!restourantObj.hasOwnProperty(restourant)) {

               restourantObj[restourant] = {}
               restourantObj[restourant]['averageSalary'] = 0

            }
            if (restourantObj.hasOwnProperty(restourant)) {

               restourantObj[restourant][worker] = Number(salary);

            }
         }
      }

      for (const [restourant, other] of Object.entries(restourantObj)) {

         let averageSalaryValues = Object.values(restourantObj[restourant]);
         restourantObj[restourant]['averageSalary'] = averageSalaryValues.reduce((a, b) => a + b) / (averageSalaryValues.length - 1);

      }

      let entries = Object.entries(restourantObj)
      let sortedByAverageSalary = entries.sort((a, b) => b[1].averageSalary - a[1].averageSalary);

      let bestRestourant = sortedByAverageSalary.shift()
      let bestSalary = []

      for (const el of Object.values(bestRestourant[1])) {

         bestSalary.push(el)

      }

      bestSalary.shift();
      bestSalary = Math.max(...bestSalary)
      bestRestourantOutput.textContent = `Name: ${bestRestourant[0]} Average Salary: ${(bestRestourant[1].averageSalary).toFixed(2)} Best Salary: ${bestSalary.toFixed(2)}`

      let workersObj = Object.entries(bestRestourant[1]).splice(1)
      let sortedWorkers = workersObj.sort((a, b) => b[1] - a[1])

      for (const [name, salary] of sortedWorkers) {

         bestWorkersOutput.textContent += `Name: ${name} With Salary: ${salary} `

      }
   }
}