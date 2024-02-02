/// <reference types = "cypress"/>

it('Login', () => {
    cy.visit('http://localhost:8080/login');
    cy.get('#username').type('elisabet');
    cy.get('#password').type('Proov_123');
    cy.get('#login-button').click();
    cy.url().should('not.include', '/login');
});

it('add course', () => {
    cy.visit('http://localhost:8080/login');
    cy.get('#username').type('elisabet');
    cy.get('#password').type('Proov_123');
    cy.get('#login-button').click();
    cy.get('#courseName').type('New Course');
    cy.get('#add-course-button').click();
    cy.contains('New Course').should('exist');
});

describe('ACourse Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/login');
        cy.get('#username').type('elisabet');
        cy.get('#password').type('Proov_123');
        cy.get('#login-button').click();
        cy.get('.course-card').first().click();
        cy.url().should('include', '/acourse/');
    });

    it('displays course name', () => {
      cy.get('.course-header h1').should('exist');
    });
  
    it('adds a new task', () => {
      cy.get('.add-task input#taskName').type('New Task');
      cy.get('.add-task input#endDate').type('2024-12-31');
      cy.get('.add-task button').click();
  
      cy.get('.task-table tbody tr').should('have.length.greaterThan', 0);
    });
  
    it('crosses out a task', () => {
        cy.get('.task-table tbody tr:last-child td:last-child button:contains("Cross Out")').click();
        cy.wait(1000);
        cy.get('.task-table tbody tr:last-child td:first-child').should('have.css', 'text-decoration', 'line-through solid rgb(125, 53, 65)');
      });
      
      it('edits a task', () => {
        cy.get('.task-table tbody tr:last-child td:last-child button:contains("Edit")').click();
        cy.get('.task-table tbody tr:last-child input#description').type(' - Edited');
        cy.get('.task-table tbody tr:last-child input#end_date').clear().type('2025-01-01');
        cy.get('.task-table tbody tr:last-child td:last-child button:contains("Update")').click();
        cy.wait(1000);
      
        cy.get('.task-table tbody tr:last-child td:first-child').should('contain.text', 'New Task - Edited');
        cy.get('.task-table tbody tr:last-child td:nth-child(2)').should('contain.text', '2025-01-01');
      });
      
      it('deletes a task', () => {
        cy.get('.task-table tbody tr:last-child td:last-child button:contains("Delete")').click();
        cy.wait(1000);
        cy.get('.task-table tbody tr').should('have.length.lessThan', 1);
      });

      it('delete course', () => {
        cy.get('.delete-button').click();
        cy.url().should('not.include', '/acourse/');
        cy.get('.course-container').should('have.length.lessThan', 1);
      })
  });