// SEASONS

fetch("https://kea-alt-del.dk/t7/api/seasons")
  .then((response) => response.json())
  .then((data) => showSeasons(data));

function showSeasons(seasons) {
  const sorted = [seasons[3], seasons[1], seasons[2], seasons[0]];
  sorted.forEach(showSeason);
}

function showSeason(season) {
  console.log(season);

  const seasonTemp = document.querySelector(".seasons template").content;
  const seasonClone = seasonTemp.cloneNode(true);

  seasonClone.querySelector("li a").textContent = season.season;
  seasonClone.querySelector("li a").href =
    "productlisting.html?season=" + season.season;

  const seasonsList = document.querySelector(".seasons ul");
  seasonsList.appendChild(seasonClone);
}

// CATEGORIES

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then((data) => showCategories(data));

function showCategories(cats) {
  cats.forEach(showCategory);
}

function showCategory(cat) {
  console.log(cat);

  const catTemp = document.querySelector("#category").content;
  const catClone = catTemp.cloneNode(true);

  catClone.querySelector("h2").textContent = cat.category;
  catClone.querySelector("a.category_link").href =
    "productlisting.html?categories=" + cat.category;

  if (cat.category == "Accessories") {
    catClone.querySelector(".category img").src =
      "https://kea-alt-del.dk/t7/images/webp/640/1526.webp";
  } else if (cat.category == "Apparel") {
    catClone.querySelector(".category img").src =
      "https://kea-alt-del.dk/t7/images/webp/640/1164.webp";
  } else if (cat.category == "Footwear") {
    catClone.querySelector(".category img").src =
      "https://kea-alt-del.dk/t7/images/webp/640/1542.webp";
  } else if (cat.category == "Free Items") {
    catClone.querySelector(".category img").src =
      "https://kea-alt-del.dk/t7/images/webp/640/23482.webp";
  } else if (cat.category == "Personal Care") {
    catClone.querySelector(".category img").src =
      "https://kea-alt-del.dk/t7/images/webp/640/18441.webp";
  } else {
    catClone.querySelector(".category img").src =
      "https://kea-alt-del.dk/t7/images/webp/640/1550.webp";
  }

  const categoryContainer = document.querySelector(".container");
  categoryContainer.appendChild(catClone);
}
