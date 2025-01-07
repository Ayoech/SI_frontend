import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import CreerEtudiant from "../../Services/CreerEtudiant";
import creerEntreprise from "../../Services/CreerEntreprise";

const FormeEntreprise = ({ toggleFormeEntreprise }) => {
  const validationSchema = Yup.object({
    num_siret: Yup.string().required("Num_siret est obligatoire"),
    forme_juridique: Yup.string().required("Forme juridique est obligatoire"),
    raison_sociale: Yup.string().required("Raison sociale est obligatoire"),
    addresse: Yup.string().required("Adresse est obligatoire"),
    email: Yup.string().email("Format invalide de l'email").required("Adresse mail est obligatoire"),
    code_postal: Yup.string().optional(), // Changed to string to handle alphanumeric codes
    ville: Yup.string().required("Ville est obligatoire"),
    telephone: Yup.string()
      .matches(/^\d{10}$/, "Telephone composé de 10 chiffres")
      .required("Telephone est obligatoire"),
    fax: Yup.string()
      .matches(/^\d{10}$/, "FAX composé de 10 chiffres")
      .required("FAX est obligatoire"),
    nom_entreprise: Yup.string().required("Nom de l'entreprise est obligatoire"),
  });

  const [message, setMessage] = useState(null);

  const initialValues = {
    email: '',
    num_siret: '',
    nom_entreprise: '',
    forme_juridique: '',
    raison_sociale: '',
    addresse: '',
    code_postal: '',
    ville: '',
    telephone: '',
    fax: '',
  };

  const handleSubmit = async (values) => {
    try {
      console.log('Form submitted with values:', values);
      const response = await creerEntreprise(values);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen w-full">
      <div className="bg-white p-6 w-full max-w-lg max-h-screen overflow-auto">
        <button
          onClick={toggleFormeEntreprise}
          className="mb-4 p-2 bg-red-500 text-white rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            {/* Num Siret Field */}
            <div className="flex">
            <div className="mr-2">
              <label htmlFor="num_siret" className="block text-sm font-medium text-gray-700">
                Num Siret
              </label>
              <Field
                name="num_siret"
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Num Siret"
              />
              <ErrorMessage
                name="num_siret"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Nom Entreprise Field */}
            <div>
              <label htmlFor="nom_entreprise" className="block text-sm font-medium text-gray-700">
                Nom de l'Entreprise
              </label>
              <Field
                name="nom_entreprise"
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Nom de l'entreprise"
              />
              <ErrorMessage
                name="nom_entreprise"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            </div>

            
            <div className="flex">
            {/* Forme Juridique Field */}
            <div className="mr-2">
              <label htmlFor="forme_juridique" className="block text-sm font-medium text-gray-700">
                Forme Juridique
              </label>
              <Field
                name="forme_juridique"
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Forme Juridique"
              />
              <ErrorMessage
                name="forme_juridique"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Raison Sociale Field */}
            <div>
              <label htmlFor="raison_sociale" className="block text-sm font-medium text-gray-700">
                Raison Sociale
              </label>
              <Field
                name="raison_sociale"
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Raison Sociale"
              />
              <ErrorMessage
                name="raison_sociale"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-full border rounded-md p-2"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Adresse Field */}
            <div>
              <label htmlFor="addresse" className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <Field
                name="addresse"
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Adresse"
              />
              <ErrorMessage
                name="addresse"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex">
            {/* Code Postal Field */}
            <div className="mr-2">
              <label htmlFor="code_postal" className="block text-sm font-medium text-gray-700">
                Code Postal
              </label>
              <Field
                name="code_postal"
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Code Postal"
              />
              <ErrorMessage
                name="code_postal"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Ville Field */}
            <div>
              <label htmlFor="ville" className="block text-sm font-medium text-gray-700">
                Ville
              </label>
              <Field
                name="ville"
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Ville"
              />
              <ErrorMessage
                name="ville"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            </div>

            {/* Telephone Field */}
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                Telephone
              </label>
              <Field
                name="telephone"
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Telephone"
              />
              <ErrorMessage
                name="telephone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Fax Field */}
            <div>
              <label htmlFor="fax" className="block text-sm font-medium text-gray-700">
                Fax
              </label>
              <Field
                name="fax"
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Fax"
              />
              <ErrorMessage
                name="fax"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default FormeEntreprise;
