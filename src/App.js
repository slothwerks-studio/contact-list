import React, { Fragment, useState, useEffect } from 'react';
import { retrieveLocalStorage } from './storage';

function App() {

  // Set initial state
  const [contacts, setContacts] = useState([]);
  const [formMode, setFormMode] = useState("Add");
  const [contactToEdit, setContactToEdit] = useState(null);

  // On load, retrieve contacts from storage
  useEffect(() => {
    const contactsInStorage = retrieveLocalStorage();
    setContacts(contactsInStorage);
  }, []);

  return (
    <Fragment>
      <header>
        <h1>
          My Contacts
        </h1>
        <p class="version-number">
          ver. 0.3.3
        </p>
      </header>

      <main>

        <section>

          <h2 id="form-heading">
            {/* Heading content determined by JS */}
          </h2>

          <form id="contact-form">
            <div class="input-wrapper">
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
            <div class="input-wrapper">
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
            <div class="button-wrapper">
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
            {/* Contacts will go here */}
          </div>

        </section>

      </main>
    </Fragment>
  );
}

export default App;
