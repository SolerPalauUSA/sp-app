const fs = require('fs');

// Function to update prices, excluding specific models
function updatePrices(products, percentageIncrease, excludedModels) {
    products.forEach(product => {
        product.series.forEach(series => {
            series.models.forEach(model => {
                // Check if the model name is not in the excluded list
                if (!excludedModels.includes(model.name)) {
                    model.price *= (1 + percentageIncrease / 100);
                }
            });
        });
    });
    return products;
}

// Read the JSON file
fs.readFile('../data/products.json', 'utf8', (err, data) => {
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
    fs.writeFile('path/to/products.json', updatedJson, 'utf8', (err) => {
        if (err) {
            console.error("An error occurred while writing to the JSON file.", err);
            return;
        }
        console.log("Prices updated successfully.");
    });
});
