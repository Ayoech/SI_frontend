import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import CreerEtudiant from "../../Services/CreerEtudiant";

const FormeEtudiant = ({ toggleFormeEtudiant }) => {
  const validationSchema = Yup.object({
    cne: Yup.string().required("CNE is required"),
    nom: Yup.string().required("Nom is required"),
    prenom: Yup.string().required("Prenom is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    num_dans_promo: Yup.number().required("Numéro Dans la promo is required"),
    addresse: Yup.string().required("Adresse is required"),
    qualite: Yup.string().required("Qualité is required"),
    code_postal: Yup.string()
      .matches(/^\d{5}$/, "Code postal must be 5 digits")
      .required("Code postal is required"),
    ville: Yup.string().required("Ville is required"),
    sexe: Yup.string().required("Sexe is required"),
    date_naissance: Yup.date().required("Date de naissance is required"),
    telephone: Yup.string()
      .matches(/^\d{10}$/, "Telephone must be 10 digits")
      .required("Telephone is required"),
    filiere: Yup.string().required("Filière is required"),
    annee_promo: Yup.number().required("Année de promotion is required"),
  });

  const [message,setMessage] =useState(null);

  const initialValues = {
    cne: "",
    nom: "",
    prenom: "",
    email:"",
    num_dans_promo: 0,
    qualite:"",
    addresse: "",
    code_postal:"",
    ville: "",
    sexe: "",
    date_naissance:"",
    telephone:"",
    filiere:"",
    annee_promo:0,
  };


  const handleSubmit = async(values)=>{
    try{
      console.log('hh')
      const response = await CreerEtudiant(values);
      setMessage(response.data.message);
    }catch(error){
      console.error(error);
      setMessage(error.message);
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="bg-white p-6  w-full max-w-lg max-h-screen overflow-auto">
        <button
          onClick={toggleFormeEtudiant}
          className="mb-4 p-2 bg-red-500 text-white rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4 ">
            {/* CNE Field */}
            <div >
              <label htmlFor="cne" className="block text-sm font-medium text-gray-700">
                CNE
              </label>
              <Field
                name="cne"
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Enter CNE"
              />
              <ErrorMessage
                name="cne"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Nom Field */}
            <div className="flex">
             <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <Field
                name="nom"
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Nom"
              />
              <ErrorMessage
                name="nom"
                component="div"
                className="text-red-500 text-sm"
              />
              </div>
              {/* Prenom Field */}
            <div className="ml-4">
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                Prenom
              </label>
              <Field
                name="prenom"
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Prénom"
              />
              <ErrorMessage
                name="prenom"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            </div>
            {/* email Field */}
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
            <div>
              <label htmlFor="num_dans_promo" className="block text-sm font-medium text-gray-700">
                Numéro Dans la promo
              </label>
              <Field
                name="num_dans_promo"
                type="number"
                className="w-full border rounded-md p-2"
                placeholder="Numéro Dans la promo"
              />
              <ErrorMessage
                name="num_dans_promo"
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
            {/* qualite Field */}
            <div>
              <label htmlFor="qualite" className="block text-sm font-medium text-gray-700">
                Sexe
              </label>
              <Field
                as="select"
                name="qualite"
                className="w-full border rounded-md p-2"
              >
                <option value="">Qualité</option>
                <option value="M">M</option>
                <option value="Mme">Mme</option>
                <option value="Mle">Mle</option>
              </Field>
              <ErrorMessage
                name="qualite"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Code Postal Field */}
            <div>
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

            {/* Sexe Field */}
            <div>
              <label htmlFor="sexe" className="block text-sm font-medium text-gray-700">
                Sexe
              </label>
              <Field
                as="select"
                name="sexe"
                className="w-full border rounded-md p-2"
              >
                <option value="">Select Sexe</option>
                <option value="M">M</option>
                <option value="F">F</option>
              </Field>
              <ErrorMessage
                name="Sexe"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Date de Naissance Field */}
            <div>
              <label
                htmlFor="date_naissance"
                className="block text-sm font-medium text-gray-700"
              >
                Date de Naissance
              </label>
              <Field
                name="date_naissance"
                type="date"
                className="w-full border rounded-md p-2"
              />
              <ErrorMessage
                name="date_naissance"
                component="div"
                className="text-red-500 text-sm"
              />
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
                placeholder="Enter telephone"
              />
              <ErrorMessage
                name="telephone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* filière Field */}
            <div>
              <label htmlFor="filiere" className="block text-sm font-medium text-gray-700">
                Filière
              </label>
              <Field
                as="select"
                name="filiere"
                className="w-full border rounded-md p-2"
              >
                <option value="">Filière</option>
                <option value="BI">BI</option>
                <option value="GL">GL</option>
                <option value="GD">GD</option>
                <option value="IDF">IDF</option>
                <option value="IDSIT">IDSIT</option>
                <option value="2IA">AI</option>
                <option value="SSI">SSI</option>
                <option value="2SCL">2SCL</option>
                <option value="SSE">SSE</option>
              </Field>
              <ErrorMessage
                name="filiere"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Anne_ppromo Field */}
            <div>
              <label htmlFor="annee_promo" className="block text-sm font-medium text-gray-700">
                Année de promotion
              </label>
              <Field
                name="annee_promo"
                type="number"
                className="w-full border rounded-md p-2"
                placeholder="Année de promotion"
              />
              <ErrorMessage
                name="annee_promo"
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

export default FormeEtudiant;
