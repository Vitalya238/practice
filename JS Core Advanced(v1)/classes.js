class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }

    getAnnualSalary() {
        return this.salary * 12;
    }
}

class Manager extends Employee {
    constructor(name, salary, department, bonus) {
        super(name, salary);
        this.department = department;
        this.bonus = bonus;
    }

    getAnnualSalary() {
        return (this.salary * 12) + this.bonus;
    }
}

const manager1 = new Manager('саня', 5000, 'ит', 10000);
const manager2 = new Manager('саня2', 6000, 'ит', 15000);

console.log(`годовая зарпалата работника ${manager1.name}: $${manager1.getAnnualSalary()}`);

console.log(`годовая зарпалата работника ${manager2.name}: $${manager2.getAnnualSalary()}`);

console.log(`${(manager1.getAnnualSalary() > manager2.getAnnualSalary()) ? manager1.name : manager2.name} крутой`);