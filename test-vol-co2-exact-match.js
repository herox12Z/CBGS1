// Test script for VOL.CO2 exact match calculation logic
// This tests the modified calculateVolCO2 function that only returns values for exact matches

// Import the carbonation chart data manually since we can't import TS files directly
const CARBONATION_CHART = {
  "6": {"6": 1.92, "7": 2.01, "8": 2.11, "9": 2.21, "10": 2.3, "11": 2.4, "12": 2.49, "13": 2.59, "14": 2.69, "15": 2.78, "16": 2.88, "17": 2.98, "18": 3.07, "19": 3.17, "20": 3.26, "21": 3.36, "22": 3.46, "23": 3.55, "24": 3.65, "25": 3.74, "26": 3.84, "27": 3.94, "28": 4.03, "29": 4.13, "30": 4.23, "31": 4.32, "32": 4.42, "33": 4.51, "34": 4.61, "35": 4.71, "36": 4.8, "37": 4.9, "38": 5, "39": 5.09, "40": 5.19, "41": 5.28, "42": 5.38, "43": 5.48, "44": 5.57, "45": 5.67, "46": 5.76, "47": 5.86, "48": 5.96, "49": 6.05},
  "7": {"6": 1.86, "7": 1.95, "8": 2.04, "9": 2.14, "10": 2.23, "11": 2.32, "12": 2.42, "13": 2.51, "14": 2.6, "15": 2.7, "16": 2.79, "17": 2.88, "18": 2.98, "19": 3.07, "20": 3.16, "21": 3.26, "22": 3.35, "23": 3.44, "24": 3.54, "25": 3.63, "26": 3.72, "27": 3.82, "28": 3.91, "29": 4, "30": 4.1, "31": 4.19, "32": 4.28, "33": 4.38, "34": 4.47, "35": 4.56, "36": 4.66, "37": 4.75, "38": 4.84, "39": 4.94, "40": 5.03, "41": 5.12, "42": 5.22, "43": 5.31, "44": 5.4, "45": 5.5, "46": 5.59, "47": 5.68, "48": 5.78, "49": 5.87, "50": 5.96, "51": 6.06},
  "10": {"6": 1.7, "7": 1.78, "8": 1.87, "9": 1.95, "10": 2.04, "11": 2.12, "12": 2.21, "13": 2.3, "14": 2.38, "15": 2.47, "16": 2.55, "17": 2.64, "18": 2.72, "19": 2.81, "20": 2.89, "21": 2.98, "22": 3.07, "23": 3.15, "24": 3.24, "25": 3.32, "26": 3.41, "27": 3.49, "28": 3.58, "29": 3.66, "30": 3.75, "31": 3.84, "32": 4.01, "33": 4.09, "34": 4.09, "35": 4.18, "36": 4.26, "37": 4.35, "38": 4.43, "39": 4.52, "40": 4.61, "41": 4.69, "42": 4.78, "43": 4.86, "44": 4.95, "45": 5.04, "46": 5.12, "47": 5.21, "48": 5.29, "49": 5.38, "50": 5.46, "51": 5.55, "52": 5.63, "53": 5.72, "54": 5.8, "55": 5.89, "56": 5.98, "57": 6.06},
  "20": {"6": 1.29, "7": 1.36, "8": 1.43, "9": 1.49, "10": 1.56, "11": 1.62, "12": 1.69, "13": 1.76, "14": 1.82, "15": 1.89, "16": 1.96, "17": 2.02, "18": 2.09, "19": 2.15, "20": 2.22, "21": 2.29, "22": 2.35, "23": 2.42, "24": 2.49, "25": 2.55, "26": 2.62, "27": 2.68, "28": 2.75, "29": 2.82, "30": 2.88, "31": 2.95, "32": 3.08, "33": 3.15, "34": 3.18, "35": 3.21, "36": 3.28, "37": 3.35, "38": 3.41, "39": 3.48, "40": 3.54, "41": 3.61, "42": 3.68, "43": 3.74, "44": 3.81, "45": 3.88, "46": 3.94, "47": 4.01, "48": 4.07, "49": 4.14, "50": 4.21, "51": 4.27, "52": 4.34, "53": 4.41, "54": 4.47, "55": 4.54, "56": 4.6, "57": 4.67, "58": 4.74, "59": 4.8, "60": 4.87, "61": 4.93, "62": 5, "63": 5.07, "64": 5.13, "65": 5.2, "66": 5.27, "67": 5.33, "68": 5.4, "69": 5.46, "70": 5.53, "71": 5.6, "72": 5.66, "73": 5.73, "74": 5.8, "75": 5.86, "76": 5.93, "77": 5.99, "78": 6.06}
};

