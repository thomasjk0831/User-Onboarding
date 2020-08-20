

describe("Form App", ()=>{
   it("Can visit website", ()=> {
       cy.visit('http://localhost:3000')
   })

   it("can type 'name' into the input area", ()=> {
       cy.get('#name').type("Thomas")
       .should('have.value', 'Thomas')
   })

   it("can type 'email' into input area", ()=> {
      cy.get('#email').type("something@abc.com")
      .should('have.value', "something@abc.com" )
   })

   it("can type 'password' into input area", ()=> {
       cy.get('#password').type("somepassword")
       .should('have.value', "somepassword")
   })

   it("can check the terms checkbox", ()=> {
       cy.get('#terms').click()
       .should('have.value', "on")
   })

 


   
   it("can select a position", ()=> {
       cy.get('#position').select('Student')
       .should('not.have.value', '')
   })

   it("can submit the form data", ()=>{
       cy.get('button').click()

   })

   it("Check for form validation if an input is left empty", ()=>{
    cy.get('#name').should('not.have.value', '')
    cy.get('#email').should('not.have.value', '')
    cy.get('#password').should('not.have.value', '')
   })
})