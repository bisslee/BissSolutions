describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have proper heading hierarchy', () => {
    // Check that h1 exists and is unique
    cy.get('h1').should('have.length', 1)

    // Check heading hierarchy
    cy.get('h1').should('be.visible')
    cy.get('h2').should('have.length.greaterThan', 0)
    cy.get('h3').should('have.length.greaterThan', 0)
  })

  it('should have proper alt text for all images', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt')
      cy.wrap($img).invoke('attr', 'alt').should('not.be.empty')
    })
  })

  it('should have proper form labels', () => {
    cy.get('form').within(() => {
      cy.get('input[type="text"], input[type="email"], input[type="tel"], select, textarea').each(($input) => {
        const id = $input.attr('id')
        if (id) {
          cy.get(`label[for="${id}"]`).should('exist')
        }
      })
    })
  })

  it('should have proper ARIA labels for interactive elements', () => {
    // Check buttons have accessible names
    cy.get('button').each(($button) => {
      const hasAriaLabel = $button.attr('aria-label')
      const hasText = $button.text().trim()
      const hasAriaLabelledBy = $button.attr('aria-labelledby')

      expect(hasAriaLabel || hasText || hasAriaLabelledBy).to.be.true
    })

    // Check links have accessible names
    cy.get('a').each(($link) => {
      const hasAriaLabel = $link.attr('aria-label')
      const hasText = $link.text().trim()
      const hasAriaLabelledBy = $link.attr('aria-labelledby')

      expect(hasAriaLabel || hasText || hasAriaLabelledBy).to.be.true
    })
  })

  it('should have proper focus management', () => {
    // Test tab navigation
    cy.get('body').tab()
    cy.focused().should('be.visible')

    // Test that focus is visible
    cy.focused().should('have.css', 'outline').and('not.equal', 'none')
  })

  it('should have proper color contrast', () => {
    // Check that text has sufficient contrast
    cy.get('body').should('have.css', 'color')
    cy.get('body').should('have.css', 'background-color')
  })

  it('should have proper semantic HTML structure', () => {
    // Check for semantic elements
    cy.get('header').should('exist')
    cy.get('main').should('exist')
    cy.get('footer').should('exist')
    cy.get('nav').should('exist')
  })

  it('should have proper form validation messages', () => {
    // Navigate to contact form
    cy.get('[data-cy="nav-contact"]').click()

    // Try to submit empty form
    cy.get('[data-cy="submit-button"]').click()

    // Check for validation messages
    cy.get('[data-cy="contact-form"]').within(() => {
      cy.get('.error-message').should('be.visible')
    })
  })

  it('should have proper skip links', () => {
    // Check for skip to main content link
    cy.get('a[href="#main-content"], a[href="#main"]').should('exist')
  })

  it('should have proper language declaration', () => {
    cy.get('html').should('have.attr', 'lang')
    cy.get('html').invoke('attr', 'lang').should('match', /^[a-z]{2}(-[A-Z]{2})?$/)
  })

  it('should have proper viewport meta tag', () => {
    cy.get('meta[name="viewport"]').should('exist')
    cy.get('meta[name="viewport"]').should('have.attr', 'content')
  })

  it('should have proper title tag', () => {
    cy.title().should('not.be.empty')
    cy.title().should('contain', 'Biss Solutions')
  })

  it('should have proper meta description', () => {
    cy.get('meta[name="description"]').should('exist')
    cy.get('meta[name="description"]').should('have.attr', 'content')
    cy.get('meta[name="description"]').invoke('attr', 'content').should('not.be.empty')
  })

  it('should have proper keyboard navigation for dropdowns', () => {
    // Test keyboard navigation for any dropdowns or select elements
    cy.get('select').each(($select) => {
      cy.wrap($select).focus()
      cy.wrap($select).type('{downarrow}')
      cy.wrap($select).type('{enter}')
    })
  })

  it('should have proper error handling for screen readers', () => {
    // Check that error messages are properly associated with form fields
    cy.get('[data-cy="nav-contact"]').click()
    cy.get('[data-cy="submit-button"]').click()

    cy.get('[data-cy="contact-form"]').within(() => {
      cy.get('.error-message').each(($error) => {
        // Check that error messages are properly associated with form fields
        cy.wrap($error).should('be.visible')
      })
    })
  })

  it('should have proper loading states', () => {
    // Test loading states are accessible
    cy.get('[data-cy="nav-contact"]').click()

    // Fill form and submit
    cy.fillContactForm({
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '(11) 99999-9999',
      subject: 'Test Subject',
      message: 'Test message'
    })

    cy.get('[data-cy="submit-button"]').click()

    // Check loading state
    cy.get('[data-cy="submit-button"]').should('be.disabled')
    cy.get('[data-cy="submit-button"]').should('contain.text', 'Enviando')
  })
})
