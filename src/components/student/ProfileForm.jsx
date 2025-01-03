import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const profileForm = () => {

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    cv: null
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
      .required('Required'),
    address: Yup.string().required('Required'),
  });

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0]; 
    setFieldValue('cv', file); 
  };

  const handleSubmit = (values) => {
    console.log('Profile Data:', values);
    alert('Profile updated successfully!');
  };

  return (
    <div style={{width:'100%'}}>
        <h2 style={{width:'100%'}}>Update Profile</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className='firstname-and-lastname'>
            <div className='firstName'>
              <label htmlFor="firstName">First Name</label><br></br>
              <Field name="firstName" className="small-input" type="text" />
            </div>
            <div className='lastName'>
            <label htmlFor="lastName">Last Name</label><br></br>
            <Field name="lastName" className="small-input" type="text" />
           
          </div>
           
          </div>
          
          <div style={{marginBottom:'60px'}}>
            <label htmlFor="email">Email</label><br></br>
            <Field name="email" className="large-input" type="email" />
            
          </div>
          <div style={{marginBottom:'60px'}}>
            <label htmlFor="phone">Phone</label><br></br>
            <Field name="phone" className="large-input" type="text" />
            
          </div>
          <div style={{marginBottom:'60px'}}>
            <label htmlFor="address">Address</label><br></br>
            <Field name="address" className="large-input" type="text" />
            
          </div>
          <div style={{marginBottom:'60px'}}>
            <label htmlFor="cv">CV</label><br></br>
            <input name="cv" className="large-input" type="file" onChange={(e) => handleFileChange(e, setFieldValue)}/>
            
          </div>
          <button type="submit" >Save</button>
        </Form>
      </Formik>
    </div>
  )
}

export default profileForm;