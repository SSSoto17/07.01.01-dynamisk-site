const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = "https://kea-alt-del.dk/t7/api/products/" + id;

fetch(url)
  .then((response) => response.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  const productTemplate = document.querySelector("template").content;
  const clonedProduct = productTemplate.cloneNode(true);

  clonedProduct.querySelector("img").src = "https://kea-alt-del.dk/t7/images/webp/640/" + product.id + ".webp";

  clonedProduct.querySelector(".item_overview h1").textContent = product.productdisplayname;
  clonedProduct.querySelector(".item_overview h2").textContent = product.brandname;

  clonedProduct.querySelector(".item_overview .color").textContent = product.color1;

  if (product.discount) {
    clonedProduct.querySelector("h3.before_discount span").textContent = product.price;
    clonedProduct.querySelector("h3.price span").textContent = Math.round(product.price * (product.discount / 100));
    clonedProduct.querySelector("p.discount_percentage span").textContent = product.discount;
  } else {
    clonedProduct.querySelector("h3.before_discount").classList.add("hide");
    clonedProduct.querySelector("p.discount_percentage").classList.add("hide");
    clonedProduct.querySelector("h3.price span").textContent = product.price;
  }

  if (product.soldout) {
    clonedProduct.querySelector("button.buy").classList.add("sold_out");
    clonedProduct.querySelector("button.buy").textContent = "Out of Stock";
  }

  clonedProduct.querySelector(".item_description h3").textContent = product.styledesc;
  clonedProduct.querySelector(".item_description p.desc").textContent = product.description;
  clonedProduct.querySelector(".item_description p.care_desc").textContent = product.materialcaredesc;

  const productContainer = document.querySelector(".container");
  productContainer.appendChild(clonedProduct);

  const saveHeart = document.querySelector("button.save i");
  saveHeart.addEventListener("click", () => {
    saveHeart.classList.toggle("fa-regular");
    saveHeart.classList.toggle("fa-solid");
  });
}
