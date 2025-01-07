import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UploadCv from '../../Services/UploadCv';

const CvForme = ({profileData}) => {

  const [submitting, setSubmitting] = useState(false)

  const initialValues = {
    cv: null
  };

  const validationSchema = Yup.object({
    cv: Yup.mixed()
    .required('CV is required')
    .test('fileType', 'Only PDF files are allowed', (value) =>
      value && value.type === 'application/pdf'
    )
    .test('fileSize', 'File size is too large', (value) =>
      value && value.size <= 20 * 1024 * 1024 // 5MB limit
    ),
  });


  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0]; 
    setFieldValue('cv', file); 
  };

  const handleSubmit = async(values) => {
    try{
      setSubmitting(true);
    const response =await UploadCv(values.cv);
    console.log('response: ' + response);
    }catch(error){
      console.error('an error has occured: '+error)
    }finally {
      setSubmitting(false);
    }
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
          <button type="submit" className='text-center text-white bg-blue-500 px-4 py-3 rounded'>{submitting ? 'Uploading...' : 'Télécharger'}</button>
          </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CvForme;