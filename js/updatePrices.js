const fs = require('fs');
const path = require('path');

// Construct the path to the products.json file
const jsonFilePath = path.join(__dirname, '..', 'data', 'products.json');

// Function to update prices, excluding specific models
function updatePrices(products, percentageIncrease, excludedModels) {
    products.forEach(product => {
        product.series.forEach(series => {
            series.models.forEach(model => {
                // Check if the model name is not in the excluded list
                if (!excludedModels.includes(model.name)) {
                    // Remove the dollar sign and convert the price to a number
                    let priceNumber = parseFloat(model.price.replace('$', ''));
                    // Apply the percentage increase
                    priceNumber *= (1 + percentageIncrease / 100);
                    // Convert the price back to a string with a dollar sign
                    model.price = `$${priceNumber.toFixed(2)}`;
                }
            });
        });
    });
    return products;
}

// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error("An error occurred while reading the JSON file.", err);
        return;
    }

    // Parse the JSON data
    const products = JSON.parse(data);

    // Update the prices, excluding specific models
    const excludedModels = ['TRCeN', 'TR']; // Models to exclude from the price update
    const updatedProducts = updatePrices(products, 4, excludedModels); // Increase prices by 4% excluding specified models

    // Convert back to JSON
    const updatedJson = JSON.stringify(updatedProducts, null, 2);

    // Write the updated JSON back to the file
    fs.writeFile(jsonFilePath, updatedJson, 'utf8', (err) => {
        if (err) {
            console.error("An error occurred while writing to the JSON file.", err);
            return;
        }
        console.log("Prices updated successfully.");
    });
});
