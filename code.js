const csv = require('csv-parser');
const fs = require('fs');

const results = [];

fs.createReadStream('shoe_data.csv')
  .pipe(csv())
  .on('data', (data) => {
    const prompt = `Write a summary for ${data['Product Name']}.`;
    const completion = `${data['Product Name']} (${data['Product ID']}) is a ${data['Brand']} shoe. It has a listing price of ${data['Listing Price']} and a sale price of ${data['Sale Price']} with a discount of ${data['Discount']}. The shoe has a rating of ${data['Rating']} based on ${data['Reviews']} reviews. The last time it was visited was on ${data['Last Visited']}.`;
    results.push({ prompt, completion });
  })
  .on('end', () => {
    fs.writeFile('shoe_data_prompts.json', JSON.stringify(results, null, 2), (err) => {
      if (err) throw err;
      console.log('Prompts and completions saved to shoe_data_prompts.json');
    });
  });

