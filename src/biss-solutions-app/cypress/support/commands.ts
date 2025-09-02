/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>

      /**
       * Custom command to fill contact form
       * @example cy.fillContactForm({ name: 'John', email: 'john@test.com' })
       */
      fillContactForm(data: {
        fullName: string;
        email: string;
        phone: string;
        company?: string;
        subject: string;
        message: string;
      }): Chainable<void>

      /**
       * Custom command to check if element is visible in viewport
       * @example cy.isInViewport('.hero-section')
       */
      isInViewport(selector: string): Chainable<boolean>
    }
  }
}

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add('fillContactForm', (data) => {
  cy.get('[data-cy="contact-form"]').within(() => {
    cy.get('[data-cy="fullName"]').type(data.fullName)
    cy.get('[data-cy="email"]').type(data.email)
    cy.get('[data-cy="phone"]').type(data.phone)

    if (data.company) {
      cy.get('[data-cy="company"]').type(data.company)
    }

    cy.get('[data-cy="subject"]').type(data.subject)
    cy.get('[data-cy="message"]').type(data.message)
  })
})

Cypress.Commands.add('isInViewport', (selector) => {
  return cy.get(selector).then(($el) => {
    const rect = $el[0].getBoundingClientRect()
    const isInViewport = rect.top >= 0 && rect.left >= 0 &&
                        rect.bottom <= Cypress.$(window).height() &&
                        rect.right <= Cypress.$(window).width()
    return cy.wrap(isInViewport)
  })
})
