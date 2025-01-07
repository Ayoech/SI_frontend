import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateProfileByEtudiant } from '../../Services/updateProfileByEtudiant';
import { useState } from 'react';

const ProfileForme = ({profileData}) => {

  const initialValues = {
    prenom: profileData?.prenom || '',
    nom: profileData?.nom || '',
    email: profileData?.email || '',
    telephone: profileData?.telephone || '',
    addresse: profileData?.addresse || '',
    statut: profileData?.statut || '',
  };

  useEffect(()=>{
    console.log('profile data from profile forme: ',profileData.statut)
  },[])
  

  const [isSubmitting,setIsSubmitting] = useState(false)

  const validationSchema = Yup.object({
    nom: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    prenom: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    telephone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
      .required('Required'),
    addresse: Yup.string().required('Required'),
  });

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const response = await updateProfileByEtudiant(values);
      console.log('Profile updated successfully:', response);
    } catch (error) {
      console.error('An error occurred while updating the profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{width:'100%'}}>
        <h2 className='text-3xl' style={{width:'100%'}}>Informations Personnelles</h2>
        <div
        style={{
          width: '100%',
          height: '2px',
          backgroundColor: '#000',
          marginBottom: '20px',
        }}
      ></div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className='firstname-and-lastname'>
            <div className='firstName'>
              <label htmlFor="firstName">Prénom</label><br></br>
              <Field name="prenom" className="large-input" type="text" />
            </div>
            <div className='lastName'>
            <label htmlFor="lastName">Nom</label><br></br>
            <Field name="nom" className="large-input" type="text" />
           
          </div>
           
          </div>
          <div className='firstname-and-lastname'>
          <div  className='firstName'>
            <label htmlFor="email">Email</label><br></br>
            <Field name="email" className="large-input" type="email" />
            
          </div>
          <div  className='lastName'>
            <label htmlFor="telephone">Telephone</label><br></br>
            <Field name="telephone" className="large-input" type="text" />
            
          </div>
          </div>
          <div style={{marginBottom:'60px'}}>
            <label htmlFor="addresse">Adresse</label><br></br>
            <Field name="addresse" className="large-input" type="text" />
            
          </div>
          <div style={{ marginBottom: '40px' }}>
              <h2 style={{ width: '100%' }} className='text-3xl mb-4'>Statut : </h2>
              <div style={{ marginTop: '10px' }} className='ml-8'>
                  
                <label style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Field type="radio" name="statut" value="Recherche"  style={{ width: '20px', height: '20px' }} />
                  En recherche de stage
                </label>
                <br />
                <label style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Field type="radio" name="statut" value="Trouve"  style={{ width: '20px', height: '20px' }} />
                  Stage trouvé
                </label>
              </div>
              <ErrorMessage name="statut" component="div" style={{ color: 'red' }} />
            </div>
          <div className='font-semibold text-xl mb-4' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button type="submit" className='text-center text-white bg-blue-500 px-4 py-3 rounded'>{isSubmitting ? 'Enregistrement...' : 'Enregistrer'}</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default ProfileForme;