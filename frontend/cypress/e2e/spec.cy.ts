describe('Home Page', () => {
  it('should visit the home page', () => {
    cy.visit('http://localhost:3000/');
  });

  it('should display DataDisplay component when data is available', () => {
    // Intercept and stub the API requests to return mock data
    cy.intercept('GET', 'http://localhost:8000/api/power_data/', { fixture: 'powerData.json'}).as('getPowerData');
    cy.intercept('GET', 'http://localhost:8000/api/water_data/', { fixture: 'waterData.json'}).as('getWaterData');
  
    cy.visit('http://localhost:3000/');
    cy.wait(['@getPowerData', '@getWaterData']);
  
    // Ensure that the data has been loaded
    cy.get('p').contains("Loading...").should('not.exist');

    // Now check for the DataDisplay component
    cy.get('[data-testid=dataDisplay]').should('exist');
  });

  it('should display "Loading..." when data is not available', () => {
    // Intercept and stub the API requests to return empty arrays (no data)
    cy.intercept('GET', 'http://localhost:8000/api/power_data/', []).as('getPowerData');
    cy.intercept('GET', 'http://localhost:8000/api/water_data/', []).as('getWaterData');

    cy.visit('http://localhost:3000/');
    cy.wait(['@getPowerData', '@getWaterData']);

    // Check for the "Loading..." message
    cy.get('p').contains("Loading...").should('exist');

    // Ensure that the DataDisplay component does not exist
    cy.get('[data-testid=dataDisplay]').should('not.exist');
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
