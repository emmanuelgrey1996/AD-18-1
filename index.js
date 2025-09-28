const itemsContainer = document.querySelector("#list-items")

function addItem(item) {
  const colourCard = document.createElement("section")
  colourCard.className = "card w-75"
  itemsContainer.append(colourCard)

  const colourCardBody = document.createElement("article")
  colourCardBody.className = "card-body"
  colourCard.append(colourCardBody)

  const colourCardTitle = document.createElement("h5")
  colourCardTitle.className = "card-title"
  colourCardTitle.innerText = item.name
  colourCardBody.append(colourCardTitle)

  const colourCardText = document.createElement("p")
  colourCardText.className = "card-text"
  colourCardText.innerText = item.pantone_value
  colourCardBody.append(colourCardText)

  const colourCardColour = document.createElement("figure")
  colourCardColour.style = "background-color: " + item.color + ";"
  colourCardColour.innerText = item.color
  colourCardBody.append(colourCardColour)

  const colourCardBreak = document.createElement("br")
  itemsContainer.append(colourCardBreak)
}

function fetchColorsList() {
  
}

function loadColorsFromStorage() {
  
}
async function fetchColorsList() {
  try {
    const response = await fetch("https://reqres.in/api/unknown", {
      headers: {
        "x-api-key": "reqres-free-v1" // tu API key aquí
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const colorsArray = data.data; // la lista de colores de la API

    // Mostrar colores en pantalla
    colorsArray.forEach((item) => addItem(item));

    // Guardar en localStorage
    localStorage.setItem("colorsList", JSON.stringify(colorsArray));

  } catch (error) {
    console.log("Error al traer los colores:", error);
  }
}

function loadColorsFromStorage() {
  // 1. Traer la lista guardada
  const storedColors = localStorage.getItem("colorsList");

  // 2. Si existe, convertirla a array
  if (storedColors) {
    const colorsArray = JSON.parse(storedColors);

    // 3. Recorrer y pintar
    colorsArray.forEach((item) => addItem(item));
  } else {
    console.log("No hay colores guardados en localStorage");
  }
}

fetchColorsList()
loadColorsFromStorage()
