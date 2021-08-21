import React, { Fragment, useState, useEffect } from 'react';
import { retrieveLocalStorage, updateLocalStorage } from './storage';

function App() {

  // Set initial state
  const [contacts, setContacts] = useState([]);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [form, setForm] = useState({
    mode: "Add",
    name: "",
    phone: ""
  })

  // On load, retrieve contacts from storage
  useEffect(() => {
    const contactsInStorage = retrieveLocalStorage();
    setContacts(contactsInStorage);
  }, []);

  // Build handlers for contact cards
  function handleUpdateContact(id) {
    // Find contact in contact list
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const contact = contacts.find(function (contact) {
      // Return the contact with the ID matching the selected contact ID
      return contact.id === id;
    });
    // Update contactToEdit with contact data
    setContactToEdit(contact);
    // Update form values
    setForm({
      mode: "Update",
      name: contact.name,
      phone: contact.phone
    });
  }

  function handleRemoveContact(id) {
    // Find contact in contact list
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const contact = contacts.find(function (contact) {
      // Return the contact with the ID matching the selected contact ID
      return contact.id === id;
    });
    if (window.confirm(`Are you sure you want to remove ${contact.name} from your contact list?`)) {
      // Build new contact list using filter
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      const newContacts = contacts.filter(function (contact) {
        // If the contact ID does *not* match the selected ID,
        // add it to a new contacts array
        return contact.id !== id;
      });
      // Update the contacts array
      setContacts(newContacts);
      // Update localStorage with changes
      updateLocalStorage(newContacts);
    }
  }

  // Use map to go through the contacts array and return contact cards for the UI
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  const contactList = contacts.map(function (contact) {
    return (
      <div className="contact">
        <a className="contact-link" href={`tel:+1${contact.phone}`}>{contact.name}</a>
          <button 
            type="button"
            className="contact-option-button"
            onclick={() => handleUpdateContact(contact.id)}
          >
            [update]
          </button>
          <button 
            type="button"
            className="contact-option-button"
            onclick={() => handleRemoveContact(contact.id)}
          >
            [remove]
        </button>
      </div>
    );
  });

  return (
    <Fragment>
      <header>
        <h1>
          My Contacts
        </h1>
        <p className="version-number">
          ver. 0.3.3
        </p>
      </header>

      <main>

        <section>

          <h2 id="form-heading">
            {/* Heading content determined by JS */}
          </h2>

          <form id="contact-form">
            <div className="input-wrapper">
              <label for="name">
                Name
              </label>
              <input
                name="name"
                type="text"
                id="name-input"
                placeholder="Contact name"
                maxlength="50"
              />
            </div>
            <div className="input-wrapper">
              <label for="phone">
                Phone
              </label>
              <input
                name="phone"
                type="text"
                id="phone-input"
                placeholder="Contact phone (10 digits)"
                pattern="[0-9]{10}"
              />
            </div>
            <div className="button-wrapper">
              <button 
                id="submit-button" 
                type="submit"
              >
                {/* Button content determined by JS */}
              </button>
              <button
                id="cancel-button"
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>

        </section>

        <section>

          <h2>
            Contact List
          </h2>

          <div id="contact-list">
            { contactList }
          </div>

        </section>

      </main>
    </Fragment>
  );
}

export default App;
