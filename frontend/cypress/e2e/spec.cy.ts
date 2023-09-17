describe('Home Page', () => {
  it('should visit the home page', () => {
    cy.visit('http://localhost:3000/');
  });
});

describe('moreData Page', () => {
  it('should visit the moreData page', () => {
    cy.visit('http://localhost:3000/moreData');
  });
});

describe('login Page', () => {
  it('should visit the login page', () => {
    cy.visit('http://localhost:3000/login');
  });
}
);

describe('admin Page', () => {
  it('should visit the login page', () => {
    cy.visit('http://localhost:3000/login/admin');
  });
}
);

describe('manual Page', () => {
  it('should visit the manual page', () => {
    cy.visit('http://localhost:3000/manual');
  });
}
);
