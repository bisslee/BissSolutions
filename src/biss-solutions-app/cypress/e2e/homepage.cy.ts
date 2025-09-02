describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('body').should('be.visible')
  })

  it('should display the main navigation', () => {
    cy.get('[data-cy="main-navigation"]').should('be.visible')
    cy.get('[data-cy="logo"]').should('be.visible')
  })

  it('should display hero section', () => {
    cy.get('[data-cy="hero-section"]').should('be.visible')
    cy.get('[data-cy="hero-title"]').should('contain.text', 'Biss Solutions')
  })

  it('should display services section', () => {
    cy.get('[data-cy="services-section"]').should('be.visible')
    cy.get('[data-cy="service-cards"]').should('have.length.greaterThan', 0)
  })

  it('should display clients section', () => {
    cy.get('[data-cy="clients-section"]').should('be.visible')
    cy.get('[data-cy="client-cards"]').should('have.length.greaterThan', 0)
  })

  it('should display footer', () => {
    cy.get('[data-cy="footer"]').should('be.visible')
    cy.get('[data-cy="footer-links"]').should('be.visible')
  })

  it('should be responsive on mobile', () => {
    cy.viewport(375, 667) // iPhone SE
    cy.get('[data-cy="main-navigation"]').should('be.visible')
    cy.get('[data-cy="hero-section"]').should('be.visible')
  })

  it('should be responsive on tablet', () => {
    cy.viewport(768, 1024) // iPad
    cy.get('[data-cy="main-navigation"]').should('be.visible')
    cy.get('[data-cy="hero-section"]').should('be.visible')
  })
})
