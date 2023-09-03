const socketClient = io();
const divHandlebars = document.getElementById("productosPlasmados");

socketClient.on("arreglo de productos", (arrayProductos) => {
  //
  const arregloDeProductsPasadoAhtml = arrayProductos
    .map((cadaElemento) => {
      return `<p>title:${cadaElemento.title}
    description:${cadaElemento.description}
    price:${cadaElemento.price}
    stock:${cadaElemento.stock}
    code:${cadaElemento.code}
    category:${cadaElemento.category}<p>`;
    })
    .join(" ");
  //
  divHandlebars.innerHTML = arregloDeProductsPasadoAhtml;
});
