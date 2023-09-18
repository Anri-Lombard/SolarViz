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

  // FIXME: some reason keeps failing
  // it('should display MoreDataDisplay component when data is available', () => {
  //   // Intercept and stub the API requests to return mock data
  //   cy.intercept('GET', 'http://localhost:8000/api/power_data/', { fixture: 'powerData.json'}).as('getPowerData');
  //   cy.intercept('GET', 'http://localhost:8000/api/water_data/', { fixture: 'waterData.json'}).as('getWaterData');
  
  //   cy.visit('http://localhost:3000/moreData');
  //   cy.wait(['@getPowerData', '@getWaterData']);
  
  //   // Ensure that the data has been loaded
  //   cy.get('p').should('not.exist');

  //   // Now check for the MoreDataDisplay component
  //   cy.get('[data-testid=moreDataDisplay]').should('exist');
  // });

  it('should display "Loading..." when data is not available', () => {
    // Intercept and stub the API requests to return empty arrays (no data)
    cy.intercept('GET', 'http://localhost:8000/api/power_data/', []).as('getPowerData');
    cy.intercept('GET', 'http://localhost:8000/api/water_data/', []).as('getWaterData');

    cy.visit('http://localhost:3000/moreData');
    cy.wait(['@getPowerData', '@getWaterData']);

    // Check for the "Loading..." message
    cy.get('p').contains("Loading...").should('exist');

    // Ensure that the MoreDataDisplay component does not exist
    cy.get('[data-testid=moreDataDisplay]').should('not.exist');
  });
});

describe('login Page', () => {
  it('should visit the login page', () => {
    cy.visit('http://localhost:3000/login');
  });

  it('should login successfully and redirect to admin page', () => {
    cy.visit('http://localhost:3000/login');

    // TODO: hide credentials
    cy.get('input[placeholder="Username"]').type('anrilombard');
    cy.get('input[placeholder="Password"]').type('anrispassword');
    
    cy.get('button.bg-green-700').click();
    
    // Wait for API response and check for token in local storage
    cy.window().its('localStorage').invoke('getItem', 'token').should('exist');
    
    // Check for redirection
    cy.url().should('include', '/login/admin');
  });

  it('should show error message for incorrect credentials', () => {
    cy.visit('http://localhost:3000/login');
    
    cy.get('input[placeholder="Username"]').type('wrong_username');
    cy.get('input[placeholder="Password"]').type('wrong_password');
    
    cy.get('button.bg-green-700').click();
    
    // Check for error message
    cy.get('.text-red-500').contains('Incorrect username or password. Try again.').should('exist');
  });
}
);

describe('Admin Page', () => {
  before(() => {
    // Simulate login and get the token
    cy.request({
      method: 'POST',
      url: 'http://localhost:8000/api-token-auth/',
      // TODO: remove credentials
      body: {
        username: 'anrilombard', // replace with the admin username
        password: 'anrispassword' // replace with the admin password
      },
    }).then((response) => {
      // Assuming the token is in the 'token' property of the response
      const token = response.body.token;

      // Save the token in local storage
      window.localStorage.setItem('token', token);
    });
  });

  it('should visit the admin page', () => {
    cy.visit('http://localhost:3000/login/admin');

    // Your assertions to make sure the page is correct and not redirected
    // Example: Check for an element that should be visible only for admins
    cy.get('[data-testid=adminPage]').should('exist');
  });

  it('should redirect to /login if not an admin', () => {
    // Remove the token to simulate a non-admin user
    window.localStorage.removeItem('token');

    // Visit the admin page
    cy.visit('http://localhost:3000/login/admin');

    // Check that the URL was changed to /login
    cy.url().should('include', '/login');
  });
});


describe('Manual Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/manual');
  });

  it('should visit the manual page', () => {
    cy.url().should('include', '/manual');
  });


  it('should display the Table of Contents', () => {
    cy.get('.tableOfContents').should('exist');
    cy.get('.tableOfContents').contains('About');
    cy.get('.tableOfContents').contains('More Data');
    cy.get('.tableOfContents').contains('Administration');
  });

  it('should display the About section', () => {
    cy.get('#about').should('exist');
    cy.get('#about').contains('SolarViz: Powering Sustainability at UCT D-Skool');
  });

  it('should display the More Data section', () => {
    cy.get('#moreData').should('exist');
    cy.get('#moreData').contains('Overview');
  });

  it('should display the Administration section', () => {
    cy.get('#administration').should('exist');
  });
});
