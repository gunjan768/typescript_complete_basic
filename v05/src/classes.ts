abstract class Department 
{
    // private readonly id: string;
	// public name : string;
    protected employees: string[] = [];
    
    // To use static member from inside the non static method, use className.variableName eg : Department.fiscalYear
    static fiscalYear = 2021;

	// constructor(n: string)
	// {
	// 	this.name = n;
	// }


    // 'readonly' is the access specifier which will prevent from changing the value of the variable

    // We can avoid writing the names of the data members above by explicitly mentioning them in the constructor parameters. By writing
    // this way (see constructor parameters) we are saying that we want the data members with the same name as what we have written in
    // the constructor parameter like here 'id' and 'name' will be created as data members.
    constructor(protected readonly id: string, public name: string)
	{
		// this.name = n;
	}

	// 'this' is a special paramter, a special instruction understood by TS. If you add a paramter named 'this', it's not really a parameter
	// which is expected. You can still call describe without passing in any value instead. This is interpreted by TS to be a hint regarding
	// what this should be referred to. Now it's important to assign type to 'this' and type will be our class type. 
	// describe(this: Department)
	// {
	// 	console.log("Department : " + this.name + " " + this.id);
	// }

    abstract describe(this: Department): void;

	Hello() {}

    addEmployee(emp : string)
    {
        this.employees.push(emp);
    }

    print()
    {
        console.log(this.employees.length);
        console.log(this.employees);
    }

    static createEmployee(name: string)
    {
        return {name};
    }
}

class ItDepartment extends Department
{
    constructor(id: string, public admins: string[])
    {
        super(id, "Information Technology");
    }

    describe() 
    {
        console.log('IT Department - ID' + this.id);
    }
}

class CseDepartment extends Department
{
    private lastReport: string;
    private static instance: CseDepartment;

    // 'get' keyword is used to define getter. Getter is basically a property where you execute a function or a method when you retrieve a 
    // value. mostRecentReport() is a getter. We can acces the getter like a property but not like a function.
    get mostRecentReport()
    {
        if(this.lastReport)
        return this.lastReport;

        throw new Error('No report found');
    }

    // 'set' keyword is used to define setter. mostRecentReport() is a setter.
    set mostRecentReport(value: string)
    {
        if(!value)
        {
            throw new Error('Please pass in a valid value!');
        }

        this.addReport(value);
    }

    private constructor(id: string, public reports: string[])
    {
        super(id, "Computer Science");
        this.lastReport = reports[0];
    }

    // Overriding a method describe()
    describe()
    {
        console.log("Inside the CseDepartment ID : " + this.id);
    }

    // We have overriden method 'addEmployee' of Department (parent) class.
    addEmployee(name: string)
    {
        if(name === 'Max')
        return;

        // Private properties are only accessible from inside the class in which they are defined, even not from the inherit class. So we
        // can't access 'employees' array of Department class as it is private. So to access we need to change it to protected.
        this.employees.push(name);
    }

    addReport(text: string)
    {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports()
    {
        console.log(this.reports);
    }

    static getInstance()
    {
        if(!CseDepartment.instance)
        {
            // As we are inside the static method so this will not refer to the calling object as static method is not called using object,
            // rather called using class name so this refers to class.
            this.instance = new CseDepartment("G2", []);
        }

        return this.instance;
    }
}


// ***********************************************************************************************************************************


// const acc2 = new Department('G1', "Account");
// console.log(acc2);

const employee1 = Department.createEmployee('Bhawna');
console.log(employee1, Department.fiscalYear);

const it = new ItDepartment('G1', ["Gunjan", "Emilia", "Mallika"]);

it.addEmployee('Gunjan');
it.addEmployee("Prabhat");
it.describe();
it.print();

console.log(it);


// ***********************************************************************************************************************************


const cse = CseDepartment.getInstance();

cse.mostRecentReport = 'Year End Report';
cse.addReport("She loves me");

// Call the getter as a property not as a function.
console.log(cse.mostRecentReport);

cse.addEmployee('Max');
cse.addEmployee('Ganju');
cse.printReports();
cse.describe();