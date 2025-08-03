// Sample data generator for testing the History functionality
// This script creates sample test reports and stores them in localStorage

// Sample Product Control Reports
const sampleProductReports = [
  {
    id: "report_1737739200000",
    ligne: "LV1",
    produit: "Coca Simple",
    taille: "33cl",
    date: "2025-01-22",
    createdAt: "2025-01-22T10:30:00.000Z",
    controlRows: [
      {
        id: "row_001",
        heure: "10:30",
        brix_sf: "12.5",
        brix_boisson: "10.8",
        date_p_sf: "2025-01-22",
        numero_cuve: "C001",
        boisson_acidite_abs: "3.2",
        pression: "4.1",
        temperature: "4",
        vol_co2: "3.8",
        lavage_goulot: "OK",
        gout_odeur: "Conforme",
        apparence: "Claire",
        codage: "OK",
        bouchage_test: "OK",
        sertissage: Array(15).fill("OK"),
        pression_bar: "4.1",
        chlore_ppm: "0.2",
        etiquetage: {
          emplacement: "Centré",
          couleur: "Rouge",
          texte: "Lisible",
          libelle_secondaire: "OK"
        },
        initiales: "JD",
        codes_hd_hf: {
          hd: "H123",
          hf: "F456",
          cod_man: "M789"
        },
        remarques: "Test normal"
      }
    ],
    status: "completed"
  },
  {
    id: "report_1737652800000",
    ligne: "LV2",
    produit: "Fanta Citron",
    taille: "50cl",
    date: "2025-01-21",
    createdAt: "2025-01-21T14:15:00.000Z",
    controlRows: [
      {
        id: "row_002",
        heure: "14:15",
        brix_sf: "11.8",
        brix_boisson: "9.5",
        date_p_sf: "2025-01-21",
        numero_cuve: "C002",
        boisson_acidite_abs: "2.8",
        pression: "3.9",
        temperature: "5",
        vol_co2: "3.6",
        lavage_goulot: "OK",
        gout_odeur: "Conforme",
        apparence: "Claire",
        codage: "OK",
        bouchage_test: "OK",
        sertissage: Array(15).fill("OK"),
        pression_bar: "3.9",
        chlore_ppm: "0.1",
        etiquetage: {
          emplacement: "Centré",
          couleur: "Orange",
          texte: "Lisible",
          libelle_secondaire: "OK"
        },
        initiales: "MS",
        codes_hd_hf: {
          hd: "H124",
          hf: "F457",
          cod_man: "M790"
        },
        remarques: "RAS"
      }
    ],
    status: "completed"
  },
  {
    id: "report_1737566400000",
    ligne: "PET",
    produit: "Sprite",
    taille: "1L",
    date: "2025-01-20",
    createdAt: "2025-01-20T09:45:00.000Z",
    controlRows: [
      {
        id: "row_003",
        heure: "09:45",
        brix_sf: "10.2",
        brix_boisson: "8.8",
        date_p_sf: "2025-01-20",
        numero_cuve: "C003",
        boisson_acidite_abs: "2.5",
        pression: "4.2",
        temperature: "3",
        vol_co2: "4.0",
        lavage_goulot: "OK",
        gout_odeur: "Conforme",
        apparence: "Claire",
        codage: "OK",
        bouchage_test: "OK",
        sertissage: Array(15).fill("OK"),
        pression_bar: "4.2",
        chlore_ppm: "0.15",
        etiquetage: {
          emplacement: "Centré",
          couleur: "Vert",
          texte: "Lisible",
          libelle_secondaire: "OK"
        },
        initiales: "AL",
        codes_hd_hf: {
          hd: "H125",
          hf: "F458",
          cod_man: "M791"
        },
        remarques: "Test de routine"
      }
    ],
    status: "draft"
  }
];

// Sample Poids & Apparence Reports
const samplePoidsApparenceReports = [
  {
    id: "poids_apparence_report_1737739500000",
    ligne: "LV1",
    produit: "Coca Simple",
    taille: "33cl",
    date: "2025-01-22",
    heure: "11:00",
    moldData: Array.from({ length: 14 }, (_, i) => ({
      moldNumber: i + 1,
      base: (15.2 + Math.random() * 0.5).toFixed(2),
      corps: (22.8 + Math.random() * 0.3).toFixed(2),
      etiquette: (2.1 + Math.random() * 0.1).toFixed(2),
      epaule: (8.5 + Math.random() * 0.2).toFixed(2),
      weight: Math.random() > 0.5 ? "Conforme" : "OK"
    })),
    createdAt: "2025-01-22T11:00:00.000Z",
    status: "completed"
  },
  {
    id: "poids_apparence_report_1737653100000",
    ligne: "LV2",
    produit: "Fanta Citron",
    taille: "50cl",
    date: "2025-01-21",
    heure: "15:30",
    moldData: Array.from({ length: 14 }, (_, i) => ({
      moldNumber: i + 1,
      base: (18.5 + Math.random() * 0.4).toFixed(2),
      corps: (28.2 + Math.random() * 0.6).toFixed(2),
      etiquette: (2.8 + Math.random() * 0.15).toFixed(2),
      epaule: (12.1 + Math.random() * 0.3).toFixed(2),
      weight: "Conforme"
    })),
    createdAt: "2025-01-21T15:30:00.000Z",
    status: "completed"
  }
];

// Function to populate localStorage with sample data
function populateSampleData() {
  // Store product reports
  localStorage.setItem("cbgs_reports", JSON.stringify(sampleProductReports));
  
  // Store poids & apparence reports
  localStorage.setItem("cbgs_poids_apparence_reports", JSON.stringify(samplePoidsApparenceReports));
  
  console.log("Sample data populated successfully!");
  console.log("Product reports:", sampleProductReports.length);
  console.log("Poids & Apparence reports:", samplePoidsApparenceReports.length);
}

// Clear existing data (if any) and populate sample data
populateSampleData();