import { useState, useEffect } from 'react';
import { Container } from './App.styled';
 import { ContactForm } from 'components/ContactForm';
import { ContactList } from '../ContactList';
import { Filter } from 'components/Filter/Filter';
import { Text } from 'components/ContactForm/ContactForm.styled';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = newContact => {
    if (
      contacts.find(
        ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is alredy in contacts`);
      return;
    }
    setContacts(prevState => [...prevState, newContact]);
  };

  const handleFilterChange = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const delContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addNewContact} />
      <h2>Contacts</h2>
      <Text>Find contacts by name</Text>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={contacts}
        filter={filter}
        delContact={delContact}
      />
    </Container>
  );
};