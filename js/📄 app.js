
const boton = document.getElementById("btn");
const magnet = document.getElementById("magnet");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", () => {

  if (magnet.value === "") {
    resultado.textContent = "Pega un Magnet URI";
    return;
  }

  const url = "http://mgnet.me/api/create?m=" +
              encodeURIComponent(magnet.value) +
              "&format=json";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.state === "success") {
        resultado.textContent = data.shorturl;
      } else {
        resultado.textContent = "Error al acortar";
      }
    })
    .catch(() => {
      resultado.textContent = "Error de conexión";
    });

});
