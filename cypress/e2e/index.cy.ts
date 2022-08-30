describe('Try as a guest link', () => {
    it('Navegate to intro', () => {
      cy.visit('http://localhost:3000');
      cy.findByRole("heading", { name: /next/i }).should("exist");
    });
  });