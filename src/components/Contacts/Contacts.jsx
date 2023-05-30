import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  getContacts,
  getFilter,
  getIsLoading,
  getError,
} from 'redux/selectors';
import { Loader } from 'components/Loader/Loader';
import { fetchContacts, removeContact } from 'redux/operations';
import { Contacts, ContactItem, FormButton } from './Contacts.styled';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const filter = useSelector(getFilter);

  const onDelete = id => {
    dispatch(removeContact(id));
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getVisibleContacts = (contacts, filter) => {
    return [...contacts].filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContacts = getVisibleContacts(contacts, filter);
  return (
    <>
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      {getVisibleContacts.length > 0 && (
        <Contacts>
          {visibleContacts.map(contact => (
            <ContactItem key={contact.id}>
              <span>{contact.name}: </span>
              <span>{contact.phone}</span>
              <FormButton type="button" onClick={() => onDelete(contact.id)}>
                Delete
              </FormButton>
            </ContactItem>
          ))}
        </Contacts>
      )}
    </>
  );
};
