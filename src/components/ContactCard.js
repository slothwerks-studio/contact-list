import React from 'react';

function ContactCard(props) {
  // Acquire data from props
  const { contact, handleRemoveContact, handleUpdateContact } = props;

  return (
    <div className="contact" key={contact.id}>
      <a className="contact-link" href={`tel:+1${contact.phone}`}>{contact.name}</a>
        <button 
          type="button"
          className="contact-option-button"
          onClick={() => handleUpdateContact(contact.id)}
        >
          [update]
        </button>
        <button 
          type="button"
          className="contact-option-button"
          onClick={() => handleRemoveContact(contact.id)}
        >
          [remove]
      </button>
    </div>
  );
}

export default ContactCard;