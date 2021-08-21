import { uuid } from './utilities';  
  
  // Build an initial contact
  const initialContact = {
    id: uuid(), // Add unique identifier
    name: "SlothWerks",
    phone: "6162586179"
  }  
  
  // Create a function that will load contacts data from localStorage
  // Returns an array of contact objects
  export function retrieveLocalStorage () {
    // Retrieve data from storage
    const stringifiedContacts = localStorage.getItem("contacts");
    // Parse data using JSON.parse()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    const contactsInStorage = JSON.parse(stringifiedContacts);
    if (!contactsInStorage) {
      console.log("No contacts found in local storage.");
      // Seed with sample contact object
      const seededContacts = [ initialContact ];
      // Sync these changes with localStorage
      updateLocalStorage(seededContacts);
      // Return the seeded contacts array
      return seededContacts;
    } else {
      // Return the contacts found in localStorage
      return contactsInStorage;
    }
  }

  // Create a function that will update contacts in localStorage
  // Takes an array of contact objects as an argument
  export function updateLocalStorage (contacts) {
    // Convert contacts array to string using JSON.stringify()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    const stringifiedContacts = JSON.stringify(contacts);
    // Store the stringified values into localStorage
    localStorage.setItem("contacts", stringifiedContacts);
  }