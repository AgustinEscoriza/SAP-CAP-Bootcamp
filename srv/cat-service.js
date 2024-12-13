const { error } = require("@sap/cds");
const cds = require("@sap/cds");
const { Books } = cds.entities();

module.exports = cds.service.impl(async (srv) => {
  srv.on("buyBook", async (req) => {
    const id = req.params[0];
    const { buyer } = req.data;

    //const query = SELECT.one.from(Books).where({ ID: id });

    try {
      /// const book = await cds.run(query);
      const book = await cds.run(SELECT.one.from(Books).where({ ID: id }));
      if (book) {
        const newStock = book.stock - 1;
        const queryUpdate = UPDATE(Books, { ID: id }).with({ stock: newStock });
        try {
          const update = await cds.run(queryUpdate);
          return `El libro ${book.title} ha sido comprado por ${buyer}. Unidades disponibles ${newStock}`;
        } catch (error) {
          console.error("No fue posible actualizar stock", error);
          return req.error(error);
        }
      }
    } catch (error) {
      console.error("No fue posible encontrar el libro", error);
      return req.error(error);
    }
  });

  srv.on("getStock", async (req) => {
    const id = req.params[0];
    const query = SELECT.one.from(Books).where({ ID: id });
    try {
      const book = await cds.run(query);
      return book.stock;
    } catch (error) {
      console.error("No fue posible encontrar el libro", error);
      return req.error(error);
    }
  });

  srv.on("calculateTotalStock", async (req) => {
    const query = SELECT.from(Books);
    try {
      const books = await cds.run(query);
      const total = books.reduce((accumulator, book) => {
        return accumulator + book.stock;
      }, 0);
      return total;
    } catch (error) {
      console.error("Ocurrió uns excepción", error);
      return req.error(error);
    }
  });

  srv.on("resetAllBooks", async (req) => {
    const query = SELECT.from(Books);
    try {
      const books = await cds.run(query);
      if (books && books.length > 0) {
        try {
          for (const book of books) {
            const queryUpdate = UPDATE(Books, { ID: book.ID }).with({
              isBestSeller: false,
            });
            await cds.run(queryUpdate);
          }
          return `Se actualizaron los libros`;
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error("Ocurrió uns excepción", error);
      return req.error(error);
    }
  });

  // srv.on("resetAllBooks", async (req) => {
  //   const query = SELECT.from(Books);
  //   try {
  //     const books = await cds.run(query);
  //     if (books && books.length > 0) {
  //       const updatePromises = books.map((book) => {
  //         const queryUpdate = UPDATE(Books, { ID: book.ID }).with({
  //           isBestSeller: false,
  //         });
  //         return cds.run(queryUpdate);
  //       });

  //       await Promise.all(updatePromises);
  //       return `Se actualizaron los libros`;
  //     } else {
  //       return `No se encontraron libros para actualizar`;
  //     }
  //   } catch (error) {
  //     console.error("Ocurrió una excepción", error);
  //     return req.error(error);
  //   }
  // });
});
