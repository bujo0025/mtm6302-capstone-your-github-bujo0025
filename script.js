// NASA APOD viewer with date picker
const apiKey = "izEFdoreAnmTfLg1IIMvPsfLZcSDGzq5gZNxe1ch";
const dateInput = document.getElementById("dateInput");
const getImageBtn = document.getElementById("getImage");
const apodImage = document.getElementById("apodImage");
const today = new Date().toISOString().split("T")[0];
dateInput.max = today;

window.addEventListener("load", () => {
  dateInput.value = today;
  fetchImage(today);
});

// Fetch image when button is clicked
getImageBtn.addEventListener("click", () => {
  const date = dateInput.value;
  if (!date) {
    alert("Please select a date first!");
    return;
  }
  fetchImage(date);
});

// Fetch and display APOD
async function fetchImage(date) {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
    );
    const data = await response.json();

    if (data.media_type === "image") {
      apodImage.src = data.url;
      apodImage.alt = data.title || "NASA APOD Image";
    } else {
      // fallback image for videos
      apodImage.src =
        "https://apod.nasa.gov/apod/image/1503/SombreroGalaxy_Hubble_960.jpg";
      apodImage.alt = "Fallback NASA Image";
    }

    console.log(`Loaded APOD for ${date}: ${data.title}`);
  } catch (error) {
    console.error("Error fetching APOD:", error);
    alert("Unable to fetch image for this date.");
  }
}

