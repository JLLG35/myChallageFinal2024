
// Mis comandos personalizados

// Este Comando es para iniciar sesion con un nombre de usuario y una contraseña.

Cypress.Commands.add('iniciarSesion', (usuario, contraseña) => {
  cy.get('[data-test=username]').type(usuario);
  cy.get('[data-test=password]').type(contraseña);
  cy.get('[data-test=login-button]').click();
});

// Este comando permite agregar todos los productos al carrito

Cypress.Commands.add('agregarTodosLosProductos', () => {
  // Variables para contar productos añadidos y para registrar productos fallidos
  let addedProducts = 0;
  let failedProducts = [];
  
  // Esto obtiene todos los botones de agregar al carrito
  return cy.get('[data-test^=add-to-cart]').then($buttons => {
    const totalProducts = $buttons.length;
    
    // Esta funcion recursiva permite hacer clic en cada boton de agregar al carrito
    const clickButtons = (index) => {
      // Esto permite devolver el resultado
      if (index >= totalProducts) {
        return cy.wrap({ addedProducts, failedProducts, totalProducts });
      }
      
      // Obtener el boton actual y el nombre del producto
      const $button = $buttons.eq(index);
      const productName = $button.attr('id').replace('add-to-cart-', '');
      
      // Hace clic en el boton de agregar al carrito y esperar 1 segundo
      return cy.wrap($button)
        .click({ force: true })
        .wait(1000)
        .then(() => {
          // Esto verifica el numero actual de productos en el carrito
          return cy.get('.shopping_cart_badge').then($badge => {
            const currentCount = parseInt($badge.text() || '0');
            // Esto compara el numero actual con el numero de productos añadidos
            if (currentCount > addedProducts) {
              addedProducts = currentCount; // Reconteo de productos añadidos
              cy.log(`Producto agregado con éxito: ${productName}`); // Este es un log para exito
            } else {
              failedProducts.push(productName); // Registra los productos que fallaron en el conteo
              cy.log(`No se pudo agregar el producto: ${productName}`); // Este es un log para fallo
            }
            // Llamado recursivo para procesar el siguiente botón
            return clickButtons(index + 1);
          });
        });
    };
    
    // Se nicia la funcion recursiva desde el primer producto
    return clickButtons(0);
  });
});


// Este comando es para verificar el numero de productos en el carrito.

Cypress.Commands.add('verificarNumeroDeArticulos', (cantidadEsperada) =>{
  cy.get('.shopping_cart_badge').should('have.text', cantidadEsperada);
});

// Este comando es para navegar al carrito de compras.

Cypress.Commands.add('irAlCarrito', () => {
  cy.get('.shopping_cart_link').click();
});

// Este comando es para realizar el checkout con standard_user (Usuario 1).

Cypress.Commands.add('realizarCheckout', (nombre, apellido, codigoPostal) => {
  cy.get('[data-test=checkout]').click();
  cy.get('[data-test=firstName]').type(nombre);
  cy.get('[data-test=lastName]').type(apellido);
  cy.get('[data-test=postalCode]').type(codigoPostal);
  cy.get('[data-test=continue]').click();
  cy.get('[data-test=finish]').click();
});

// Este comando es para realizar el checkout con problem_user (Usuario 2).

Cypress.Commands.add('realizarCheckoutDos', (nombre, apellido, codigoPostal) => {
  cy.get('[data-test=checkout]').click();
  cy.get('[data-test=firstName]').type(nombre);
  cy.get('[data-test=lastName]').type(apellido);
  cy.get('[data-test=postalCode]').type(codigoPostal);
  cy.get('[data-test=continue]').click();
  
});

// Este comando es para cerrar la sesion.

Cypress.Commands.add('cerrarSesion', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').click();
});


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// 
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })