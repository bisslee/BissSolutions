describe('Services Section', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display services section', () => {
    cy.get('[data-cy="services-section"]').should('be.visible')
    cy.get('[data-cy="services-title"]').should('contain.text', 'Nossos Serviços')
  })

  it('should display all service cards', () => {
    cy.get('[data-cy="service-cards"]').should('have.length.greaterThan', 0)

    // Check that each service card has required elements
    cy.get('[data-cy="service-cards"]').each(($card) => {
      cy.wrap($card).within(() => {
        cy.get('[data-cy="service-icon"]').should('be.visible')
        cy.get('[data-cy="service-title"]').should('be.visible')
        cy.get('[data-cy="service-description"]').should('be.visible')
        cy.get('[data-cy="service-features"]').should('be.visible')
      })
    })
  })

  it('should navigate to services section from menu', () => {
    cy.get('[data-cy="nav-services"]').click()
    cy.url().should('include', '#services')
    cy.get('[data-cy="services-section"]').should('be.visible')
  })

  it('should have hover effects on service cards', () => {
    cy.get('[data-cy="service-cards"]').first().trigger('mouseover')
    // Check for hover effects (transform, shadow, etc.)
    cy.get('[data-cy="service-cards"]').first().should('have.css', 'transform')
  })

  it('should be responsive on mobile devices', () => {
    cy.viewport(375, 667) // iPhone SE
    cy.get('[data-cy="services-section"]').should('be.visible')
    cy.get('[data-cy="service-cards"]').should('be.visible')
  })

  it('should be responsive on tablet devices', () => {
    cy.viewport(768, 1024) // iPad
    cy.get('[data-cy="services-section"]').should('be.visible')
    cy.get('[data-cy="service-cards"]').should('be.visible')
  })

  it('should have proper accessibility attributes', () => {
    cy.get('[data-cy="service-cards"]').each(($card) => {
      cy.wrap($card).should('have.attr', 'role', 'article')
      cy.wrap($card).within(() => {
        cy.get('[data-cy="service-title"]').should('have.attr', 'role', 'heading')
      })
    })
  })

  it('should display service features as list items', () => {
    cy.get('[data-cy="service-cards"]').first().within(() => {
      cy.get('[data-cy="service-features"]').within(() => {
        cy.get('li').should('have.length.greaterThan', 0)
      })
    })
  })

  it('should have consistent styling across service cards', () => {
    cy.get('[data-cy="service-cards"]').each(($card) => {
      cy.wrap($card).should('have.css', 'border-radius')
      cy.wrap($card).should('have.css', 'box-shadow')
      cy.wrap($card).should('have.css', 'padding')
    })
  })
})
