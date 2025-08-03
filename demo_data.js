// Script pour ajouter des données de démonstration au localStorage
console.log("🚀 Ajout des données de démonstration pour la reprise de tests...");

// Données de tests actifs (status: "draft")
const sampleReports = [
    {
        "id": "test_draft_lv1_001",
        "ligne": "LV1",
        "produit": "Coca Simple",
        "taille": "33cl",
        "date": new Date().toISOString().split('T')[0],
        "createdAt": new Date(Date.now() - 2*60*60*1000).toISOString(), // Il y a 2 heures
        "controlRows": [
            {
                "id": "row_1",
                "heure": "10:30",
                "brix_sf": "10.5",
                "brix_boisson": "10.2",
                "date_p_sf": "2025-07-26",
                "numero_cuve": "C1",
                "boisson_acidite_abs": "3.2",
                "pression": "3.8",
                "temperature": "4.5",
                "vol_co2": "3.7",
                "lavage_goulot": "OK",
                "gout_odeur": "Conforme",
                "apparence": "Claire",
                "codage": "240127",
                "bouchage_test": "Étanche",
                "sertissage": ["OK", "OK", "OK", "", "", "", "", "", "", "", "", "", "", "", ""],
                "pression_bar": "3.8",
                "chlore_ppm": "0.1",
                "etiquetage": {
                    "emplacement": "Centré",
                    "couleur": "Rouge",
                    "texte": "Coca-Cola",
                    "libelle_secondaire": "33cl"
                },
                "initiales": "JS",
                "codes_hd_hf": {
                    "hd": "HD001",
                    "hf": "HF001", 
                    "cod_man": "CM1"
                },
                "remarques": "Premier contrôle effectué - test en cours de finalisation"
            }
        ],
        "status": "draft"
    },
    {
        "id": "test_draft_lv2_002",
        "ligne": "LV2",
        "produit": "Fanta Orange",
        "taille": "50cl",
        "date": new Date().toISOString().split('T')[0],
        "createdAt": new Date(Date.now() - 4*60*60*1000).toISOString(), // Il y a 4 heures
        "controlRows": [
            {
                "id": "row_2a",
                "heure": "08:15",
                "brix_sf": "12.0",
                "brix_boisson": "11.8",
                "date_p_sf": "2025-07-26",
                "numero_cuve": "C2",
                "boisson_acidite_abs": "2.8",
                "pression": "3.5",
                "temperature": "5.0",
                "vol_co2": "3.4",
                "lavage_goulot": "OK",
                "gout_odeur": "Conforme",
                "apparence": "Orange vif",
                "codage": "240127",
                "bouchage_test": "Étanche",
                "sertissage": ["OK", "OK", "OK", "", "", "", "", "", "", "", "", "", "", "", ""],
                "pression_bar": "3.5",
                "chlore_ppm": "0.08",
                "etiquetage": {
                    "emplacement": "Centré",
                    "couleur": "Orange",
                    "texte": "Fanta",
                    "libelle_secondaire": "50cl"
                },
                "initiales": "ML",
                "codes_hd_hf": {
                    "hd": "HD002",
                    "hf": "HF002",
                    "cod_man": "CM2"
                },
                "remarques": "Premier contrôle complet"
            },
            {
                "id": "row_2b",
                "heure": "09:45",
                "brix_sf": "12.1",
                "brix_boisson": "",
                "date_p_sf": "",
                "numero_cuve": "C2",
                "boisson_acidite_abs": "2.9",
                "pression": "3.6",
                "temperature": "4.8",
                "vol_co2": "3.5",
                "lavage_goulot": "",
                "gout_odeur": "",
                "apparence": "",
                "codage": "",
                "bouchage_test": "",
                "sertissage": Array(15).fill(""),
                "pression_bar": "",
                "chlore_ppm": "",
                "etiquetage": {
                    "emplacement": "",
                    "couleur": "",
                    "texte": "",
                    "libelle_secondaire": ""
                },
                "initiales": "ML",
                "codes_hd_hf": {
                    "hd": "",
                    "hf": "",
                    "cod_man": ""
                },
                "remarques": ""
            }
        ],
        "status": "draft"
    }
];

// Test definitions
const testDefinitions = [
    {
        "id": "product-control-report",
        "name": "Rapport de Contrôle Produit Fini",
        "route": "/reports",
        "assignedLines": ["LV1", "LV2", "PET"]
    }
];

// Sauvegarde dans localStorage
localStorage.setItem('cbgs_reports', JSON.stringify(sampleReports));
localStorage.setItem('cbgs_test_definitions', JSON.stringify(testDefinitions));

console.log("✅ Données de démonstration ajoutées :");
console.log("   - 2 tests actifs (draft status)");
console.log("   - LV1: Coca Simple 33cl (1 ligne de données)");
console.log("   - LV2: Fanta Orange 50cl (2 lignes de données, partiellement rempli)");
console.log("   - Test definitions configurées");
console.log("\n🔄 Rechargez la page pour voir les tests actifs !");