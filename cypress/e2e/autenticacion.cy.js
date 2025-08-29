// cypress/e2e/autenticacion.cy.js
describe('Autenticación - Login', () => {
  it('1. Usuario y contraseña válidos: debería iniciar sesión', () => {
    cy.visit('http://localhost:5173/')


    cy.get('input[name="correo"]').type('ev207570@gmail.com')


    cy.get('input[name="password"]').type('3ss+6GAQ')

 
    cy.get('button[type="submit"]').click()


    cy.url().should('include', '/dashboard')

  
    cy.contains('Bienvenido').should('exist') 
  })
})