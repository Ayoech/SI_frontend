
import { jsPDF } from 'jspdf';

  const generatePDF = (titre,nom_etudiant,nom_entreprise, prenom_etudiant,date_debut,date_fin,filiere,addresse) => {
    const doc = new jsPDF();
    console.log('hi')

    const content = document.createElement('div');
    content.style.fontFamily = 'Arial, sans-serif'; 
    content.style.padding = '20px';
    console.log('hi2')
    content.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img src="/logo.png" style="width: 100px; height: 100px; margin-right: 20px;" alt="Logo" />
        <div>
          <h1>CONVENTION DE STAGE DE FIN de 1ère ANNEE</h1>
          <p><strong>Filière:${filiere}</strong> GL</p>

          <p>La présente convention relative au stage de fin d’année est conclue entre :</p>
          <ul>
            <li>L’Ecole Nationale Supérieure d’Informatique et d’Analyse des Systèmes, représentée par son directeur par Mme. Ilham BERRADA</li>
            <li>L’organisme d’accueil ${nom_entreprise} à ${addresse}</li>
            <li>Et l’élève ingénieur stagiaire ${nom_etudiant} ${prenom_etudiant} inscrit (e) à l’ENSIAS, concernant son stage.</li>
          </ul>

          <p><strong>Article 1</strong><br/> La période du stage : Du ${date_debut} Au ${date_fin}</p>
          <p><strong>Article 2</strong><br/> L’élève ingénieur stagiaire ${nom_etudiant} ${prenom_etudiant} s’engage à effectuer son stage de fin d’année tel qu’il est stipulé dans cette convention  et ne peut prétendre à un 
changement de son affectation initiale durant cette période qu’après 
autorisation écrite de l’ENSIAS 
L’organisme d’accueil est tenu d’avertir la direction de L’ENSIAS dans un délai 
d’une semaine si l’élève ingénieur stagiaire ne se présente pas à son lieu 
d’affectation dans les délais prévus. </p>
          <p><strong>Article 1</strong><br/>L’organisation du stage de fin d’année ainsi que les travaux et sujets d’étude 
confiés à l’élève ingénieur stagiaire sont proposés par L’organisme d’accueil et 
doivent se dérouler conformément à la fiche de description de stage. 
Le sujet du stage s’intitule : ${titre}  </p> 
        </div>
      </div>
    `;

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
      });
    };
  

    loadImage('/logo.png')
    .then((img) => {
      console.log('Image loaded');
      doc.addImage(img, 'PNG', 10, 10, 50, 50); 
      doc.html(content, {
        callback: function (doc) {
          doc.save('convention_de_stage.pdf');
          const pdfBlob = doc.output('blob');
          console.log('PDF generated');
          const pdfUrl = URL.createObjectURL(pdfBlob);
          window.open(pdfUrl, '_blank');  
        },
        x: 10,
        y: 70, 
      });
    })
    .catch((error) => {
      console.error('Image failed to load', error);
    });

  console.log('hi4');
};
  export default generatePDF;