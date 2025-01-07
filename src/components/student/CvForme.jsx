import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CvForme = ({profileData}) => {

  const initialValues = {
    cv: null
  };

  const validationSchema = Yup.object({
    cv: Yup.mixed().required('CV is required'),
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
        <h2 className='text-3xl' style={{width:'100%'}}>CV</h2>
        <div 
        style={{
          width: '100%',
          height: '2px',
          backgroundColor: '#000', // Black color for the line
          marginBottom: '20px', // Adjust the spacing as needed
        }}
      ></div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div style={{ marginBottom: '60px' }}>
              <label htmlFor="cv">CV</label><br />
              <input
                name="cv"
                className="large-input"
                type="file"
                onChange={(e) => handleFileChange(e, setFieldValue)}
              />
              <ErrorMessage name="cv" component="div" style={{ color: 'red' }} />
            </div>
            <div className='font-semibold text-xl mb-4' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button type="submit" className='text-center text-white bg-blue-500 px-4 py-3 rounded'>Télécharger</button>
          </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CvForme;