const URL_API = "https://dog.ceo/api/breeds/image/random/30";
const container = document.querySelector(".wrap");
const loader = document.querySelector(".loader");
let disabledLoading = false;

function getData() {
  fetch(`${URL_API}`)
    .then(response => response.json())
    .then(results => postResults(results));
}

function postResults(results) {
  const html = results.message
    .map(
      result =>
        `
		<img src="${result}">
		`
    )
    .join("");
  container.innerHTML += html;
  if (results.length === 0) {
    disabledLoading = true;
  }
}
getData();
window.addEventListener("scroll", () => {
  if (
    document.documentElement.scrollTop + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    loader.classList.remove("hidden");
    setTimeout(() => {
      loader.classList.add("hidden");
      !disabledLoading && getData();
    }, 800);
  }
});
