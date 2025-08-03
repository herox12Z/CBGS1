// Test pour vérifier que calculateVolCO2 fonctionne avec correspondance exacte uniquement
import { CARBONATION_CHART, TEMPERATURE_KEYS, PRESSURE_KEYS } from './constants/carbonation-chart.js';

// Helper function to check if an exact value exists in the keys array
function hasExactMatch(value, keys) {
  return keys.includes(value);
}

const calculateVolCO2 = (pressure, temperature) => {
  // Only return a value if BOTH temperature AND pressure exist exactly in the chart
  if (hasExactMatch(temperature, TEMPERATURE_KEYS) && hasExactMatch(pressure, PRESSURE_KEYS)) {
    const volCO2 = CARBONATION_CHART[temperature.toString()]?.[pressure.toString()];
    return volCO2 !== undefined ? volCO2 : null;
  }

  // If no exact match is found, return null (field will remain empty)
  return null;
};

console.log('=== Test VOL.CO2 avec correspondance exacte uniquement ===\n');

// Test 1: Correspondance exacte
console.log('Test 1: Correspondance exacte');
console.log('Température: 6, Pression: 7');
const result1 = calculateVolCO2(7, 6);
console.log('VOL.CO2:', result1);
console.log('Résultat attendu: Une valeur (ex: 2.01)');
console.log('---');

// Test 2: Correspondance non-exacte
console.log('Test 2: Correspondance non-exacte');
console.log('Température: 6.3, Pression: 7.5');
const result2 = calculateVolCO2(7.5, 6.3);
console.log('VOL.CO2:', result2);
console.log('Résultat attendu: null (champ vide)');
console.log('---');

// Test 3: Autre correspondance exacte
console.log('Test 3: Autre correspondance exacte');
console.log('Température: 10, Pression: 15');
const result3 = calculateVolCO2(15, 10);
console.log('VOL.CO2:', result3);
console.log('Résultat attendu: Une valeur (ex: 2.47)');
console.log('---');

// Test 4: Température exacte mais pression non-exacte
console.log('Test 4: Température exacte mais pression non-exacte');
console.log('Température: 6, Pression: 7.2');
const result4 = calculateVolCO2(7.2, 6);
console.log('VOL.CO2:', result4);
console.log('Résultat attendu: null (champ vide)');
console.log('---');

console.log('Premières valeurs du tableau:');
console.log('Températures:', TEMPERATURE_KEYS.slice(0, 10));
console.log('Pressions:', PRESSURE_KEYS.slice(0, 10));