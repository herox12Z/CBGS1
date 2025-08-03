// Test the fixed constants generation
import { CARBONATION_CHART, TEMPERATURE_KEYS, PRESSURE_KEYS } from './constants/carbonation-chart.js';

console.log('=== FIXED CONSTANTS TEST ===\n');

console.log('TEMPERATURE_KEYS:', TEMPERATURE_KEYS.length, 'values');
console.log('First 10:', TEMPERATURE_KEYS.slice(0, 10));
console.log('Last 10:', TEMPERATURE_KEYS.slice(-10));

console.log('\nPRESSURE_KEYS:', PRESSURE_KEYS.length, 'values');
console.log('First 10:', PRESSURE_KEYS.slice(0, 10));
console.log('Last 10:', PRESSURE_KEYS.slice(-10));

// Test the exact match function
function hasExactMatch(value, keys) {
  return keys.includes(value);
}

const calculateVolCO2 = (pressure, temperature) => {
  if (hasExactMatch(temperature, TEMPERATURE_KEYS) && hasExactMatch(pressure, PRESSURE_KEYS)) {
    const volCO2 = CARBONATION_CHART[temperature.toString()]?.[pressure.toString()];
    return volCO2 !== undefined ? volCO2 : null;
  }
  return null;
};

console.log('\n=== TESTING PREVIOUSLY FAILING VALUES ===');
const testCases = [
  { temp: 6, pressure: 7, expected: 2.01 },
  { temp: 12, pressure: 25, expected: 3.14 },
  { temp: 5.5, pressure: 6, expected: 1.95 },
  { temp: 25, pressure: 60, expected: 4.33 },
  { temp: 30, pressure: 80, expected: 4.94 },
  { temp: 32.5, pressure: 90, expected: 5.19 }
];

testCases.forEach(({ temp, pressure, expected }) => {
  const tempExists = hasExactMatch(temp, TEMPERATURE_KEYS);
  const pressureExists = hasExactMatch(pressure, PRESSURE_KEYS);
  const result = calculateVolCO2(pressure, temp);
  
  console.log(`\nTemp ${temp}, Pressure ${pressure}:`);
  console.log(`  - Temp exists: ${tempExists}`);
  console.log(`  - Pressure exists: ${pressureExists}`);
  console.log(`  - Expected: ${expected}, Got: ${result}, Match: ${result === expected}`);
});