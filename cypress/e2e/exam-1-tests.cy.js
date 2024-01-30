/// <reference types = "cypress"/>  

it('Test 1', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.container th:nth-child(2) a').first().click();
    cy.get('#studentUpdate').clear().type(110);
    //cy.get('.ACourse').should('contain', 'input');
    //cy.get('.ACourse').should('contain', 'label');
    cy.get('button').should('contain', 'Update');
    cy.get('button').should('contain', 'Update').click();
})