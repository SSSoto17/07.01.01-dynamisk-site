fetch("https://kea-alt-del.dk/t7/api/seasons")
  .then((response) => response.json())
  .then(showSeasons);

function showSeasons(seasons) {
  seasons.forEach(showSeason);
}

function showSeason(season) {
  console.log(season);
}
