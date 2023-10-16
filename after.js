const fs = require('fs');
const csv = require('csv-parser');

const monthlySummary = {}; // Object to store monthly summary data

fs.createReadStream('my_csv.csv')
  .pipe(csv())
  .on('data', (row) => {
    const { date, value, weight } = row;

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
      } else {
        console.log(`Skipping row with invalid date format: ${date}`);
      }
    } else {
      console.log('Skipping row with missing date.');
    }
  })
  .on('end', () => {
    // Monthly Summary Report
    console.log('\n*** Monthly Summary Report ***');
    console.log('This comprehensive report provides detailed insights into the monthly performance based on the provided data.');
    console.log('The report is organized by month and year, presenting the following metrics for each period:');

    for (const monthYear in monthlySummary) {
      const { totalValue, totalWeight, itemCount } = monthlySummary[monthYear];
      console.log(`\nMonth and Year: ${monthYear}`);
      console.log(`- Total Value of Scrap Materials Supplied: $${totalValue}`);
      console.log(`- Total Weight of Scrap Materials Supplied: ${totalWeight} kg`);
      console.log(`- Total Number of Items Supplied: ${itemCount}`);
    }

    console.log('\nThis report allows you to analyze the trends and patterns in scrap material supply over different months and years, aiding in decision-making and optimization of your operations.');
  });
