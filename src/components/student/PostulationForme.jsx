import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';



const PostulationForme = () => {

    const validationSchema = Yup.object({
        motivationLetter: Yup.string()
          .max(1500, "La lettre de motivation ne doit pas dépasser 300 mots") 
          .test('word-count', 'La lettre de motivation ne doit pas dépasser 300 mots', (value) => {
            if (!value) return true;
            const wordCount = value.trim().split(/\s+/).length;
            return wordCount <= 300;
          })
          .required('La lettre de motivation est requise'),
      });


  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Lettre de Motivation</h2>

      <Formik
        initialValues={{ motivationLetter: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert('Form submitted: ' + JSON.stringify(values));
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="motivationLetter" className="block text-sm font-medium text-gray-700">
                Lettre de Motivation
              </label>
              <Field
                as="textarea"
                id="motivationLetter"
                name="motivationLetter"
                className="w-full border-gray-300 rounded-md p-2 mt-1"
                rows="6"
              />
              <ErrorMessage name="motivationLetter" component="div" className="text-red-500 text-sm mt-1" />
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
