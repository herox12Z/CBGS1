const XLSX = require('xlsx');

// Fonction d'export Excel basée sur le modèle fourni (version test)
function testExportReportToStructuredExcel() {
  console.log('🧪 Test de la fonction d\'export Excel...');
  
  // Données de test simulant un rapport
  const testReport = {
    id: 'test_001',
    ligne: 'LV1',
    produit: 'Coca Simple',
    taille: '33cl',
    date: '2025-01-08',
    createdAt: new Date().toISOString(),
    status: 'completed',
    controlRows: [
      {
        id: '1',
        heure: '10:30',
        brix_sf: '10.5',
        brix_boisson: '10.2',
        date_p_sf: '2025-01-08',
        numero_cuve: 'C001',
        boisson_acidite_abs: '3.2',
        pression: '4.0',
        temperature: '4.2',
        vol_co2: '3.8',
        lavage_goulot: 'OK',
        gout_odeur: 'OK',
        apparence: 'OK',
        codage: 'OK',
        bouchage_test: 'OK',
        sertissage: ['T001', 'T002', 'T003', '', '', '', '', '', '', '', '', '', '', '', ''],
        pression_bar: '2.1',
        chlore_ppm: '1.5',
        etiquetage: 'OK',
        integrite_secondaire: 'OK',
        initiales: 'JD',
        codes_hd_hf: {
          hd: 'HD123',
          hf: 'HF456',
          cod_man: 'CM789'
        },
        remarques: 'Test OK'
      },
      {
        id: '2',
        heure: '11:00',
        brix_sf: '10.3',
        brix_boisson: '10.1',
        date_p_sf: '2025-01-08',
        numero_cuve: 'C002',
        boisson_acidite_abs: '3.1',
        pression: '4.1',
        temperature: '4.3',
        vol_co2: '3.9',
        lavage_goulot: 'OK',
        gout_odeur: 'OK',
        apparence: 'Non',
        codage: 'OK',
        bouchage_test: 'OK',
        sertissage: ['T004', 'T005', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        pression_bar: '2.0',
        chlore_ppm: '1.4',
        etiquetage: 'OK',
        integrite_secondaire: 'OK',
        initiales: 'MD',
        codes_hd_hf: {
          hd: 'HD124',
          hf: 'HF457',
          cod_man: 'CM790'
        },
        remarques: 'Contrôle standard'
      }
    ]
  };

  try {
    // Créer un nouveau workbook
    const workbook = XLSX.utils.book_new();
    
    // Créer les données selon la structure exacte du modèle
    const worksheetData = [];
    
    // Ligne 1: CQ.PROC./CPH-ERN°1 (colonne AE/31)
    const row1 = new Array(34).fill('');
    row1[30] = 'CQ.PROC./CPH-ERN°1';
    worksheetData.push(row1);
    
    // Ligne 2: RAPPORT DE CONTRÔLE PRODUIT FINI (colonne E/5) et Version D (colonne AG/33)
    const row2 = new Array(34).fill('');
    row2[4] = 'RAPPORT DE CONTRÔLE PRODUIT FINI';
    row2[32] = 'Version D';
    worksheetData.push(row2);
    
    // Ligne 3: vide
    worksheetData.push(new Array(34).fill(''));
    
    // Ligne 4: Informations générales
    const row4 = new Array(34).fill('');
    row4[0] = `Ligne : ${testReport.ligne}`;
    row4[11] = `Produit / Taille : ${testReport.produit} ${testReport.taille}`;
    row4[30] = `Date : ${testReport.date}`;
    worksheetData.push(row4);
    
    // Ligne 5: vide
    worksheetData.push(new Array(34).fill(''));
    
    // Ligne 6: En-têtes principaux
    const headerRow = new Array(34).fill('');
    headerRow[0] = 'HEURE';
    headerRow[1] = 'Brix SF\nBrix boisson\nDate P. SF\nN° de cuve';
    headerRow[2] = 'Boisson /\nAcidité / Abs';
    headerRow[3] = 'Pression';
    headerRow[4] = 'Température';
    headerRow[5] = 'Vol. CO2';
    headerRow[6] = 'Lav Goulot';
    headerRow[7] = 'Goût/Odeur';
    headerRow[8] = 'Apparence';
    headerRow[9] = 'Codage';
    headerRow[10] = 'Bouchage/ Test d\'inviolabilité';
    headerRow[28] = 'Etiquetage';
    headerRow[31] = 'Integrité secondaire: packs/palette/logo';
    headerRow[32] = 'Initiales';
    headerRow[33] = 'Remarques';
    worksheetData.push(headerRow);
    
    // Ligne 7: Sous-en-têtes pour sertissage
    const subHeaderRow1 = new Array(34).fill('');
    subHeaderRow1[11] = 'Coupe de torsion / Sertissage';
    subHeaderRow1[28] = 'Emplacement';
    subHeaderRow1[29] = 'Couleur';
    subHeaderRow1[30] = 'Texte';
    subHeaderRow1[33] = 'H.D :';
    worksheetData.push(subHeaderRow1);
    
    // Ligne 8: Sous-en-têtes pour pression/chlore
    const subHeaderRow2 = new Array(34).fill('');
    subHeaderRow2[11] = 'N° de tête';
    subHeaderRow2[26] = 'P     (Bar)';
    subHeaderRow2[27] = 'Cl (p.p.m)';
    worksheetData.push(subHeaderRow2);
    
    // Ligne 9: Numérotation sertissage
    const sertissageRow = new Array(34).fill('');
    for (let i = 0; i < 15; i++) {
      sertissageRow[11 + i] = (i + 1).toString();
    }
    sertissageRow[33] = 'H.F:';
    worksheetData.push(sertissageRow);
    
    // Lignes 10-11: vides
    worksheetData.push(new Array(34).fill(''));
    worksheetData.push(new Array(34).fill(''));
    
    // Ligne 12: Cod Man
    const codManRow = new Array(34).fill('');
    codManRow[33] = 'Cod Man:';
    worksheetData.push(codManRow);
    
    // Ligne 13: Cod Th
    const codThRow = new Array(34).fill('');
    codThRow[33] = 'Cod Th :';
    worksheetData.push(codThRow);
    
    // Ligne 14: vide
    worksheetData.push(new Array(34).fill(''));
    
    console.log('📊 Structure de base créée, ajout des données...');
    
    // À partir de la ligne 15: Données des tests
    testReport.controlRows.forEach((row, index) => {
      const dataRow = new Array(34).fill('');
      
      // Colonne A: Heure
      dataRow[0] = row.heure || '';
      
      // Colonne B: Données multi-champs
      const multiFieldData = [
        row.brix_sf || '',
        row.brix_boisson || '',
        row.date_p_sf || '',
        row.numero_cuve || ''
      ].filter(val => val !== '').join('\n');
      dataRow[1] = multiFieldData;
      
      // Colonnes C-F: Données principales
      dataRow[2] = row.boisson_acidite_abs || '';
      dataRow[3] = row.pression || '';
      dataRow[4] = row.temperature || '';
      dataRow[5] = row.vol_co2 || '';
      
      // Colonnes G-K: Contrôles qualité
      dataRow[6] = row.lavage_goulot || '';
      dataRow[7] = row.gout_odeur || '';
      dataRow[8] = row.apparence || '';
      dataRow[9] = row.codage || '';
      dataRow[10] = row.bouchage_test || '';
      
      // Colonnes L-Z: Sertissage (15 colonnes)
      for (let i = 0; i < 15; i++) {
        dataRow[11 + i] = row.sertissage[i] || '';
      }
      
      // Colonnes AA-AB: Pression Bar et Chlore
      dataRow[26] = row.pression_bar || '';
      dataRow[27] = row.chlore_ppm || '';
      
      // Colonne AC: Étiquetage
      dataRow[28] = row.etiquetage || '';
      
      // Colonne AF: Intégrité secondaire
      dataRow[31] = row.integrite_secondaire || '';
      
      // Colonne AG: Initiales
      dataRow[32] = row.initiales || '';
      
      // Colonne AH: Remarques multi-champs
      const remarquesData = [
        row.codes_hd_hf.hd || '',
        row.codes_hd_hf.hf || '',
        row.codes_hd_hf.cod_man || '',
        row.remarques || ''
      ].filter(val => val !== '').join('\n');
      dataRow[33] = remarquesData;
      
      worksheetData.push(dataRow);
      console.log(`✅ Ligne de données ${index + 1} ajoutée`);
    });
    
    // Créer le worksheet à partir des données
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Définir la plage du worksheet
    const range = XLSX.utils.encode_range({
      s: { c: 0, r: 0 },
      e: { c: 33, r: worksheetData.length - 1 }
    });
    worksheet['!ref'] = range;
    
    console.log(`📋 Worksheet créé avec ${worksheetData.length} lignes et 34 colonnes`);
    
    // Ajouter le worksheet au workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuil1');
    
    // Écrire le fichier de test
    XLSX.writeFile(workbook, '/app/test-export-excel.xlsx');
    
    console.log('✅ Fichier Excel de test créé: /app/test-export-excel.xlsx');
    
    // Vérifier le contenu du fichier généré
    const testWorkbook = XLSX.readFile('/app/test-export-excel.xlsx');
    const testSheet = testWorkbook.Sheets['Feuil1'];
    const testData = XLSX.utils.sheet_to_json(testSheet, { header: 1, defval: '' });
    
    console.log('🔍 Vérification du fichier généré:');
    console.log(`- Nombre de lignes: ${testData.length}`);
    console.log(`- Ligne 1, colonne 31 (CQ.PROC.): "${testData[0][30]}"`);
    console.log(`- Ligne 2, colonne 5 (Titre): "${testData[1][4]}"`);
    console.log(`- Ligne 4 (Info générale): "${testData[3][0]}" | "${testData[3][11]}" | "${testData[3][30]}"`);
    console.log(`- Ligne 6 (En-têtes): "${testData[5][0]}" | "${testData[5][1]}" | "${testData[5][2]}"`);
    console.log(`- Ligne 15 (Données 1): "${testData[14][0]}" | "${testData[14][1]}" | "${testData[14][2]}"`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
    return false;
  }
}

// Lancer le test
console.log('🚀 Démarrage du test d\'export Excel...');
const success = testExportReportToStructuredExcel();

if (success) {
  console.log('🎉 Test réussi ! La fonction d\'export Excel fonctionne correctement.');
} else {
  console.log('💥 Test échoué.');
}