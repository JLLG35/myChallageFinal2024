describe('Pruebas de la página de compras del Usuario 1', { testIsolation: true }, () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com'); // Esto se ejecuta antes de cada prueba
  });

  // Caso de Prueba 1: Verificar inicio de sesión exitoso con standard_user (Usuario 1).
  it('Caso de Prueba 1: Inicio de sesión exitoso con el del Usuario 1', () => {
    cy.iniciarSesion('standard_user', 'secret_sauce'); // Llama al comando personalizado iniciarSesion.
    cy.url().should('include', '/inventory.html'); // Esto verifica que la URL incluya /inventory.html
  });

  // Caso de Prueba 2: Agregar todos los productos al carrito con standard_user (Usuario 1).
  it('Caso de Prueba 2: Agregando todos los productos al carrito del Usuario 1', () => {
    cy.iniciarSesion('standard_user', 'secret_sauce'); // Inicia sesión usando datos válidos.
    cy.agregarTodosLosProductos(); // Se agregan todos los productos al carrito.
    cy.get('.shopping_cart_badge').should('have.text', '6'); // Se verifica que el número de productos en el carrito sea '6'.
  });

  // Caso de Prueba 3: Validar el proceso de checkout con standard_user (Usuario 1).
  it('Caso de Prueba 3: Probando el proceso de checkout del Usuario 1', () => {
    cy.iniciarSesion('standard_user', 'secret_sauce'); // Inicia sesión usando datos válidos.
    cy.agregarTodosLosProductos(); // Agrega todos los productos al carrito.
    cy.irAlCarrito(); // Se dirige hacia el carrito de compras.
    cy.realizarCheckout('Jheremy Zaid', 'Lozano Tucto', '+511'); // Se realiza el checkout ingresando datos del usuario.
  });

  // Caso de Prueba 4: Verificación de validación de checkout con standard_user (Usuario 1).
  it('Caso de Prueba 4: Mostrando la validación de checkout del Usuario 1', () => {
    cy.iniciarSesion('standard_user', 'secret_sauce'); // Inicia sesión usando datos válidos.
    cy.agregarTodosLosProductos(); // Agrega todos los productos al carrito.
    cy.irAlCarrito(); // Se dirige hacia el carrito de compras.
    cy.realizarCheckout('Jannah Kiomi', 'Lozano Tucto', '+511'); // Se realiza el checkout.
    cy.get('[data-test=complete-header]').should('contain.text', 'Thank you'); // Esto verifica el mensaje de éxito.
  });

  // Caso de Prueba 5: Cerrar sesión con standard_user (Usuario 1)
  it('Caso de Prueba 5: Cerrando sesión del Usuario 1', () => {
    cy.iniciarSesion('standard_user', 'secret_sauce'); // Inicia sesión usando datos válidos.
    cy.cerrarSesion(); // Se cierra sesión.
    cy.url().should('eq', 'https://www.saucedemo.com/'); // Se verifica que la URL después de cerrar sesión sea la de la página de inicio de sesión.
  });
});

// Pruebas con el usuario problem_user (Usuario 2)

describe('Pruebas de la página de compras del Usuario 2', { testIsolation: false }, () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com'); // Con este bloque se ejecuta cada prueba.
  });

  // Caso de Prueba 1: Verificar inicio de sesión exitoso con problem_user (Usuario 2).
  it('Caso de Prueba 1: Inicio de sesión exitoso con user 2', () => {
    cy.iniciarSesion('problem_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  // Caso de Prueba 2: Agregar todos los productos al carrito con problem_user (Usuario 2).
  it('Caso de Prueba 2: Agregar todos los productos al carrito con user 2', () => {
    cy.iniciarSesion('problem_user', 'secret_sauce');
    cy.agregarTodosLosProductos().then((result) => {
      cy.log(`Productos agregados al carrito: ${result.addedProducts} de ${result.totalProducts}`);

      if (result.failedProducts.length > 0) {
        cy.log(`Productos que no se pudieron agregar: ${result.failedProducts.join(', ')}`);
      }

      // Hacer que la prueba falle si no se agregaron todos los productos
      expect(result.addedProducts).to.equal(result.totalProducts, `No se pudieron agregar todos los productos al carrito. Se agregaron ${result.addedProducts} de ${result.totalProducts}.`);
    });
  });

  // Caso de Prueba 3: Validar el proceso de checkout con problem_user (Usuario 2).
  it('Caso de Prueba 3: Proceso de checkout con user 2', () => {
    cy.iniciarSesion('problem_user', 'secret_sauce');
    cy.agregarTodosLosProductos();
    cy.irAlCarrito();
    cy.realizarCheckoutDos('Jessy', 'Tucto', '+511');
    // Validar que se muestra un mensaje de error al intentar completar el checkout
    cy.get('.error-message-container').should('be.visible').then(($errorContainer) => {
      const errorMessage = $errorContainer.text();
      if (!errorMessage.includes('Error')) {
        cy.log('Error: Mensaje de error esperado no encontrado en el checkout.');
        assert.fail('Error en el proceso de checkout con user 2.');
      }
    });
  });

  // Caso de Prueba 4: Verificación de validación de checkout con problem_user (Usuario 2).
  it('Caso de Prueba 4: Validación del checkout con user 2', () => {
    cy.iniciarSesion('problem_user', 'secret_sauce');
    cy.agregarTodosLosProductos();
    cy.irAlCarrito();
    cy.realizarCheckoutDos('Jessy', 'Tucto', '+511');
    // Validar que se muestra un mensaje de error al intentar completar el checkout
    cy.get('[data-test=error]').should('be.visible').then(($errorContainer) => {
      const errorMessage = $errorContainer.text();
      if (!errorMessage.includes('Error')) {
        cy.log('Error: Mensaje de error esperado no encontrado en el checkout.');
        assert.fail('Error en la validación del checkout con el user 2.');
      }
    });
  });

  // Caso de Prueba 5: Cerrar sesión con problem_user (Usuario 2)
  it('Caso de Prueba 5: Cerrar sesión con user 2', () => {
    cy.iniciarSesion('problem_user', 'secret_sauce');
    cy.cerrarSesion();
    cy.url().should('eq', 'https://www.saucedemo.com/');
  });
});
