const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  let contacts;
  try {
    contacts = JSON.parse(data);
  } catch (err) {
    contacts = [];
  }
  return contacts;
}

async function writeContacts(contacts) {
  try {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error(err);
  }
}

function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const [contact] = contacts.filter(
    (contact) => String(contact.id) === String(contactId)
  );
  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const [removedContact] = contacts.filter(
    (contact) => String(contact.id) === String(contactId)
  );
  const filteredContacts = contacts.filter(
    (contact) => String(contact.id) !== String(contactId)
  );
  await writeContacts(filteredContacts);
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: shortid.generate(), name, email, phone };
  await writeContacts([...contacts, newContact]);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
