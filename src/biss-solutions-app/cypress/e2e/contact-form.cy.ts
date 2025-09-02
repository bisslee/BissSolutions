describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy="contact-form"]').should('be.visible')
  })

  it('should display all required form fields', () => {
    cy.get('[data-cy="fullName"]').should('be.visible')
    cy.get('[data-cy="email"]').should('be.visible')
    cy.get('[data-cy="phone"]').should('be.visible')
    cy.get('[data-cy="subject"]').should('be.visible')
    cy.get('[data-cy="message"]').should('be.visible')
    cy.get('[data-cy="submit-button"]').should('be.visible')
  })

  it('should validate required fields', () => {
    cy.get('[data-cy="submit-button"]').click()

    // Check for validation messages
    cy.get('[data-cy="fullName"]').should('have.attr', 'required')
    cy.get('[data-cy="email"]').should('have.attr', 'required')
    cy.get('[data-cy="phone"]').should('have.attr', 'required')
    cy.get('[data-cy="subject"]').should('have.attr', 'required')
    cy.get('[data-cy="message"]').should('have.attr', 'required')
  })

  it('should validate email format', () => {
    cy.get('[data-cy="email"]').type('email-invalido')
    cy.get('[data-cy="submit-button"]').click()

    // Check for email validation
    cy.get('[data-cy="email"]').should('have.attr', 'type', 'email')
  })

  it('should submit form with valid data', () => {
    cy.fixture('example').then((data) => {
      cy.fillContactForm(data.contactForm.validData)

      // Mock the API response
      cy.intercept('POST', '**/api/Contact/BissSolutions', {
        statusCode: 200,
        body: {
          message: 'Mensagem enviada com sucesso!',
          contactId: '12345'
        }
      }).as('submitContact')

      cy.get('[data-cy="submit-button"]').click()
      cy.wait('@submitContact')

      // Check for success message
      cy.get('[data-cy="success-message"]').should('be.visible')
    })
  })

  it('should handle form submission error', () => {
    cy.fixture('example').then((data) => {
      cy.fillContactForm(data.contactForm.validData)

      // Mock API error response
      cy.intercept('POST', '**/api/Contact/BissSolutions', {
        statusCode: 500,
        body: {
          message: 'Erro interno do servidor'
        }
      }).as('submitContactError')

      cy.get('[data-cy="submit-button"]').click()
      cy.wait('@submitContactError')

      // Check for error message
      cy.get('[data-cy="error-message"]').should('be.visible')
    })
  })

  it('should clear form after successful submission', () => {
    cy.fixture('example').then((data) => {
      cy.fillContactForm(data.contactForm.validData)

      cy.intercept('POST', '**/api/Contact/BissSolutions', {
        statusCode: 200,
        body: { message: 'Sucesso', contactId: '12345' }
      }).as('submitContact')

      cy.get('[data-cy="submit-button"]').click()
      cy.wait('@submitContact')

      // Check if form is cleared
      cy.get('[data-cy="fullName"]').should('have.value', '')
      cy.get('[data-cy="email"]').should('have.value', '')
      cy.get('[data-cy="phone"]').should('have.value', '')
      cy.get('[data-cy="subject"]').should('have.value', '')
      cy.get('[data-cy="message"]').should('have.value', '')
    })
  })

  it('should be accessible', () => {
    // Check for proper labels and ARIA attributes
    cy.get('[data-cy="fullName"]').should('have.attr', 'aria-label')
    cy.get('[data-cy="email"]').should('have.attr', 'aria-label')
    cy.get('[data-cy="phone"]').should('have.attr', 'aria-label')
    cy.get('[data-cy="subject"]').should('have.attr', 'aria-label')
    cy.get('[data-cy="message"]').should('have.attr', 'aria-label')

    // Check for proper form structure
    cy.get('[data-cy="contact-form"]').should('have.attr', 'role', 'form')
  })
})
