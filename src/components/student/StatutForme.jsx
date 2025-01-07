import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const StatutForme = () => {
  const initialValues = {
    statut: '', 
  };

  const validationSchema = Yup.object({
    statut: Yup.string().required('Statut is required'), // Validation for statut
  });

  const handleSubmit = (values) => {
    console.log('Profile Data:', values);
    alert('Profile updated successfully!');
  };

  return (
    <div style={{ width: '100%' }}>
     
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StatutForme;
