import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { nanoid } from 'nanoid';
import {
  FormField,
  Form,
  Field,
  ErrorMessage,
  FormButton,
} from './Phonebook.styled';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';

const userSchema = object().shape({
  name: string()
    .min(3)
    .max(25)
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required('This field is required!'),
  number: string()
    .min(5)
    .max(15)
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('This field is required!'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const addContactHandler = (values, actions) => {
    if (
      contacts.find(
        contact =>
          contact.name.toLocaleLowerCase() ===
          values.name.toLocaleLowerCase().trim()
      )
    ) {
      return alert(`${values.name} is already in contacts`);
    }

    dispatch(addContact({ ...values, id: nanoid() }));

    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ name: '', number: '' }}
        onSubmit={(values, actions) => {
          addContactHandler(values, actions);
        }}
        validationSchema={userSchema}
      >
        <Form>
          <FormField htmlFor="name">Name</FormField>
          <ErrorMessage name="name" component="span" />
          <Field type="text" name="name" />

          <FormField htmlFor="number">Number</FormField>
          <ErrorMessage name="number" component="span" />
          <Field type="tel" name="number" />

          <FormButton type="submit">Add contact</FormButton>
        </Form>
      </Formik>
    </>
  );
};
