describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to different sections via menu', () => {
    // Test navigation to services
    cy.get('[data-cy="nav-services"]').click()
    cy.url().should('include', '#services')
    cy.get('[data-cy="services-section"]').should('be.visible')

    // Test navigation to clients
    cy.get('[data-cy="nav-clients"]').click()
    cy.url().should('include', '#clients')
    cy.get('[data-cy="clients-section"]').should('be.visible')

    // Test navigation to contact
    cy.get('[data-cy="nav-contact"]').click()
    cy.url().should('include', '#contact')
    cy.get('[data-cy="contact-section"]').should('be.visible')
  })

  it('should have working logo that navigates to home', () => {
    cy.get('[data-cy="nav-services"]').click()
    cy.get('[data-cy="logo"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should have mobile menu toggle', () => {
    cy.viewport(375, 667) // Mobile viewport

    // Check if mobile menu button exists
    cy.get('[data-cy="mobile-menu-toggle"]').should('be.visible')

    // Open mobile menu
    cy.get('[data-cy="mobile-menu-toggle"]').click()
    cy.get('[data-cy="mobile-menu"]').should('be.visible')

    // Close mobile menu
    cy.get('[data-cy="mobile-menu-close"]').click()
    cy.get('[data-cy="mobile-menu"]').should('not.be.visible')
  })

  it('should highlight active menu item', () => {
    cy.get('[data-cy="nav-services"]').click()
    cy.get('[data-cy="nav-services"]').should('have.class', 'active')

    cy.get('[data-cy="nav-clients"]').click()
    cy.get('[data-cy="nav-clients"]').should('have.class', 'active')
    cy.get('[data-cy="nav-services"]').should('not.have.class', 'active')
  })

  it('should have smooth scrolling to sections', () => {
    cy.get('[data-cy="nav-services"]').click()

    // Check if smooth scrolling is working
    cy.get('[data-cy="services-section"]').should('be.visible')
    cy.get('[data-cy="services-section"]').isInViewport().should('be.true')
  })

  it('should maintain navigation state on page refresh', () => {
    cy.get('[data-cy="nav-services"]').click()
    cy.reload()

    // Check if the section is still visible after refresh
    cy.get('[data-cy="services-section"]').should('be.visible')
  })

  it('should have proper keyboard navigation', () => {
    // Test tab navigation
    cy.get('body').tab()
    cy.focused().should('have.attr', 'data-cy', 'logo')

    cy.focused().tab()
    cy.focused().should('have.attr', 'data-cy', 'nav-services')

    // Test Enter key activation
    cy.focused().type('{enter}')
    cy.url().should('include', '#services')
  })

  it('should be accessible with screen readers', () => {
    // Check for proper ARIA labels
    cy.get('[data-cy="mobile-menu-toggle"]').should('have.attr', 'aria-label')
    cy.get('[data-cy="mobile-menu"]').should('have.attr', 'aria-hidden')

    // Check for proper navigation structure
    cy.get('[data-cy="main-navigation"]').should('have.attr', 'role', 'navigation')
  })
})
