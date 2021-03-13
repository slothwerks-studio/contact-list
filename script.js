// Declare variables
let contacts = []; // An array of objects

// Create references to HTML elements
const nameInput = document.getElementById("name-input");
const phoneInput = document.getElementById("phone-input");
const addContactButton = document.getElementById("add-contact-button");
const contactList = document.getElementById("contact-list"); // A DIV element

// Build an onclick handler for the add contact button
// As an onclick handler, this function by default takes an event object
// as an argument; we'll want to prevent the automatic refresh of the
// application due to form submission
// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
function handleAddContactButton(event) {
  // Prevent refresh
  event.preventDefault();
  // Check for user input; if input exists, build a new contact object
  // and add it to the contacts array
  if (nameInput.value && phoneInput.value) {
    const newContact = {
      // TODO: We'll likely want a unique ID for this contact.
      name: nameInput.value,
      phone: phoneInput.value
    };
    contacts.push(newContact);
    // Refresh contacts in the UI
    refreshContacts();
  } else {
    window.alert("Please enter a contact name and phone number.");
  }
}

// Add the handler to the Add Contact button onclick
addContactButton.onclick = handleAddContactButton;

// Build a function that refreshes the contact list in the UI
function refreshContacts() {
  // Wipe out existing elements
  // (never fear; we're rebuilding it from scratch here)
  contactList.innerHTML = "";
  // Loop through the contacts array and add a contact to
  // the contact list for each object stored
  contacts.forEach(function (contact) {
    // Create a new anchor element
    const anchorElement = document.createElement("a");
    // Add href for telephone number
    anchorElement.href = `tel:+1${contact.phone}`;
    // Add a CSS class to the element
    anchorElement.classList.add("contact-link");
    // Add content for the element
    anchorElement.innerText = contact.name;
    // Add the element to the contact list DIV
    contactList.appendChild(anchorElement);
  });
}
