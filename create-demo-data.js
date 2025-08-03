// Script pour créer des données de démonstration pour la reprise de tests
console.log("🧪 Création des données de démonstration pour la fonctionnalité de reprise de tests...");

// Créer des tests en brouillon (draft) dans localStorage
const demoTests = [
  {
    id: "test_draft_lv1_001",
    ligne: "LV1",
    produit: "Coca Simple",
    taille: "33cl",
    date: new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
    testName: "Rapport de Contrôle Produit Fini",
    testType: "product-control",
    heure: "10:30",
    status: "draft",
    controlRows: [
      {
        id: "row_1",
        heure: "10:30",
        brix_sf: "11.2",
        brix_boisson: "10.8",
        date_p_sf: "2025-07-27",
        numero_cuve: "CV-101",
        boisson_acidite_abs: "3.45",
        pression: "3.2",
        temperature: "4.5",
        vol_co2: "3.85",
        lavage_goulot: "Conforme",
        gout_odeur: "Normal",
        apparence: "Claire",
        codage: "OK",
        bouchage_test: "Correct",
        sertissage: ["2.1", "2.0", "2.1", "2.0", "2.1", "1.9", "2.0", "2.1", "2.0", "1.9", "2.1", "2.0", "1.9", "2.1", "2.0"],
        pression_bar: "3.2",
        chlore_ppm: "0.2",
        etiquetage: {
          emplacement: "Centré",
          couleur: "Rouge",
          texte: "Lisible",
          libelle_secondaire: "Correct"
        },
        initiales: "JD",
        codes_hd_hf: {
          hd: "15:30",
          hf: "16:45",
          cod_man: "M123"
        },
        remarques: "Premier contrôle de la journée - conforme aux attentes"
      }
    ],
    originalData: {}
  },
  {
    id: "test_draft_lv2_002",
    ligne: "LV2",
    produit: "Fanta Orange",
    taille: "50cl",
    date: new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
    testName: "Rapport de Contrôle Produit Fini",
    testType: "product-control", 
    heure: "14:15",
    status: "draft",
    controlRows: [
      {
        id: "row_2",
        heure: "14:15",
        brix_sf: "12.5",
        brix_boisson: "12.1",
        date_p_sf: "2025-07-27",
        numero_cuve: "CV-205",
        boisson_acidite_abs: "2.85",
        pression: "2.8",
        temperature: "3.8",
        vol_co2: "3.42",
        lavage_goulot: "Conforme",
        gout_odeur: "Fruité",
        apparence: "Orange clair",
        codage: "OK",
        bouchage_test: "Correct",
        sertissage: ["1.8", "1.9", "1.8", "1.9", "1.8", "1.7", "1.9", "1.8", "1.9", "1.7", "1.8", "1.9", "1.7", "1.8", "1.9"],
        pression_bar: "2.8",
        chlore_ppm: "0.15",
        etiquetage: {
          emplacement: "Centré",
          couleur: "Orange",
          texte: "Net",
          libelle_secondaire: "Visible"
        },
        initiales: "ML",
        codes_hd_hf: {
          hd: "13:20",
          hf: "14:30",
          cod_man: "M456"
        },
        remarques: "Production en cours - échantillon intermédiaire"
      }
    ],
    originalData: {}
  }
];

// Fonction pour simuler le stockage des données
function createDemoData() {
  // Charger les données existantes
  const existingTests = JSON.parse(localStorage.getItem('cbgs_test_history') || '[]');
  
  // Ajouter nos tests de démonstration s'ils n'existent pas déjà
  demoTests.forEach(testData => {
    const exists = existingTests.some(existing => existing.id === testData.id);
    if (!exists) {
      existingTests.push(testData);
      console.log(`✅ Test de démonstration ajouté: ${testData.id} - ${testData.ligne} - ${testData.produit}`);
    } else {
      console.log(`ℹ️ Test de démonstration existe déjà: ${testData.id}`);
    }
  });
  
  // Sauvegarder dans localStorage
  localStorage.setItem('cbgs_test_history', JSON.stringify(existingTests));
  
  console.log("🎉 Données de démonstration créées avec succès !");
  console.log(`📊 Total des tests en base: ${existingTests.length}`);
  console.log(`🚧 Tests en brouillon: ${existingTests.filter(t => t.status === 'draft').length}`);
  
  return existingTests;
}

// Exécuter la création des données
if (typeof localStorage !== 'undefined') {
  createDemoData();
} else {
  console.log("localStorage non disponible dans cet environnement");
}