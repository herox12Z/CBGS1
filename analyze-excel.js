// Script pour analyser le fichier Excel et extraire les données de carbonatation
const XLSX = require('xlsx');
const fs = require('fs');

try {
    // Lire le fichier Excel
    const workbook = XLSX.readFile('/app/tableau-co2.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    console.log('=== ANALYSE DU FICHIER EXCEL ===');
    console.log('Nom de la feuille:', sheetName);
    
    // Convertir en JSON pour analyser la structure
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    console.log('\n=== STRUCTURE DES DONNÉES ===');
    console.log('Nombre de lignes:', jsonData.length);
    console.log('Nombre de colonnes dans la première ligne:', jsonData[0]?.length);
    
    // Afficher les premières lignes pour comprendre la structure
    console.log('\n=== PREMIÈRES LIGNES ===');
    for (let i = 0; i < Math.min(5, jsonData.length); i++) {
        console.log(`Ligne ${i}:`, jsonData[i]);
    }
    
    // Extraire et analyser la première ligne (pressions)
    const firstRow = jsonData[0];
    console.log('\n=== PREMIÈRE LIGNE (PRESSIONS) ===');
    console.log('Contenu complet:', firstRow);
    
    // Filtrer les valeurs numériques de pression (ignorer la première cellule vide)
    const pressures = firstRow.slice(1).filter(val => 
        val !== null && val !== undefined && val !== '' && !isNaN(parseFloat(val))
    ).map(val => parseFloat(val));
    
    console.log('Valeurs de pression extraites:', pressures);
    
    // Extraire et analyser la première colonne (températures)
    const temperatures = [];
    for (let i = 1; i < jsonData.length; i++) {
        const temp = jsonData[i][0];
        if (temp !== null && temp !== undefined && temp !== '' && !isNaN(parseFloat(temp))) {
            temperatures.push(parseFloat(temp));
        }
    }
    
    console.log('\n=== PREMIÈRE COLONNE (TEMPÉRATURES) ===');
    console.log('Valeurs de température extraites:', temperatures);
    
    // Créer la matrice de données CO2
    const co2Matrix = {};
    
    for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        const temperature = row[0];
        
        if (temperature !== null && temperature !== undefined && temperature !== '' && !isNaN(parseFloat(temperature))) {
            const tempKey = parseFloat(temperature).toString();
            co2Matrix[tempKey] = {};
            
            for (let j = 1; j < row.length && j <= pressures.length; j++) {
                const pressure = pressures[j-1];
                const co2Value = row[j];
                
                if (co2Value !== null && co2Value !== undefined && co2Value !== '' && !isNaN(parseFloat(co2Value))) {
                    co2Matrix[tempKey][pressure.toString()] = parseFloat(co2Value);
                }
            }
        }
    }
    
    console.log('\n=== MATRICE VOL.CO2 ===');
    console.log('Exemple de structure:');
    
    // Afficher quelques exemples
    const tempKeys = Object.keys(co2Matrix).slice(0, 3);
    tempKeys.forEach(temp => {
        console.log(`Température ${temp}°C:`, co2Matrix[temp]);
    });
    
    // Sauvegarder la matrice dans un fichier JSON
    const outputData = {
        pressures: pressures.sort((a, b) => a - b),
        temperatures: temperatures.sort((a, b) => a - b),
        co2Matrix: co2Matrix,
        metadata: {
            extractedAt: new Date().toISOString(),
            totalPressures: pressures.length,
            totalTemperatures: temperatures.length,
            sourceFile: 'tableau-co2.xlsx'
        }
    };
    
    fs.writeFileSync('/app/co2-data-extracted.json', JSON.stringify(outputData, null, 2));
    console.log('\n=== DONNÉES SAUVEGARDÉES ===');
    console.log('Fichier créé: /app/co2-data-extracted.json');
    console.log('Pressions disponibles:', pressures.length);
    console.log('Températures disponibles:', temperatures.length);
    console.log('Plage de pression:', Math.min(...pressures), '-', Math.max(...pressures), 'psi');
    console.log('Plage de température:', Math.min(...temperatures), '-', Math.max(...temperatures), '°C');
    
} catch (error) {
    console.error('Erreur lors de l\'analyse:', error.message);
    console.error(error.stack);
}