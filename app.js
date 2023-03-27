// course api: "https://course-api.com/"

//all products
const url = "https://course-api.com/javascript-store-products";

const productsDOM = document.querySelector(".products-center");

// function in charge of the fetching
const fetchProducts = async () => {
    // loading picture before fetching
    productsDOM.innerHTML = `<div class="loading"></div>`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error while fetching. Fetch not fulfilled");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        productsDOM.innerHTML = `<p class="error">There was an error</p>`;
    }
};

// function in charge of rendering
const displayProducts = (list) => {
    const productList = list
        .map((product) => {
            // let's distructure to get the elements: id, name, price, image
            const { id } = product;
            const { name: title, price } = product.fields; // name: title <-- renaming name by the word title
            const { url: img } = product.fields.image[0];
            // to change the format of the price
            const formatPrice = price / 100;

            return `<a class="single-product" href="product.html?id=${id}">
                        <img
                            src="${img}"
                            class="single-product-img img"
                            alt="${title}"
                        />
                        <footer>
                            <h5 class="name">${title}</h5>
                            <span class="price">$${formatPrice}</span>
                        </footer>
                    </a>`;
        })
        .join("");
    // si quiero que abra en otra pestana       target="_blank

    // to display in the HTML
    productsDOM.innerHTML = `<div class="products-container">${productList}</div>`;
};

// function that starts everything
const start = async () => {
    const data = await fetchProducts();
    displayProducts(data);
};

start();
