import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CombinedForme = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    statut: '',
    cv: null,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().max(15, 'Must be 15 characters or less'),
    lastName: Yup.string().max(20, 'Must be 20 characters or less'),
    email: Yup.string().email('Invalid email address'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Must be exactly 10 digits'),
    address: Yup.string(),
    statut: Yup.string().required('Statut is required'),
    cv: Yup.mixed()
    .test(
      'fileSize',
      'File too large (Max: 5MB)',
      (value) => !value || (value && value.size <= 5242880)
    )
    .test(
      'fileType',
      'Unsupported file format',
      (value) => !value || (value && ['application/pdf'].includes(value.type))
    ),
  });

  const [changedFields, setChangedFields] = useState({});

  const handleFieldChange = (field, value) => {
    setChangedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (values) => {
    const updatedValues = Object.keys(changedFields).reduce((acc, key) => {
      acc[key] = values[key];
      return acc;
    }, {});

    console.log('Updated Fields:', updatedValues);
    alert('Updated fields sent to API: ' + JSON.stringify(updatedValues, null, 2));
  };

  return (
    <div style={{ width: '100%' }}>
      <h2 className="text-3xl" style={{ width: '100%' }}>Informations Personnelles</h2>
      <div style={{
        width: '100%',
        height: '2px',
        backgroundColor: '#000',
        marginBottom: '20px',
      }}></div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            {/* Profile Section */}
            <div className="firstname-and-lastname">
              <div className="firstName">
                <label htmlFor="firstName">First Name</label><br />
                <Field
                  name="firstName"
                  className="large-input"
                  type="text"
                  onChange={(e) => {
                    setFieldValue('firstName', e.target.value);
                    handleFieldChange('firstName', e.target.value);
                  }}
                />
              </div>
              <div className="lastName">
                <label htmlFor="lastName">Last Name</label><br />
                <Field
                  name="lastName"
                  className="large-input"
                  type="text"
                  onChange={(e) => {
                    setFieldValue('lastName', e.target.value);
                    handleFieldChange('lastName', e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="firstname-and-lastname">
              <div className="firstName">
                <label htmlFor="email">Email</label><br />
                <Field
                  name="email"
                  className="large-input"
                  type="email"
                  onChange={(e) => {
                    setFieldValue('email', e.target.value);
                    handleFieldChange('email', e.target.value);
                  }}
                />
              </div>
              <div className="lastName">
                <label htmlFor="phone">Phone</label><br />
                <Field
                  name="phone"
                  className="large-input"
                  type="text"
                  onChange={(e) => {
                    setFieldValue('phone', e.target.value);
                    handleFieldChange('phone', e.target.value);
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '60px' }}>
              <label htmlFor="address">Address</label><br />
              <Field
                name="address"
                className="large-input"
                type="text"
                onChange={(e) => {
                  setFieldValue('address', e.target.value);
                  handleFieldChange('address', e.target.value);
                }}
              />
            </div>

            
            {/* CV Section */}
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{ width: '100%' }} className='text-3xl'>Statut</h2>
              <div
               style={{
               width: '100%',
               height: '2px',
               backgroundColor: '#000',
               marginBottom: '20px',
               }}
               ></div>
              <label htmlFor="cv">CV</label><br />
              <input
                name="cv"
                className="large-input"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue('cv', file);
                  handleFieldChange('cv', file);
                }}
              />
              <ErrorMessage name="cv" component="div" style={{ color: 'red' }} />
            </div>

            {/* Statut Section */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ width: '100%' }} className='text-3xl'>CV</h2>
              <div
                style={{
                width: '100%',
                height: '2px',
                backgroundColor: '#000',
                marginBottom: '20px',
                }}
               ></div>
              <div style={{ marginTop: '10px' }}>
                <label style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Field
                    type="radio"
                    name="statut"
                    value="Recherche"
                    style={{ width: '20px', height: '20px' }}
                    onChange={(e) => {
                      setFieldValue('statut', e.target.value);
                      handleFieldChange('statut', e.target.value);
                    }}
                  />
                  En recherche de stage
                </label>
                <br />
                <label style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Field
                    type="radio"
                    name="statut"
                    value="Trouve"
                    style={{ width: '20px', height: '20px' }}
                    onChange={(e) => {
                      setFieldValue('statut', e.target.value);
                      handleFieldChange('statut', e.target.value);
                    }}
                  />
                  Stage trouvé
                </label>
              </div>
              <ErrorMessage name="statut" component="div" style={{ color: 'red' }} />
            </div>


            {/* Submit Button */}
            <div className="font-semibold text-xl mb-4" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button type="submit" className="text-center text-white bg-blue-500 px-4 py-3 rounded">Enregistrer</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CombinedForme;
