const API_URL = "https://65451c245a0b4b04436da50b.mockapi.io/";

const dataContainer = document.getElementById("results");

// BOTONES
const btnGet1 = document.getElementById("btnGet1");
const btnPost = document.getElementById("btnPost");
const btnPut = document.getElementById("btnPut");
const btnDelete = document.getElementById("btnDelete");
const btnSendChanges = document.getElementById("btnSendChanges");

// FUNCIONES
async function getData() {
  await fetch(`${API_URL}users/`)
    .then((response) => response.json())
    .then((data) => {
      dataContainer.innerText = "";
      if (inputGet1Id.value == "") {
        data.forEach((element) => {
          dataContainer.innerText += `
                ID: ${element.id}
                name: ${element.name}
                lastname: ${element.lastname}
            `;
        });
      } else {
        dataContainer.innerText += `
            ID: ${data[inputGet1Id.value - 1].id}
            name: ${data[inputGet1Id.value - 1].name}
            lastname: ${data[inputGet1Id.value - 1].lastname}
        `;
      }
    })
    .catch((error) => {
      console.error("Error: " + error);
      mostrarAlert();
    });
}

function mostrarAlert() {
  var alertError = document.getElementById("alert-error");
  alertError.classList.add("show");
}

// FETCH DEL GET A TODOS / UN USUARIO
const inputGet1Id = document.getElementById("inputGet1Id");
btnGet1.addEventListener("click", async () => {
  await getData();
  inputGet1Id.value = "";
});

// FECTH DEL POST A UN USUARIO
const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");

btnPost.addEventListener("click", async () => {
  const datos = {
    name: inputPostNombre.value,
    lastname: inputPostApellido.value,
  };
  await fetch(`${API_URL}users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error: " + error);
      mostrarAlert();
    });
  await getData();
});

// FECTH DEL PUT A UN USUARIO
const inputPutId = document.getElementById("inputPutId");
const inputPutNombre = document.getElementById("inputPutNombre");
const inputPutApellido = document.getElementById("inputPutApellido");
btnSendChanges.addEventListener("click", async () => {
  const datos = {
    name: inputPutNombre.value,
    lastname: inputPutApellido.value,
  };
  await fetch(`${API_URL}users/${inputPutId.value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data == "Not found") {
        mostrarAlert();
      }
    })
    .catch((error) => {
      console.error("Error: " + error);
      mostrarAlert();
    });
  await getData();
});

// FETCH DEL DELETE A UN USUARIO
const inputDelete = document.getElementById("inputDelete");
btnDelete.addEventListener("click", async () => {
  await fetch(`${API_URL}users/${inputDelete.value}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data == "Not found") {
        mostrarAlert();
      }
    })
    .catch((error) => {
      console.error("Error: " + error);
      mostrarAlert();
    });
  await getData();
});

// Habilitar/deshabilitar botones según la entrada del usuario
inputPostNombre.addEventListener("input", () => {
  btnPost.disabled = !inputPostNombre.value || !inputPostApellido.value;
});

inputPostApellido.addEventListener("input", () => {
  btnPost.disabled = !inputPostNombre.value || !inputPostApellido.value;
});

inputPutId.addEventListener("input", () => {
  btnPut.disabled = !inputPutId.value;
});

inputPutNombre.addEventListener("input", () => {
  btnSendChanges.disabled = !inputPutNombre.value || !inputPutApellido.value;
});

inputPutApellido.addEventListener("input", () => {
  btnSendChanges.disabled = !inputPutNombre.value || !inputPutApellido.value;
});

inputDelete.addEventListener("input", () => {
  btnDelete.disabled = !inputDelete.value;
});