const TEMPERATURE_KEYS = [6, 7, 10, 20]; // Sample keys for testing
const PRESSURE_KEYS = [6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90]; // Sample keys for testing

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

console.log('=== VOL.CO2 EXACT MATCH TESTING ===\n');

// Test 1: Exact values that should return a VOL.CO2 value
console.log('TEST 1: Exact values (should return VOL.CO2 values)');
console.log('Temperature: 6°C, Pressure: 7 PSI');
console.log('Result:', calculateVolCO2(7, 6)); // Should return 2.01

console.log('\nTemperature: 10°C, Pressure: 15 PSI');
console.log('Result:', calculateVolCO2(15, 10)); // Should return 2.47

console.log('\nTemperature: 20°C, Pressure: 30 PSI');
console.log('Result:', calculateVolCO2(30, 20)); // Should return 2.88

// Test 2: Non-exact values that should return null
console.log('\n\nTEST 2: Non-exact values (should return null)');
console.log('Temperature: 6.3°C, Pressure: 7.5 PSI');
console.log('Result:', calculateVolCO2(7.5, 6.3)); // Should return null

console.log('\nTemperature: 10.2°C, Pressure: 15.8 PSI');
console.log('Result:', calculateVolCO2(15.8, 10.2)); // Should return null

console.log('\nTemperature: 20.1°C, Pressure: 30.5 PSI');
console.log('Result:', calculateVolCO2(30.5, 20.1)); // Should return null

// Test 3: One exact, one non-exact (should return null)
console.log('\n\nTEST 3: One exact, one non-exact (should return null)');
console.log('Temperature: 6°C (exact), Pressure: 7.5 PSI (non-exact)');
console.log('Result:', calculateVolCO2(7.5, 6)); // Should return null

console.log('\nTemperature: 6.3°C (non-exact), Pressure: 7 PSI (exact)');
console.log('Result:', calculateVolCO2(7, 6.3)); // Should return null

// Test 4: Edge cases - boundary values
console.log('\n\nTEST 4: Edge cases - boundary values');
console.log('Temperature: 5.5°C (min), Pressure: 6 PSI (min)');
console.log('Result:', calculateVolCO2(6, 5.5)); // Should return 1.95

console.log('\nTemperature: 32.5°C (max), Pressure: 90 PSI (max)');
console.log('Result:', calculateVolCO2(90, 32.5)); // Should return 5.19

// Test 5: Values outside the range
console.log('\n\nTEST 5: Values outside the range (should return null)');
console.log('Temperature: 5°C (below min), Pressure: 6 PSI');
console.log('Result:', calculateVolCO2(6, 5)); // Should return null

console.log('\nTemperature: 33°C (above max), Pressure: 30 PSI');
console.log('Result:', calculateVolCO2(30, 33)); // Should return null

console.log('\nTemperature: 20°C, Pressure: 5 PSI (below min)');
console.log('Result:', calculateVolCO2(5, 20)); // Should return null

console.log('\nTemperature: 20°C, Pressure: 91 PSI (above max)');
console.log('Result:', calculateVolCO2(91, 20)); // Should return null

// Test 6: Verify some key exact values from the chart
console.log('\n\nTEST 6: Verify key exact values from the chart');
const testCases = [
  { temp: 7, pressure: 8, expected: 2.04 },
  { temp: 12, pressure: 25, expected: 3.14 },
  { temp: 18, pressure: 40, expected: 3.72 },
  { temp: 25, pressure: 60, expected: 4.33 },
  { temp: 30, pressure: 80, expected: 4.94 }
];

testCases.forEach(({ temp, pressure, expected }) => {
  const result = calculateVolCO2(pressure, temp);
  console.log(`Temperature: ${temp}°C, Pressure: ${pressure} PSI`);
  console.log(`Expected: ${expected}, Got: ${result}, Match: ${result === expected}`);
});

console.log('\n=== TESTING COMPLETE ===');
console.log('\nSUMMARY:');
console.log('- Exact temperature AND pressure matches should return VOL.CO2 values');
console.log('- Non-exact values should return null');
console.log('- Mixed (one exact, one non-exact) should return null');
console.log('- Values outside the chart range should return null');
console.log('- This ensures strict conformity: no approximation, no interpolation');