const data = [
    { date: '2021-08-26', suppliers: 12, scrapCodes: 12 },
    { date: '2021-08-27', suppliers: 12, scrapCodes: 12 },
    { date: '2021-08-28', suppliers: 4, scrapCodes: 6 },
    { date: '2021-08-30', suppliers: 18, scrapCodes: 17 },
    { date: '2021-08-31', suppliers: 12, scrapCodes: 18 }
  ];
  
  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    const dateText = current.date;
    const suppliersText = current.suppliers;
    const scrapCodesText = current.scrapCodes;
  
    console.log(`For ${dateText}, we had ${suppliersText} different suppliers and ${scrapCodesText} different scrap codes delivered.`);
  }
  