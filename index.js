const argv = require("yargs").argv;
const chalk = require("chalk");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contacts = await listContacts();
        if (contacts.length) {
          console.log(chalk.green("Contacts list:"));
          console.table(contacts);
        } else {
          console.log(chalk.red("Contacts list is empty"));
        }
      } catch (err) {
        console.error(err);
      }
      break;

    case "get":
      try {
        const contact = await getContactById(id);
        if (contact) {
          console.log(chalk.green("Contact found!"));
          console.log(contact);
        } else {
          console.log(chalk.red("Contact not found :-("));
        }
      } catch (err) {
        console.error(err);
      }
      break;

    case "add":
      try {
        const newContact = await addContact(name, email, phone);
        console.log(chalk.green("Add new contact!"));
        console.log(newContact);
      } catch (err) {
        console.error(err);
      }
      break;

    case "remove":
      try {
        const contact = await removeContact(id);
        if (contact) {
          console.log(chalk.green("Removed contact:"));
          console.log(contact);
        } else {
          console.log(chalk.red("Contact not found :-("));
        }
      } catch (err) {
        console.error(err);
      }
      break;

    default:
      console.warn(chalk.red("Unknown action type!"));
  }
}

invokeAction(argv);
