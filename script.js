const apiKey = "qvlXjlbgwyFhTPlzXPCQMtQyhwLPQF4aZpi7IwOS";
const dateInput = document.getElementById("dateInput");
const getImageBtn = document.getElementById("getImage");
const apodImage = document.getElementById("apodImage");
const imageTitle = document.getElementById("imageTitle");
const imageDesc = document.getElementById("imageDesc");

const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
const localDate = today.toISOString().split("T")[0];

dateInput.value = localDate;

window.addEventListener("load", () => {
  fetchImage(localDate);
});

getImageBtn.addEventListener("click", () => {
  const date = dateInput.value;
  if (!date) return;
  fetchImage(date);
});

// Fetch APOD Image
async function fetchImage(date) {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
  );

  if (!response.ok) {
    console.log("Bad API response:", await response.text());
    return;
  }

  const data = await response.json();
  displayImage(data);
}

// Display image and info
function displayImage(data) {
  if (data.media_type === "image" && data.url) {
    apodImage.src = data.url;
    apodImage.alt = data.title || "NASA APOD Image";
  }

  imageTitle.textContent = data.title || "Astronomy Picture of the Day";
  imageDesc.textContent = data.explanation || "No description available.";
}
