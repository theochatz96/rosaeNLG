const fs = require('fs');
const csv = require('csv-parser');

let counter = 0; // Initialize a counter variable

console.log("The 10 most popular ANAMET codes based on the number of suppliers are:");

fs.createReadStream('C:/Users/theod/Downloads/tutorial/number_of_suppliers.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (counter >= 10) {
      return; // Break out of the loop if we have already processed 10 rows
    }

    const { anamet_code, number_of_suppliers } = row;

    console.log(`ANAMET code: ${anamet_code} which is supplied by ${number_of_suppliers} suppliers.`);

    counter++; // Increment the counter for each row processed
  });
