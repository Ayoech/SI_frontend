import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UploadCv from '../../Services/UploadCv';

const CvForme = ({ profileData }) => {
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    cv: profileData?.cv_path || null
  };

  const validationSchema = Yup.object({
    cv: Yup.mixed()
      .required('CV is required')
      .test('fileType', 'Only PDF files are allowed', (value) =>
        value && value.type === 'application/pdf'
      )
      .test('fileSize', 'File size is too large', (value) =>
        value && value.size <= 20 * 1024 * 1024 // 20MB limit
      ),
  });

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue('cv', file);
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const response = await UploadCv(values.cv);
      console.log('response: ' + response);
    } catch (error) {
      console.error('An error has occurred: ' + error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveCv = () => {
    // Logic to remove the CV (e.g., update the profileData, call a backend API to delete the CV, etc.)
    console.log('Remove CV');
  };

  const handleViewCv = () => {
    // Logic to view the CV (e.g., open in a new tab)
    window.open(profileData?.cv_path, '_blank');
  };

  return (
    <div style={{ width: '100%' }}>
      <h2 className='text-3xl' style={{ width: '100%' }}>CV</h2>
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

            {/* Conditional rendering of View and Remove buttons */}
            {profileData?.cv_path && (
              <div className='mb-4' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={handleViewCv}
                  className='text-center text-white bg-blue-500 px-4 py-3 rounded mr-4'>
                  View CV
                </button>
                <button
                  type="button"
                  onClick={handleRemoveCv}
                  className='text-center text-white bg-red-500 px-4 py-3 rounded'>
                  Remove CV
                </button>
              </div>
            )}

            <div className='font-semibold text-xl mb-4' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button type="submit" className='text-center text-white bg-blue-500 px-4 py-3 rounded'>
                {submitting ? 'Uploading...' : 'Télécharger'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CvForme;
