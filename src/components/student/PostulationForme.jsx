import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Postuler from '../../Services/Postuler';



const PostulationForme = ({offerId}) => {

    const validationSchema = Yup.object({
        lettre_motivation: Yup.string()
          .max(1500, "La lettre de motivation ne doit pas dépasser 300 mots") 
          .test('word-count', 'La lettre de motivation ne doit pas dépasser 300 mots', (value) => {
            if (!value) return true;
            const wordCount = value.trim().split(/\s+/).length;
            return wordCount <= 300;
          })
          .required('La lettre de motivation est requise'),
      });

      
        const postuleroffre = async (values)=>{
          try{
            console.log('we are here in postulation forme id: ',offerId)
            console.log('offerId: ',offerId)
          const response = await Postuler(offerId,values.lettre_motivation);
          }catch(error){
            console.error('an error has occured: '+error);
            console.log('an error has occured: '+error);
          }
        }
      


  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Lettre de Motivation</h2>

      <Formik
        initialValues={{ lettre_motivation: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          postuleroffre(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="lettre_motivation" className="block text-sm font-medium text-gray-700">
                Lettre de Motivation
              </label>
              <Field
                as="textarea"
                id="lettre_motivation"
                name="lettre_motivation"
                className="w-full border-gray-300 rounded-md p-2 mt-1"
                rows="6"
              />
              <ErrorMessage name="lettre_motivation" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-700 text-white rounded-full py-2 px-6 font-semibold hover:bg-blue-800 transition duration-300"
                
              >
                Postuler
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostulationForme;
