const socketClient = io();
//-------------------Chat---------------------------------------
const nombreDelChat = document.getElementById("nombreChat");
const formularioDelChat = document.getElementById("formularioChat");
const mensajeDelChat = document.getElementById("mensajeChat");
const divChat = document.getElementById("chat");

let usuario;

Swal.fire({
  title: "Bienvenido al chat",
  text: "Ingresa tu nombre",
  input: "text",
  inputValidator: (value) => {
    if (!value) {
      return "Se necesita que ingreses tu NOMBRE";
    }
  },
}).then((nombre) => {
  usuario = nombre.value;
  nombreDelChat.innerText = `Hola ${usuario}`;
});

formularioDelChat.onsubmit = (e) => {
  e.preventDefault();
  const infoMensaje = {
    nombre: usuario,
    mensaje: mensajeDelChat.value,
  };
  socketClient.emit("mensaje", infoMensaje);
};

socketClient.on("mensajeParaTodos", (mensajes) => {
  const chat = mensajes
    .map((objMensaje) => {
      return `<p>${objMensaje.nombre}: ${objMensaje.mensaje}</p>`;
    })
    .join("");
  divChat.innerHTML = chat;
});

//--------------------------------------------------------------
const formProd = document.getElementById("formProduct");
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const code = document.getElementById("code");
const category = document.getElementById("category");
const tableProds = document.getElementById("bodyProd");
const formDelete = document.getElementById("deleteProduct");
const id = document.getElementById("id");

formProd.onsubmit = (e) => {
  e.preventDefault();
  const objProd = {
    title: title.value,
    description: description.value,
    price: Number(price.value),
    stock: Number(stock.value),
    code: code.value,
    category: category.value,
  };
  socketClient.emit("agregar", objProd);
  title.value = "";
  description.value = "";
  price.value = "";
  stock.value = "";
  code.value = "";
  category.value = "";
};

formDelete.onsubmit = (e) => {
  e.preventDefault();
  socketClient.emit("eliminar", Number(id.value));
  id.value = "";
};

socketClient.on("added", (nuevoProducto) => {
  if (typeof nuevoProducto === "object") {
    const addRow = `
        <tr>
        <td>${nuevoProducto.id}</td>
        <td>${nuevoProducto.title}</td>
            <td>${nuevoProducto.description}</td>
            <td>${nuevoProducto.price}</td>
            <td>${nuevoProducto.stock}</td>
            <td>${nuevoProducto.code}</td>
            <td>${nuevoProducto.category}</td>
            </tr>`;
    tableProds.innerHTML += addRow;
  } else {
    alert(nuevoProducto);
  }
});

socketClient.on("deleted", (arrProducts) => {
  if (typeof arrProducts === "object") {
    const addRow = arrProducts
      .map((objProd) => {
        return `
        <tr>
                  <td>${objProd.id}</td>
                  <td>${objProd.title}</td>
                  <td>${objProd.description}</td>
                  <td>${objProd.price}</td>
                  <td>${objProd.stock}</td>
                  <td>${objProd.code}</td>
                  <td>${objProd.category}</td>
              </tr>`;
      })
      .join(" ");
    tableProds.innerHTML = addRow;
  } else {
    alert(arrProducts);
  }
});
