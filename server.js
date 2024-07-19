const prompt = require("prompt-sync")();
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Customer = require("./models/customer");

const deleteCustomer = async () => {
  const customerID = prompt("What is the ID of the customer ? ");
  const removedCustomer = await Customer.findByIdAndDelete(customerID);
  console.log("Removed Customer:", removedCustomer);
  promptUser();
};

const createUser = async () => {
  const custName = prompt("What is the customer name? ");
  const custAge = prompt("What is the customer age? ");
  let customer = {
    name: `${custName}`,
    age: `${custAge}`,
  };
  const newcustomer = await Customer.create(customer);
  console.log(
    `new custome ::::  ID: ${newcustomer.id} -- name: ${newcustomer.name}  , age ${newcustomer.age} \n`
  );
  promptUser();
};

const findCustomers = async () => {
  const customer = await Customer.find({});
  console.log(`below is a list of customers : \n`);
  customer.forEach((element) => {
    console.log(
      `ID: ${element.id} -- name: ${element.name}  , age ${element.age} \n`
    );
  });

  promptUser();
};

const updateCustomer = async () => {
  const customer = await Customer.find({});
  console.log(`below is a list of customers : \n`);
  customer.forEach((element) => {
    console.log(
      `ID: ${element.id} -- name: ${element.name}  , age ${element.age} \n`
    );
  });

  const custID = prompt("What is the customer id that you want to change? ");
  const newName = prompt("What is the customer new name? ");
  const newAge = prompt("What is the customer new age? ");

  const updatedCustomer = await Customer.findByIdAndUpdate(custID, {
    name: newName,
    age: newAge,
  });
  console.log("\n");
  findCustomers();
};
const promptUser = async () => {
  console.log(
    ` What would you like to do? \n 1. Create a customer \n 2. View all customers \n 3. Update a customer \n 4. Delete a customer \n 5. quit \n Number of action to run:`
  );
  let decision = prompt();

  promptChecker(decision);
};
const promptChecker = async (choice) => {
  switch (choice) {
    case "1":
      createUser();
      break;
    case "2":
      findCustomers();
      break;
    case "3":
      updateCustomer();
      break;
    case "4":
      deleteCustomer();
      break;
    case "5":
      console.log("exiting..");
      process.exit();

      // mongoose connection close dont work sometimes  so im using process.exit instead ????
      // mongoose.connection.close();

      break;

    default:
      promptUser();
      break;
  }
};

const username = prompt("What is your name? ");
console.log(`Your name is ${username}`);
console.log(`\n`);
promptUser();

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};
connect();
