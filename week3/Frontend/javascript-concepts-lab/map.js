const numbers = [2, 4, 6, 8, 10];

const doubledNumbers = numbers.map((num) => num * 2);

console.log('Original Numbers:', numbers);
console.log('Doubled Numbers:', doubledNumbers);

const temperaturesCelsius = [0, 15, 30, 45];

const temperaturesKelvin = temperaturesCelsius.map((celsius) => celsius + 273.15);

console.log('Celsius Temperatures:', temperaturesCelsius);
console.log('Kelvin Temperatures:', temperaturesKelvin);

const names = ['alice', 'bob', 'carol'];

/* const capitalizedNames = names.map((name) => name.charAt(0).toUpperCase()); */
const capitalizedNames = names.map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());

console.log('Original Names:', names);
console.log('Capitalized Names:', capitalizedNames);