// Function to create a container element
function createContainer(elementType, className) {
  const container = document.createElement(elementType);
  container.classList.add(className);
  return container;
}

// Function to display the product description
function displayDescription(product, selectedSeries) {
  const descriptionContainer = document.querySelector(".description-container");
  descriptionContainer.textContent = "";

  const selectedSeriesObj = product.series.find((series) => series.name === selectedSeries);
  if (selectedSeriesObj) {
    const descriptionText = document.createElement("div");
    descriptionText.textContent = selectedSeriesObj.description;
    descriptionContainer.appendChild(descriptionText);
  } else {
    console.error("Selected series not found:", selectedSeries);
  }
}

// Function to clear existing product information
function clearProductInfo() {
  const productInfoContainer = document.querySelector(".product-info-container");
  productInfoContainer.innerHTML = '';
}

// Function to update the product name
function updateProductName(name) {
  const productNameDiv = document.querySelector(".product-name");
  productNameDiv.textContent = name;
}

// Function to display product images
function displayProductImages(product) {
  const imageProductContainer = document.querySelector(".product-image-container");
  imageProductContainer.innerHTML = '';
  product.series.forEach((series) => {
    const seriesImageContainer = createContainer("div", "series-image");
    seriesImageContainer.style.backgroundImage = `url('${series.image}')`;
    seriesImageContainer.addEventListener("click", () => {
      const seriesDropdown = document.querySelector(".series-dropdown");
      if (seriesDropdown) {
        seriesDropdown.value = series.name;
        seriesDropdown.dispatchEvent(new Event("change"));
      }
    });
    const titleElement = createContainer("div", "title-img-series");
    titleElement.textContent = series.name;
    seriesImageContainer.appendChild(titleElement);
    imageProductContainer.appendChild(seriesImageContainer);
  });
  imageProductContainer.style.display = "flex";
}

// Main DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  // Function to extract URL parameters
  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const selectedProductFromUrl = getUrlParameter('product');
  const selectedSeriesFromUrl = getUrlParameter('series');

  const productContainer = document.querySelector(".product-list-container");
  const backArrow = createContainer("div", "back-arrow");
  backArrow.innerHTML = `<img src="../assets/images/return-back-button.svg" alt="back" />`;
  productContainer.appendChild(backArrow);
  backArrow.style.display = "none";

  const productInfoContainer = createContainer("div", "product-info-container");
  const descriptionContainer = createContainer("div", "description-container");
  productInfoContainer.appendChild(descriptionContainer);
  productContainer.appendChild(productInfoContainer);

  // Fetch and process product data
  fetch("../data/products.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        const productListing = createContainer("div", "product-listing");
        const productHTML = `
          <div class="product-image" style="background-image: url('${product.series[0]?.image}')" data-product-name="${product.name}"></div>
          <div class="product-title">${product.name}</div>
        `;
        productListing.innerHTML = productHTML;
        productContainer.appendChild(productListing);

        const productImage = productListing.querySelector(".product-image");
        productImage.addEventListener("click", () => {
          clearProductInfo();
          backArrow.style.display = "flex";
          updateProductName(product.name);
          displayProductImages(product);
          displayDescription(product, selectedSeriesFromUrl);

          const seriesDropdown = createContainer("select", "series-dropdown");
          seriesDropdown.innerHTML = product.series.map((series) => `<option value="${series.name}">${series.name}</option>`).join("");
          productInfoContainer.appendChild(seriesDropdown);

          seriesDropdown.addEventListener("change", () => {
            const selectedSeriesName = seriesDropdown.value;
            displayDescription(product, selectedSeriesName);
          });
        });

        if (product.name === selectedProductFromUrl) {
          productImage.click();
          if (selectedSeriesFromUrl) {
            const seriesDropdown = document.querySelector(".series-dropdown");
            if (seriesDropdown) {
              seriesDropdown.value = selectedSeriesFromUrl;
              seriesDropdown.dispatchEvent(new Event('change'));
            }
          }
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });

  // Handle browser back button clicks
  window.addEventListener("popstate", (event) => {
    const previousState = event.state;
    if (previousState && previousState.path) {
      const updatedUrl = "../pages/products.html";
      window.history.pushState({ path: updatedUrl }, "", updatedUrl);
      backArrow.style.display = "none";
      clearProductInfo();
    }
  });
});
