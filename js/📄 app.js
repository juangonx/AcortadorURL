const boton = document.getElementById("btn");
const magnetInput = document.getElementById("magnet");
const resultado = document.getElementById("resultado");

function callback(data) {
  if (data.state === "success") {
    resultado.textContent = "URL corta: " + data.shorturl;
  } else {
    resultado.textContent = "Error: " + data.message;
  }
}

boton.addEventListener("click", () => {
  const magnet = magnetInput.value.trim();

  if (magnet === "") {
    resultado.textContent = "Ingresa un Magnet URI";
    return;
  }

  const script = document.createElement("script");
  script.src =
    "http://mgnet.me/api/create" +
    "?m=" + encodeURIComponent(magnet) +
    "&format=jsonp" +
    "&callback=callback";

  document.body.appendChild(script);
});
