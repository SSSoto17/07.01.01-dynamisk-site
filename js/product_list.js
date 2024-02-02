const url = "https://kea-alt-del.dk/t7/api/products?limit=20";

fetch(url)
  .then((response) => response.json())
  .then(listProducts);

function listProducts(products) {
  products.forEach(showProduct);
}

function showProduct(product) {
  const cardTemplate = document.querySelector("template").content;
  const cardClone = cardTemplate.cloneNode(true);

  cardClone.querySelector("img").src = "https://kea-alt-del.dk/t7/images/webp/640/" + product.id + ".webp";
  cardClone.querySelector("h3").textContent = product.brandname;
  cardClone.querySelector("p").textContent = product.productdisplayname;

  //   cardClone.querySelector("h3.price span").textContent = product.price + ",00";
  if (product.discount) {
    cardClone.querySelector("h3.before_discount").classList.remove("hide");
    cardClone.querySelector("h3.before_discount span").textContent = product.price;
    cardClone.querySelector("h3.price span").textContent = Math.round(product.price * (product.discount / 100));
  } else {
    cardClone.querySelector("h3.price span").textContent = product.price;
  }

  if (product.soldout) {
    cardClone.querySelector("button.buy").classList.add("sold_out");
  }

  const listContainer = document.querySelector(".container");
  listContainer.appendChild(cardClone);

  const saveHeart = document.querySelectorAll("button.save i");

  saveHeart.forEach(function (elem) {
    elem.addEventListener("click", function () {
      this.classList.toggle("fa-regular");
      this.classList.toggle("fa-solid");
    });
  });
}
