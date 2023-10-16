const fs = require('fs');
const csv = require('csv-parser');

let count = 0; // Initialize a count variable
let suppliers = []; // Create an array to store supplier information

fs.createReadStream('C:/Users/theod/Downloads/tutorial/top_suppliers.csv')
  .pipe(csv())
  .on('data', (row) => {
    const { supplier, avg_count, avg_sum } = row;
    suppliers.push({ supplier, avg_count, avg_sum }); // Store supplier information in the array
    count++; // Increment the count for each row
  })
  .on('end', () => {
    console.log(`The top ${count} suppliers of ANAMET are:`);

    suppliers.forEach((supplierInfo) => {
      const { supplier, avg_count, avg_sum } = supplierInfo;
      console.log(`Supplier ${supplier}, that has delivered ${avg_count} orders accounting for ${avg_sum} kg.`);
    });
  });
