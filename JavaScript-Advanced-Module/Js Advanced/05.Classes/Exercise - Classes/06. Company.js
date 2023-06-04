class Company {

    constructor() {
        this.departments = {};
        this.averageSalary = {};
    }

    addEmployee(name, salary, position, department) {
        if (!name || !salary || !position || !department) {
            throw new Error("Invalid input!");
        }

        if (salary < 0) {
            throw new Error("Invalid input!");
        }

        const employee = { name, salary, position };
        if (!this.departments[department]) {
            this.departments[department] = [];
            this.averageSalary[department] = 0;
        }

        const employeesInDept = this.departments[department];
        const totalSalary = employeesInDept.reduce((acc, emp) => acc + emp.salary, 0);
        const newTotalSalary = totalSalary + salary;
        const newAvgSalary = newTotalSalary / (employeesInDept.length + 1);
        this.averageSalary[department] = newAvgSalary;

        employeesInDept.push(employee);

        return `New employee is hired. Name: ${name}. Position: ${position}`;
    }

    bestDepartment() {
        let bestDept = "";
        let highestAvgSalary = 0;

        for (const dept in this.averageSalary) {
            const avgSalary = this.averageSalary[dept];
            if (avgSalary > highestAvgSalary) {
                highestAvgSalary = avgSalary;
                bestDept = dept;
            }
        }

        const employeesInDept = this.departments[bestDept];
        const sortedEmployees = employeesInDept.sort((a, b) => {
            if (b.salary === a.salary) {
                return a.name.localeCompare(b.name);
            }
            return b.salary - a.salary;
        });

        let output = `Best Department is: ${bestDept}\n`;
        output += `Average salary: ${highestAvgSalary.toFixed(2)}\n`;

        sortedEmployees.forEach((emp) => {
            output += `${emp.name} ${emp.salary} ${emp.position}\n`;
        });

        return output.trim();
    }
}
let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
