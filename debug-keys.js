// Debug script to check the actual keys being generated
const fs = require('fs');

// Read the carbonation chart data
const co2Data = JSON.parse(fs.readFileSync('/app/co2-data-extracted.json', 'utf8'));

console.log('=== CO2 DATA ANALYSIS ===\n');

console.log('Temperatures available:', co2Data.temperatures.length);
console.log('First 10 temperatures:', co2Data.temperatures.slice(0, 10));
console.log('Last 10 temperatures:', co2Data.temperatures.slice(-10));

console.log('\nPressures available:', co2Data.pressures.length);
console.log('First 10 pressures:', co2Data.pressures.slice(0, 10));
console.log('Last 10 pressures:', co2Data.pressures.slice(-10));

console.log('\nCO2 Matrix keys (temperatures):');
const matrixTempKeys = Object.keys(co2Data.co2Matrix).map(Number).sort((a, b) => a - b);
console.log('Matrix temp keys:', matrixTempKeys.slice(0, 10), '...', matrixTempKeys.slice(-5));

console.log('\nSample pressure keys for first temperature:');
const firstTempKey = matrixTempKeys[0].toString();
const pressureKeysForFirstTemp = Object.keys(co2Data.co2Matrix[firstTempKey]).map(Number).sort((a, b) => a - b);
console.log('Pressure keys for temp', firstTempKey + ':', pressureKeysForFirstTemp.slice(0, 10), '...', pressureKeysForFirstTemp.slice(-5));

// Test specific values that should work
console.log('\n=== TESTING SPECIFIC VALUES ===');
const testCases = [
  { temp: 6, pressure: 7 },
  { temp: 12, pressure: 25 },
  { temp: 5.5, pressure: 6 },
  { temp: 32.5, pressure: 90 }
];

testCases.forEach(({ temp, pressure }) => {
  const tempInList = co2Data.temperatures.includes(temp);
  const pressureInList = co2Data.pressures.includes(pressure);
  const tempInMatrix = co2Data.co2Matrix.hasOwnProperty(temp.toString());
  const pressureInMatrix = tempInMatrix ? co2Data.co2Matrix[temp.toString()].hasOwnProperty(pressure.toString()) : false;
  const volCO2 = pressureInMatrix ? co2Data.co2Matrix[temp.toString()][pressure.toString()] : null;
  
  console.log(`Temp ${temp}, Pressure ${pressure}:`);
  console.log(`  - Temp in temperatures array: ${tempInList}`);
  console.log(`  - Pressure in pressures array: ${pressureInList}`);
  console.log(`  - Temp in matrix: ${tempInMatrix}`);
  console.log(`  - Pressure in matrix: ${pressureInMatrix}`);
  console.log(`  - VOL.CO2 value: ${volCO2}`);
  console.log('');
});