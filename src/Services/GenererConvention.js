
import { jsPDF } from 'jspdf';

  const generatePDF = (titre,nom_entreprise,nom_eleve,sujet) => {
    const doc = new jsPDF();
    console.log('hi')

    // Create a container div to hold the HTML structure
    const content = document.createElement('div');
    content.style.fontFamily = 'Arial, sans-serif'; // Set font
    content.style.padding = '20px';
    //const image = new Image();
    //image.src = '/logo.png'; 
    console.log('hi2')
    content.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img src="/logo.png" style="width: 100px; height: 100px; margin-right: 20px;" alt="Logo" />
        <div>
          <h1>CONVENTION DE STAGE DE FIN de 1ère ANNEE</h1>
          <p><strong>Filière:</strong> GL</p>
          <p>Au cours de sa formation, l’Elève Ingénieur de l’ENSIAS est appelé à
          effectuer chaque année un stage d’été de durée 4 semaines au minimum pendant la
          période allant du 5 juin au 8 septembre 2024. Durant cette période le stagiaire
          pourrait être amené à se présenter aux examens de rattrapages du semestre 4.
          Ces examens pourraient prendre pour un stagiaire au maximum une semaine qui
          ne sera pas comptabilisée dans la durée de son stage. Ce stage est régi par une
          convention entre les parties concernées.</p>

          <p>La présente convention relative au stage de fin d’année est conclue entre :</p>
          <ul>
            <li>L’Ecole Nationale Supérieure d’Informatique et d’Analyse des Systèmes, représentée par son directeur par Mme. Ilham BERRADA</li>
            <li>L’organisme d’accueil IT UP2YOU SARL à 21, Place Abou Bakr Essedik, Appart N6, Agdal-Rabat représenté par M. YASSIR EL GHAZY</li>
            <li>Et l’élève ingénieur stagiaire Bouraoui Youssef inscrit (e) en 1ère année de l’ENSIAS, concernant son stage de fin d’année encadré par M. YASSIR EL GHAZY</li>
          </ul>

          <p><strong>Article 1</strong><br/> La période du stage : Du 01/7/2024 Au 31/7/2024</p>
          <p><strong>Article 2</strong><br/> L’élève ingénieur stagiaire Bouraoui Youssef s’engage à effectuer son stage de fin d’année tel qu’il est stipulé dans cette convention...</p>
          <p>... </p> <!-- Continue with the rest of your content here -->
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
      doc.addImage(img, 'PNG', 10, 10, 50, 50); // Adds the image to the PDF
      doc.html(content, {
        callback: function (doc) {
          doc.save('convention_de_stage.pdf');
          const pdfBlob = doc.output('blob');
          console.log('PDF generated');
          const pdfUrl = URL.createObjectURL(pdfBlob);
          window.open(pdfUrl, '_blank');  // Open the generated PDF in a new tab
        },
        x: 10,
        y: 70,  // Adjust y to avoid overlapping with the logo
      });
    })
    .catch((error) => {
      console.error('Image failed to load', error);
    });

  console.log('hi4');
};
  export default generatePDF;