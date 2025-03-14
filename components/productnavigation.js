document.addEventListener("DOMContentLoaded", function () {
  const gridView = document.querySelector(".product-list-container"); // Product categories
  const modelView = document.createElement("div"); // Model selection
  modelView.classList.add("model-list-container");
  const seriesView = document.createElement("div"); // Series selection
  seriesView.classList.add("series-list-container");
  const seriesDetailsView = document.createElement("div"); // Individual series details
  seriesDetailsView.classList.add("series-details-container");

  document.body.appendChild(modelView);
  document.body.appendChild(seriesView);
  document.body.appendChild(seriesDetailsView);

  // Apply Styling to the Document
  const style = document.createElement("style");
  style.textContent = `
        .hidden { display: none; }
        
        .product-list-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
            padding: 1.5rem;
            margin: 8rem 1rem 6rem 1rem;
            background: white;
            border-radius: 12px;
            
        }

        .product-item {
            cursor: pointer;
            border: 1px solid #eee;
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: white;
            padding: 1rem;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            color: var(--primary-blue);
            height: 180px;
        }

        .product-item img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            margin-bottom: 1rem;
            background: white;
            padding: 0.5rem;
            border-radius: 8px;
        }

        .product-item h3 {
            padding: 0.5rem;
            font-size: 16px;
            text-align: center;
            background: white;
            width: 100%;
            color: var(--primary-blue);
            height: auto;
            min-height: 20px;
            margin: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 1.4;
        }

        .model-list-container, .series-list-container {
            display: flex;
            flex-direction: column;
            padding: 20px;
            margin-top: 0;
            margin-bottom: 6rem;
            margin-top: 6rem;
            gap: .5rem;
        }

        .model-item {
            border: 1px solid #ccc;
            padding: 10px;
            margin: 5px;
            cursor: pointer;
            background: whitesmoke;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
           
        }

        .model-item img {
            width: 150px;
            height: 150px;
            object-fit: contain;
           
            padding: 1rem;
          
        }

        .model-item h3 {
            padding: 0.5rem;
            font-size: 20px;
            text-align: center;
            background: whitesmoke;
            width: 100%;
            color: var(--primary-blue);
            height: auto;
            min-height: 24px;
            margin: 0;
            line-height: 1.4;
        }

        .series-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 1.25rem;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            border-radius: 12px;
            border: 1px solid #eee;
            background: white;
            margin: 0.75rem 0;
            gap: 1rem;
        }

        .series-item img {
            height: 80px;
            width: auto;
            object-fit: contain;
        }

        .series-item .model-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .series-item .model-info p {
            margin: 0;
            line-height: 1.4;
        }

        .series-item .model-info p:first-child {
            font-size: 20px;
            font-weight: 700;
        }

        .series-item .model-info p:last-child {
            font-size: 18px;
        }

        .series-item .buy-now-btn {
            white-space: nowrap;
        }

        .back-button {
            padding: 0.75rem 1.5rem;
            margin: 0.5rem 0;
            background-color: transparent!important;
            color: var(--primary-blue);
            border: none!important;
         
            cursor: pointer;
            font-size: 18px;
            width: auto;
            min-width: 200px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
           
            align-self: flex-start;
        }

        .back-button:hover {
            background-color: var(--primary-blue);
            color: white;
        }

        .buy-now-btn {
            font-size: 15px;
            padding: 0.75rem 1.25rem;
            text-decoration: none;
            background-color: var(--primary-blue);
            color: white;
            border-radius: 8px;
        }

        .no-message-cta {
            font-size: 20px;
            padding: .5rem;
            text-decoration: none;
            background-color: var(--primary-blue);
            color: white;
            text-align: center;
            border-radius: 8px;
            margin-top: 2rem;
            display: block;
        }

        .series-details-container {
            padding: 1.5rem;
            text-align: left;
            margin: 6rem 1rem 6rem 1rem;
            background: white;
            border-radius: 12px;
        }

        .series-details-container .product-header {
            margin: 1rem 0;
        }

        .series-details-container .product-header h2 {
            color: var(--primary-red);
            font-size: 26px;
            font-weight: 600;
            margin: 0;
            line-height: 1.3;
        }

        .series-details-container .product-image-container {
            margin: 1.5rem 0;
        }

        .series-details-container .product-image-container img {
            max-width: 100%;
            height: auto;
            display: block;
            border-radius: 8px;
            background: white;
            padding: 1rem;
        }

        .series-details-container .product-info {
            margin: 1.5rem 0;
        }

        .series-details-container .product-info p {
            color: #333;
            line-height: 1.6;
            margin: 0.75rem 0;
            font-size: 16px;
        }

        .series-details-container .model-details {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
            margin: 1.5rem 0;
            border: 1px solid #eee;
        }

        .series-details-container .model-details p {
            margin: 0.5rem 0;
            font-size: 18px;
        }

        .series-details-container .document-links {
            margin: 2rem 0;
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid #eee;
        }

        .document-links h4 {
            color: var(--primary-blue);
            font-weight: 600;
            font-size: 20px;
            margin: 0 0 1rem 0;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #eee;
        }

        .document-section {
            margin-bottom: 2rem;
        }

        .document-section:last-child {
            margin-bottom: 0;
        }

        .document-section-title {
            color: #666;
            font-size: 16px;
            font-weight: 500;
            margin: 1rem 0;
        }

        .document-links a {
            color: var(--primary-blue);
            text-decoration: none;
            display: flex;
            align-items: center;
            padding: 1rem 1.5rem;
            font-size: 16px;
            background: white;
            margin: 0.75rem 0;
            border-radius: 8px;
            border: 1px solid #eee;
            transition: all 0.2s ease;
        }

        .document-links a:hover {
            background: var(--primary-blue);
            color: white;
            transform: translateY(-1px);
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

        .document-links p {
            color: #666;
            font-style: italic;
            margin: 1rem 0;
            text-align: center;
        }

        .header-title {
            
            padding-left: 1rem;
            color: var(--primary-red);
            font-size: 28px;
            font-weight: 500;
        }

        h3 {
            padding: 10px;
            font-size: 16px;
            text-align: center;
            background: whitesmoke;
            width: 100%;
            color: var(--primary-blue);
            height: 20px;
        }

        .search-input {
            padding: 10px;
            font-size: 16px;
            margin-bottom: 10px;
            width: 90%;
            border-radius: 10px;
            border: 1px #ccc solid;
            box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
        }

        .input-wrapper {
            display: flex;
            justify-content: space-evenly;
            padding: 1rem;
        }

        .model-info {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .model-info p {
            margin: 0;
            line-height: 1.4;
        }
    `;
  document.head.appendChild(style);

  let productsData = []; // Store fetched products

  // Fetch and Render Products
  fetch("../data/products.json")
    .then((response) => response.json())
    .then((products) => {
      productsData = products;
      renderProductGrid(products);
      checkUrlParams(); // Ensure correct navigation on page load
    });

  function renderProductGrid(products) {
    gridView.innerHTML = "";
    products.forEach((product) => {
      const firstSeries = product.series.length > 0 ? product.series[0] : null;
      const imageUrl =
        firstSeries && firstSeries.image
          ? firstSeries.image
          : "../assets/images/default-image.png";

      const productDiv = document.createElement("div");
      productDiv.classList.add("product-item");
      productDiv.innerHTML = `
                <img src="${imageUrl}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
            `;
      productDiv.addEventListener("click", () => {
        updateUrl(`?product=${encodeURIComponent(product.name)}`);
        showModelList(product);
      });
      gridView.appendChild(productDiv);
    });
  }

  function showModelList(product) {
    modelView.dataset.product = product.name;
    modelView.innerHTML = "";

    modelView.appendChild(createBackButton("← Back to Categories", gridView));

    // Add Title
    const headerTitle = document.createElement("h2");
    headerTitle.className = "header-title";
    headerTitle.textContent = `Select a series for ${product.name}`;
    modelView.appendChild(headerTitle);

   

    product.series.forEach((series) => {
      const modelDiv = document.createElement("div");
      modelDiv.classList.add("model-item");
      modelDiv.innerHTML = `
                <img src="${
                  series.image || "../assets/images/default-image.png"
                }" alt="${series.name}">
                <h3>${series.name}</h3>
            `;
      modelDiv.addEventListener("click", () => {
        updateUrl(
          `?product=${encodeURIComponent(
            product.name
          )}&series=${encodeURIComponent(series.name)}`
        );
        showSeriesList(product, series);
      });
      modelView.appendChild(modelDiv);
    });

    showView(modelView);
  }

  function showSeriesList(product, series) {
    seriesView.dataset.product = product.name;
    seriesView.innerHTML = "";

    seriesView.appendChild(createBackButton("← Back to Models", modelView));

    // Add Title
    const headerTitle = document.createElement("h2");
    headerTitle.className = "header-title";
    headerTitle.textContent = `Select a model from ${series.name}`;
    seriesView.appendChild(headerTitle);

    

    if (!series.models || series.models.length === 0) {
      const noModelsWrapper = document.createElement("div");
      noModelsWrapper.className = "no-message";

      const noModelsMessage = document.createElement("p");
      noModelsMessage.innerHTML = `No models are available for this series. For more information, please contact our 
                <a href="mailto:custserv.jax@solerpalau.com">customer service department</a> or visit our configurator.`;

      const configuratorLink = document.createElement("a");
      configuratorLink.className = "no-message-cta";
      configuratorLink.href = "https://www.optisizer.com/Default.aspx";
      configuratorLink.textContent = "Visit our Configurator";

      noModelsWrapper.appendChild(noModelsMessage);
      noModelsWrapper.appendChild(configuratorLink);
      seriesView.appendChild(noModelsWrapper);

      showView(seriesView);
      return;
    }

    series.models.forEach((model) => {
      const seriesDiv = document.createElement("div");
      seriesDiv.classList.add("series-item");

      seriesDiv.addEventListener("click", () => {
        updateUrl(
          `?product=${encodeURIComponent(
            product.name
          )}&series=${encodeURIComponent(
            series.name
          )}&model=${encodeURIComponent(model.name)}`
        );
        showSeriesDetails(product, series, model);
      });

      seriesDiv.innerHTML = `
                <img src="${model.image || series.image}" alt="${model.name}">
                <div class="model-info">
                    <p>${model.name}</p>
                    <p>${model.price || "N/A"}</p>
                </div>
                <a href="https://www.optisizer.com/Default.aspx" target="_blank" class="buy-now-btn">Order Now</a>
            `;

      seriesView.appendChild(seriesDiv);
    });

    showView(seriesView);
  }

  function showSeriesDetails(product, series, model) {
    seriesDetailsView.innerHTML = "";

    // Add back button first
    const backButton = createBackButton("← Series", seriesView);
    seriesDetailsView.appendChild(backButton);

    // Create content container
    const contentContainer = document.createElement("div");
    contentContainer.innerHTML = `
            <div class="product-header">
                <h2>${product.name} - ${series.name}</h2>
            </div>
            <div class="product-image-container">
                <img src="${series.image || '../assets/images/default-image.png'}" alt="${series.name}">
            </div>
            <div class="product-info">
                <p>${series.description}</p>
            </div>
            <div class="model-details">
                <p><strong>Model:</strong> ${model.name}</p>
                <p><strong>Price:</strong> ${model.price || "N/A"}</p>
            </div>
            <div class="document-links">
                <h4>Product Documentation</h4>
                ${renderLinks(series.submittals, "Submittals")}
                ${renderLinks(series.otherDocs, "Installation & Operation Manuals")}
            </div>
        `;

    seriesDetailsView.appendChild(contentContainer);
    showView(seriesDetailsView);
  }

  function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get("product");
    const seriesName = urlParams.get("series");
    const modelName = urlParams.get("model");

    // Hide all views before restoring the correct one
    [gridView, modelView, seriesView, seriesDetailsView].forEach(
      (view) => (view.style.display = "none")
    );

    if (!productName) {
      gridView.style.display = "grid"; // Show categories properly
      return;
    }

    const product = productsData.find((p) => p.name === productName);
    if (!product) return;

    if (seriesName) {
      const series = product.series.find((s) => s.name === seriesName);
      if (!series) return;

      if (modelName) {
        const model = series.models.find((m) => m.name === modelName);
        if (model) showSeriesDetails(product, series, model);
      } else {
        showSeriesList(product, series);
      }
    } else {
      showModelList(product);
    }
  }

  function showView(view) {
    [gridView, modelView, seriesView, seriesDetailsView].forEach(
      (v) => (v.style.display = "none")
    );
    if (view === gridView) {
      view.style.display = "grid";
    } else if (view === modelView) {
      view.style.display = "flex";
    } else {
      view.style.display = "block";
    }
    // Reset scroll position when changing views
    window.scrollTo(0, 0);
  }

  function createBackButton(text, targetView) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add("back-button");
    button.addEventListener("click", () => {
      const currentUrl = new URL(window.location.href);
      const params = new URLSearchParams(currentUrl.search);
      
      if (params.has('model')) {
        // If we're in model details, go back to series list by removing only the model parameter
        params.delete('model');
      } else if (params.has('series')) {
        // If we're in series list, go back to product list by removing only the series parameter
        params.delete('series');
      } else if (params.has('product')) {
        // If we're in product list, go back to main page by removing only the product parameter
        params.delete('product');
      }
      
      const newUrl = currentUrl.pathname + (params.toString() ? '?' + params.toString() : '');
      window.location.href = newUrl;
    });
    return button;
  }

  function updateUrl(path) {
    history.pushState({}, "", path);
  }

  window.onpopstate = () => checkUrlParams();

  function renderLinks(links, title) {
    if (!links || links.length === 0) {
      return `<p>No ${title.toLowerCase()} available</p>`;
    }
    return `
      <div class="document-section">
        <div class="document-section-title">${title}</div>
        ${links.map(link => `
          <a href="${link.url}" target="_blank">
            ${link.type}
          </a>
        `).join('')}
      </div>
    `;
  }
});
