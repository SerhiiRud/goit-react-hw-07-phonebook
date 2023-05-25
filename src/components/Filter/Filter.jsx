import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Field, FormField } from './Filter.styled';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  const onSearch = event => {
    event.preventDefault();
    const form = event.target;
    dispatch(setFilter(form.value));
  };

  return (
    <Formik>
      <>
        <FormField htmlFor="filter">Find contacts by name</FormField>
        <Field type="text" name="filter" onChange={onSearch}></Field>
      </>
    </Formik>
  );
};
