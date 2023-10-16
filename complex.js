const fs = require('fs');
const csv = require('csv-parser');

const monthlySummary = {}; // Object to store monthly summary data
const supplierData = {}; // Object to store supplier information

fs.createReadStream('my_csv.csv')
  .pipe(csv())
  .on('data', (row) => {
    const { date, supplier_name, value, weight, scrap_code } = row;

    // Monthly Summary Report
    if (date) { // Check if date is not undefined
      const dateParts = date.split('-'); // Assuming date format: yyyy-mm-dd
      if (dateParts.length === 3) {
        const year = dateParts[0];
        const month = dateParts[1];
        const monthYear = `${month}/${year}`;
        if (!monthlySummary[monthYear]) {
          monthlySummary[monthYear] = {
            totalValue: 0,
            totalWeight: 0,
            itemCount: 0,
          };
        }

        monthlySummary[monthYear].totalValue += parseFloat(value);
        monthlySummary[monthYear].totalWeight += parseFloat(weight);
        monthlySummary[monthYear].itemCount += 1;

        // Store supplier data
        if (!supplierData[supplier_name]) {
          supplierData[supplier_name] = {
            months: [],
            totalValue: 0,
            totalWeight: 0,
            scrapMaterials: new Set(),
          };
        }

        if (!supplierData[supplier_name].months.includes(monthYear)) {
          supplierData[supplier_name].months.push(monthYear);
        }

        supplierData[supplier_name].totalValue += parseFloat(value);
        supplierData[supplier_name].totalWeight += parseFloat(weight);
        supplierData[supplier_name].scrapMaterials.add(scrap_code);
      } else {
        console.log(`Skipping row with invalid date format: ${date}`);
      }
    } else {
      console.log('Skipping row with missing date.');
    }
  })
  .on('end', () => {
    // Monthly Summary Report
    console.log('*** Detailed Monthly Report ***');
    console.log('This comprehensive report provides in-depth insights into monthly performance based on the provided data.');
    console.log('The report is meticulously organized by month and year, presenting a wealth of information for each period:');

    for (const monthYear in monthlySummary) {
      const { totalValue, totalWeight, itemCount } = monthlySummary[monthYear];
      console.log(`\nMonth and Year: ${monthYear}`);
      console.log(`- The total value of orders for this month and year was: $${totalValue}`);
      console.log(`- The cumulative weight of orders placed was: ${totalWeight} kg`);
      console.log(`- A total of ${itemCount} orders were placed during this period.`);

      // Supplier Information
      const suppliersInMonth = [];
      for (const supplier in supplierData) {
        if (supplierData[supplier].months.includes(monthYear)) {
          suppliersInMonth.push(supplier);
        }
      }

      if (suppliersInMonth.length > 0) {
        console.log('Suppliers for this month:');
        suppliersInMonth.forEach((supplier) => {
          const {
            totalValue: supplierTotalValue,
            totalWeight: supplierTotalWeight,
            scrapMaterials: supplierScrapMaterials,
          } = supplierData[supplier];
          const scrapMaterialsCount = supplierScrapMaterials.size;
          console.log(`- Supplier ${supplier} contributed $${supplierTotalValue} to the total order value.`);
          console.log(`  - Total Weight Supplied: ${supplierTotalWeight} kg`);
          console.log(`  - Different Scrap Materials Supplied: ${scrapMaterialsCount}`);
        });
      } else {
        console.log('No specific supplier data available for this month.');
      }
    }

    console.log('\nThis comprehensive report empowers you to dive deep into the monthly order patterns, uncovering key insights about order values, weights, and supplier contributions, including the variety of scrap materials brought by each supplier.');
  });
