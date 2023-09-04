const socketClient = io();
const divHandlebarsCarts = document.getElementById("carritosPlasmados");

socketClient.on("arreglo de carritos", (arrayCarts) => {
  //
  const arregloDeCartsPasadoAhtml = arrayCarts
    .map((cadaElemento) => {
      const titlesProducts = cadaElemento.products
        .map((product) => {
          return product.title;
        })
        .join(" - ");
      return `<p>products:${titlesProducts}
                <br>
                price:${cadaElemento.price}
                <br>
                quantity:${cadaElemento.quantity}<p>`;
    })
    .join(" ");
  divHandlebarsCarts.innerHTML = arregloDeCartsPasadoAhtml;
});
