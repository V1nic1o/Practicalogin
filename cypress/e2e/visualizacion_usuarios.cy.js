describe('Visualización de usuarios', () => {
  it('Debería mostrar los usuarios en la tabla correctamente', () => {
    
    cy.intercept('GET', '**/api/usuarios').as('usuariosRequest');

    cy.visit('http://localhost:5173/login');
    cy.get('input[name="correo"]').type('ev207570@gmail.com');
    cy.get('input[name="password"]').type('3ss+6GAQ');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');

    cy.wait('@usuariosRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);


    cy.contains('vinicio valdez').should('be.visible');
    cy.contains('ev207570@gmail.com').should('be.visible');

    cy.get('table').should('exist');
  });
});