const socketClient = io();
const divHandlebars = document.getElementById("productosPlasmados");

socketClient.on("arreglo de productos", (arrayProductos) => {
  console.log(arrayProductos);
  /* const docs = arrayProductos.products.products.docs; */
  /* const primernivel = arrayProductos.map((products) => {
    const segundonivel = products.map((doc) => {
      return `<p>${doc.title}
    price:${doc.price}
    stock:${doc.stock}
    code:${doc.code}
    category:${doc.category}</p>`;
    });
    divHandlebars.innerHTML = segundonivel;
  }); */
  /* const titlesHTML = docs.map((doc) => {
    return `<p>${doc.title}
    price:${doc.price}
    stock:${doc.stock}
    code:${doc.code}
    category:${doc.category}</p>`;
  });
  divHandlebars.innerHTML = titlesHTML; */
  //
  /*  const arregloDeProductsPasadoAhtml = arrayProductos
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
  divHandlebars.innerHTML = arregloDeProductsPasadoAhtml; */

  /* const arregloDeProductsPasadoAhtml = arrayProductos.map((cadaElemento) => {
    const agarrandoProducts = cadaElemento.products
      .map((docs) => {
        return `<p>title:${docs.title}
      description:${docs.description}
      price:${docs.price}
      stock:${docs.stock}
      code:${docs.code}
      category:${docs.category}<p>`;
      })
      .join(" ");
    //
    divHandlebars.innerHTML = agarrandoProducts;
  }); */
});
