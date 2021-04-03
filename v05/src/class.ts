class Department1
{
	name : string;

	constructor(n: string)
	{
		this.name = n;
	}

	// 'this' is a special paramter, a special instruction understood by TS. If you add a paramter named 'this', it's not really a parameter
	// which is expected. You can still call describe without passing in any value instead. This is interpreted by TS to be a hint regarding
	// what this should be referred to. Now it's important to assign type to 'this' and type will be our class type. 
	describe(this: Department1)
	{
		console.log("Department1 : " + this.name);
	}

	Hello() {}
}

const acc1 = new Department1("Account");
acc1.describe();
// console.log(acc1);

const copy1 = {
	name: "gunjan",
	describe : acc1.describe,
	Hello: function(){},

	// Extra data members (compared to class Department1)
	age: 12,
	rec: function(){},
};

// We can't call describe() method of class Department1 because describe() method assumes a class Department1 like type object. So to make our
// 'copy1' object like Department1 object, we need all that data members (variables and functions) which are in class Department1. We can have
// extra data members in our 'copy1' object.
copy1.describe();