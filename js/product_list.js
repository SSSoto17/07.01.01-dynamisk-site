const urlParams = new URLSearchParams(window.location.search);
const seasonURL = urlParams.get("season");
const categoryURL = urlParams.get("categories");
let myParam = "prut";

if (seasonURL) {
  myParam = "season=" + seasonURL;
} else if (categoryURL) {
  myParam = "category=" + categoryURL;
}
const url = "https://kea-alt-del.dk/t7/api/products?limit=20&" + myParam;
console.log(url);
fetch(url)
  .then((response) => response.json())
  .then(listProducts);

function listProducts(products) {
  console.log(products);
  products.forEach(showProduct);
}

function showProduct(product) {
  const cardTemplate = document.querySelector("template").content;
  const cardClone = cardTemplate.cloneNode(true);

  cardClone.querySelector("img").src =
    "https://kea-alt-del.dk/t7/images/webp/640/" + product.id + ".webp";
  cardClone.querySelector("h3").textContent = product.brandname;
  cardClone.querySelector("p").textContent = product.productdisplayname;

  if (product.discount) {
    cardClone.querySelector("h3.before_discount").classList.remove("hide");
    cardClone.querySelector("h3.before_discount span").textContent =
      product.price;
    cardClone.querySelector("h3.price span").textContent = Math.round(
      product.price * (product.discount / 100)
    );
  } else {
    cardClone.querySelector("h3.price span").textContent = product.price;
  }

  if (product.soldout) {
    cardClone.querySelector("button.buy").classList.add("sold_out");
    cardClone.querySelector("button.buy").textContent = "Out of Stock";
  }

  cardClone
    .querySelector("button.save i")
    .addEventListener("click", function () {
      this.classList.toggle("fa-regular");
      this.classList.toggle("fa-solid");
    });

  cardClone.querySelector("a").href = "product.html?id=" + product.id;

  const listContainer = document.querySelector(".container");
  listContainer.appendChild(cardClone);
}
