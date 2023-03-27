// course api: "https://course-api.com/"

//single product
// https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog

const productDOM = document.querySelector(".product");

const url = "https://course-api.com/javascript-store-single-product";

// function in charge of fetching
const fetchProduct = async () => {
    // loading picture before fetching
    productDOM.innerHTML = `<h4 class="product-loading">Loading...</h4>`;
    ////////////////////////////////////////////////////////////////////
    // to find the params in the url after the ? . this is how we render each product
    // console.log(window.location.search);
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    // console.log(id);
    //////////////////////////////////////////////////////////////////
    try {
        const response = await fetch(`${url}?id=${id}`);

        if (!response.ok) {
            throw new Error("Error while fetching. Fetch not fulfilled");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        productDOM.innerHTML = `<p class="error">There was a problem loading the product. Please try again later</p>`;
    }
};

const displayProduct = (product) => {
    // let's distructure to get the elements: company, colors, description, name (name:title), price, image (url:img)
    const {
        company,
        colors,
        price,
        name: title,
        image,
        description,
    } = product.fields;
    const { url: img } = image[0];

    // to change the title of the document HTML, the one on the TAB
    document.title = title.toUpperCase();

    // for the colors
    const colorz = colors
        .map((eachColor) => {
            return `<span class="product-color" style="background: ${eachColor}"></span>`;
        })
        .join("");

    // to display in the HTML
    productDOM.innerHTML = `<div class="product-wrapper">
        <img src="${img}" class="img" alt="title" />
        <div class="product-info">
            <h3>${title}</h3>
            <h5>${company}</h5>
            <span>$${price / 100}</span>
            <div class="colors">${colorz}</div>
            <p>${description}</p>
            <button class="btn">Add to cart</button>
        </div>
    </div>`;
};

const start = async () => {
    const data = await fetchProduct();
    displayProduct(data);
};

start();
