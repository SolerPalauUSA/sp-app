  // Function to handle search result clicks
  function handleSearchResultClick(product, series, model) {
    const url = `https://solerpalauusa.github.io/sp-app/pages/products.html?product=${encodeURIComponent(product)}&series=${encodeURIComponent(series)}&model=${encodeURIComponent(model)}`;
    // Redirect the user to the product list page with the selected parameters
    window.location.href = url;
  }

  // You can add event listeners for search result elements here if needed
