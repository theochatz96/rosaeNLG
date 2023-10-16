const fs = require('fs');
const csv = require('csv-parser');

const supplierData = {}; // Object to store supplier information
let totalSuppliers = 0;
let totalItemsSupplied = 0;

fs.createReadStream('my_csv.csv')
  .pipe(csv())
  .on('data', (row) => {
    const { date, supplier_name, value, weight } = row;

    // Supplier Performance Report
    if (!supplierData[supplier_name]) {
      supplierData[supplier_name] = {
        totalValue: 0,
        totalWeight: 0,
        itemCount: 0,
      };
      totalSuppliers++;
    }

    supplierData[supplier_name].totalValue += parseFloat(value);
    supplierData[supplier_name].totalWeight += parseFloat(weight);
    supplierData[supplier_name].itemCount += 1;
    totalItemsSupplied++;
  })
  .on('end', () => {
    // Supplier Performance Report
    console.log('*** Supplier Performance Report ***');
    console.log('This comprehensive report provides insights into the performance of suppliers based on the provided data.');
    console.log(`In total, there are ${totalSuppliers} unique suppliers and a grand total of ${totalItemsSupplied} items supplied.`);
    console.log('For each supplier, the report includes the following metrics:');

    for (const supplier in supplierData) {
      const { totalValue, totalWeight, itemCount } = supplierData[supplier];
      console.log(`Supplier Name: ${supplier}`);
      console.log(`Total Value of Scrap Materials Supplied: $${totalValue}`);
      console.log(`Total Weight of Scrap Materials Supplied: ${totalWeight} kg`);
      console.log(`Total Number of Items Supplied: ${itemCount}`);
      console.log('-----------------------------------------');
    }
  });
