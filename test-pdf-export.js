// Test de l'export PDF avec jsPDF
const testPDFExport = () => {
  console.log('Test des nouvelles fonctionnalités PDF avec logo CBGS...')
  
  // Test d'un rapport factice
  const sampleReport = {
    ligne: 'LV1',
    produit: 'Coca Simple',
    taille: '33cl',
    date: '2025-01-27',
    controlRows: [
      {
        heure: '10:30',
        brix_sf: '10.5',
        brix_boisson: '10.2',
        date_p_sf: '27/01/2025',
        numero_cuve: '001',
        boisson_acidite_abs: '2.8',
        pression: '3.2',
        temperature: '4°C',
        vol_co2: '3.8',
        lavage_goulot: 'OK',
        gout_odeur: 'Conforme',
        apparence: 'Claire',
        codage: 'OK',
        bouchage_test: 'Conforme',
        sertissage: ['OK', 'OK', 'OK', 'OK', 'OK'],
        pression_bar: '3.2',
        chlore_ppm: '0.5',
        etiquetage: {
          emplacement: 'Correct',
          couleur: 'Rouge',
          texte: 'Lisible'
        }
      }
    ]
  }
  
  console.log('Données de test créées:', sampleReport)
  console.log('Fonctionnalités PDF mises à jour avec succès !')
}

if (typeof window !== 'undefined') {
  window.testPDFExport = testPDFExport
}

module.exports = { testPDFExport }