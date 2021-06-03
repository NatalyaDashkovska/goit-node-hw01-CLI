// contacts.js
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// console.log(__dirname);
// console.log(__filename);

//  Раскомментируй и запиши значение
const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath);

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (!fs.existsSync("./temp")) {
      fs.mkdirSync("./temp");
    }
    try {
      console.table(JSON.parse(data));
    } catch (err) {
      console.log(err);
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    try {
      const contacts = JSON.parse(data);
      const contactById = contacts.find(
        (item) => String(item.id) === String(contactId)
      );

      console.table(contactById);
    } catch (err) {
      console.log(err);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    try {
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter(
        (item) => String(item.id) !== String(contactId)
      );
      const newJSONContacts = JSON.stringify(newContacts);
      fs.writeFile(contactsPath, newJSONContacts, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
      console.table(newContacts);
    } catch (err) {
      console.log(err);
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    try {
      const contacts = JSON.parse(data);
      const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
      };
      const newContacts = [...contacts, newContact];
      const newJSONContacts = JSON.stringify(newContacts);
      fs.writeFile(contactsPath, newJSONContacts, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
      console.table(newContacts);
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
