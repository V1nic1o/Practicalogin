

describe('Registro de nuevo usuario', () => {
  it('Debería registrar usuario y redirigir al dashboard', () => {

    cy.intercept('POST', '**/api/auth/register').as('registroRequest');

    cy.visit('http://localhost:5173/register');

    cy.get('input[name="nombre"]').type('Usuario de Prueba');
    cy.get('input[name="correo"]').type(`usuario${Date.now()}@test.com`);
    cy.get('input[name="password"]').type('claveSegura123');
    cy.get('input[name="confirmarPassword"]').type('claveSegura123');

    cy.get('button[type="submit"]').click();

    cy.wait('@registroRequest').its('response.statusCode').should('eq', 201);

    cy.url().should('include', '/dashboard');

    cy.contains('¡Registro exitoso!').should('be.visible');
  });
});