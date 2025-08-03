// Script pour générer le fichier de carbonatation complet depuis les données Excel
const fs = require('fs');

// Charger les données extraites
const data = JSON.parse(fs.readFileSync('/app/co2-data-extracted.json', 'utf8'));

// Créer le fichier TypeScript complet
let tsContent = `// Matrice de correspondance pour le Volume de CO2 (Vol. CO2) - Données réelles du fichier Excel
// Les clés de température sont en Celsius (°C) et les clés de pression sont en PSI (livres par pouce carré).
// Les valeurs sont le Volume de CO2 correspondant.
// Source: Classeur33.xlsx - Tableau de carbonatation officiel CBGS
export const CARBONATION_CHART: { [temp: string]: { [pressure: string]: number } } = {
`;

// Générer toutes les entrées de température
const temps = Object.keys(data.co2Matrix).map(Number).sort((a, b) => a - b);
temps.forEach((temp, tempIndex) => {
    const tempStr = temp.toString();
    tsContent += `  "${tempStr}": {`;
    
    const pressureEntries = [];
    const tempData = data.co2Matrix[tempStr];
    const pressures = Object.keys(tempData).map(Number).sort((a, b) => a - b);
    
    pressures.forEach(pressure => {
        const pressureStr = pressure.toString();
        const co2Value = tempData[pressureStr];
        pressureEntries.push(`"${pressureStr}": ${co2Value}`);
    });
    
    tsContent += pressureEntries.join(', ');
    tsContent += '}';
    
    if (tempIndex < temps.length - 1) {
        tsContent += ',';
    }
    tsContent += '\n';
});

tsContent += `}

// Clés numériques triées pour faciliter la recherche de la valeur la plus proche
export const TEMPERATURE_KEYS = Object.keys(CARBONATION_CHART)
  .map(Number)
  .sort((a, b) => a - b)
export const PRESSURE_KEYS = Object.keys(CARBONATION_CHART[TEMPERATURE_KEYS[0].toString()])
  .map(Number)
  .sort((a, b) => a - b)

// Statistiques du tableau
export const CARBONATION_STATS = {
  temperatureRange: { min: ${Math.min(...temps)}, max: ${Math.max(...temps)} },
  pressureRange: { min: ${Math.min(...data.pressures)}, max: ${Math.max(...data.pressures)} },
  totalCombinations: ${temps.length * data.pressures.length},
  dataSource: "Classeur33.xlsx",
  lastUpdated: "${new Date().toISOString()}"
}
`;

fs.writeFileSync('/app/constants/carbonation-chart.ts', tsContent);
console.log('✅ Fichier carbonation-chart.ts généré avec succès !');
console.log(`📊 Températures: ${temps.length} valeurs (${Math.min(...temps)}°C - ${Math.max(...temps)}°C)`);
console.log(`📊 Pressions: ${data.pressures.length} valeurs (${Math.min(...data.pressures)} - ${Math.max(...data.pressures)} psi)`);