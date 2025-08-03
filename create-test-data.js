// Script pour créer des données de test pour l'historique des tests
const testData = {
  // Exemple de rapport de contrôle produit fini
  productControlReport: {
    id: "test_product_report_" + Date.now(),
    ligne: "LV1",
    produit: "Coca-Cola",
    taille: "33cl",
    date: "2025-01-27",
    createdAt: new Date().toISOString(),
    controlRows: [
      {
        id: "row1_" + Date.now(),
        heure: "08:00",
        brix_sf: "10.5",
        brix_boisson: "10.8",
        date_p_sf: "2025-01-27",
        numero_cuve: "C001",
        boisson_acidite_abs: "2.5",
        pression: "3.2",
        temperature: "4.0",
        vol_co2: "3.8",
        lavage_goulot: "OK",
        gout_odeur: "Conforme",
        apparence: "Bonne",
        codage: "2025127",
        bouchage_test: "OK",
        sertissage: Array(15).fill("OK"),
        pression_bar: "0.5",
        chlore_ppm: "0.2",
        etiquetage: {
          emplacement: "Correct",
          couleur: "Rouge",
          texte: "Lisible",
          libelle_secondaire: "OK"
        },
        initiales: "JD",
        codes_hd_hf: {
          hd: "H001",
          hf: "F002",
          cod_man: "M123"
        },
        remarques: "Tout conforme aux normes"
      }
    ],
    status: "completed"
  },
  
  // Exemple de rapport poids & apparence
  poidsApparenceReport: {
    id: "test_poids_report_" + Date.now(),
    ligne: "LV2",
    produit: "Sprite",
    taille: "50cl",
    date: "2025-01-27",
    heure: "09:30",
    moldData: [
      {
        moldNumber: 1,
        base: "45.2",
        corps: "12.8",
        etiquette: "3.2",
        epaule: "8.5",
        weight: "Conforme"
      },
      {
        moldNumber: 2,
        base: "45.0",
        corps: "12.9",
        etiquette: "3.1",
        epaule: "8.6",
        weight: "Conforme"
      }
    ],
    createdAt: new Date().toISOString(),
    status: "completed"
  }
};

// Instructions pour ajouter les données
console.log("=== Données de Test pour CBGS ===");
console.log("Copiez ces données dans localStorage de votre navigateur:");
console.log("");
console.log("// Pour les rapports de contrôle produit fini:");
console.log("localStorage.setItem('cbgs_reports', JSON.stringify([" + JSON.stringify(testData.productControlReport) + "]));");
console.log("");
console.log("// Pour les rapports poids & apparence:");
console.log("localStorage.setItem('cbgs_poids_apparence_reports', JSON.stringify([" + JSON.stringify(testData.poidsApparenceReport) + "]));");
console.log("");
console.log("Ensuite, actualisez la page /history pour voir les données de test avec les boutons PDF");