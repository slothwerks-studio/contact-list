import React, { Fragment, useState, useRef, useEffect } from 'react';
import { retrieveLocalStorage, updateLocalStorage } from './storage';
import { uuid, testPhone } from './utilities';
import ContactCard from './components/ContactCard';

function App() {

  // Set initial state
  // Updating these will result in UI updates automatically
  // https://reactjs.org/docs/hooks-state.html
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    mode: "Add",
    name: "",
    phone: ""
  })

  // Create references
  // Updating these do not result in UI updates
  // https://reactjs.org/docs/hooks-reference.html#useref
  const contactToEditRef = useRef(null);
  const nameInputRef = useRef();
  const phoneInputRef = useRef();

  // On load, retrieve contacts from storage
  useEffect(function() {
    const contactsInStorage = retrieveLocalStorage();
    // Update app state with retrieved data
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
    contactToEditRef.current = contact;
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
      // Update contacts in state
      setContacts(newContacts);
      // Update localStorage with changes
      updateLocalStorage(newContacts);
    }
  }

  // Build handlers for form inputs
  function handleNameUpdate(event) {
    // Get value of user input
    const value = event.target.value;
    // Build updated form state
    // We're using a spreader here to create a new object
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    let formUpdate = {
      ...form,
      name: value
    }
    // Update state
    setForm(formUpdate);
  }

  function handlePhoneUpdate(event) {
    // Get value of user input
    const value = event.target.value;
    // Build updated form state
    // We're using a spreader here to create a new object
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    let formUpdate = {
      ...form,
      phone: value
    }
    // Update state
    setForm(formUpdate);
  }

  // Build handler for the contact form submission
  // As an onclick handler, this function by default takes an event object
  // as an argument; we'll want to prevent the automatic refresh of the
  // application due to form submission
  // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  function handleFormSubmit(event) {
    // Prevent refresh
    event.preventDefault();
    // Check for user input; if no input, display alert
    // Otherwise move forward with contact processing
    if (!form.name || !form.phone) {
      window.alert("Please enter a contact name and phone number.");
    } else if (!testPhone(form.phone)) {
      window.alert("Please enter a valid phone number (10 digits).");
    } else {
      // Build updated array of contacts
      // We'll spread the existing contacts into this array
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      let contactsUpdate = [
        ...contacts
      ];
      // Process contact based on mode
      if (form.mode === "Add") {
        // Build new contact object
        const newContact = {
          id: uuid(), // Add unique identifier
          name: form.name,
          phone: form.phone
        };
        // Add contact to array for updating
        contactsUpdate.push(newContact);
      } else if (form.mode === "Update") {
        // Build updated object
        const updatedContact = {
          id: contactToEditRef.current.id,
          name: form.name,
          phone: form.phone
        };
        // Locate the selected contact in the contacts array
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        const contactIndex = contactsUpdate.findIndex(function (contact) {
          // Return the index of the contact with the ID matching the selected contact ID
          return contact.id === contactToEditRef.current.id;
        });
        // Swap old contact data in contacts array with new data
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        contactsUpdate.splice(contactIndex, 1, updatedContact);
      }
      // Update contacts in state
      setContacts(contactsUpdate);
      // Reset form
      resetForm();
      // Update localStorage with changes
      updateLocalStorage(contactsUpdate);
    }
  }

  // Build function which resets the form
  function resetForm() {
    // Reset contactToEdit
    contactToEditRef.current = null;
    // Reset form data
    setForm({
      mode: "Add",
      name: "",
      phone: ""
    });
    // "Blur" inputs
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur
    nameInputRef.current.blur();
    phoneInputRef.current.blur();
  }

  // Use map to go through the contacts array and return contact cards for the UI
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  const contactList = contacts.map(function (contact) {
    return <ContactCard 
      key={contact.id}
      contact={contact}
      handleUpdateContact={handleUpdateContact}
      handleRemoveContact={handleRemoveContact}
    />
  });

  // Build dynamic content for UI based on form mode
  const formLabel = `${form.mode} Contact`;
  let cancelButton = null;
  if (form.mode === "Update") {
    cancelButton = (
      <button
        id="cancel-button"
        type="button"
        onClick={resetForm}
      >
        Cancel
      </button>
    );
  }

  return (
    <Fragment>
      <header>
        <h1>
          My Contacts
        </h1>
        <p className="version-number">
          ver. 1.0.0
        </p>
      </header>

      <main>

        <section>

          <h2 id="form-heading">
            { formLabel }
          </h2>

          <form id="contact-form">
            <div className="input-wrapper">
              <label htmlFor="name">
                Name
              </label>
              <input
                ref={nameInputRef}
                name="name"
                type="text"
                value={form.name}
                placeholder="Contact name"
                maxLength="50"
                onChange={handleNameUpdate}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="phone">
                Phone
              </label>
              <input
                ref={phoneInputRef}
                name="phone"
                type="text"
                value={form.phone}
                placeholder="Contact phone (10 digits)"
                onChange={handlePhoneUpdate}
              />
            </div>
            <div className="button-wrapper">
              <button 
                id="submit-button" 
                type="submit"
                onClick={handleFormSubmit}
              >
                { formLabel }
              </button>
              { cancelButton }
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
