describe('Autenticación - Contraseña incorrecta', () => {
  it('Contraseña incorrecta: debería mostrar mensaje de error', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[name="correo"]').type('ev207570@gmail.com');
    cy.get('input[name="password"]').type('contraseñaIncorrecta');
    cy.get('button[type="submit"]').click();

   
    cy.intercept('POST', '**/api/auth/login').as('loginRequest');

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);

  
    cy.contains('Correo o contraseña incorrectos').should('be.visible');
  });
});