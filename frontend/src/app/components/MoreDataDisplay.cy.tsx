import MoreDataDisplay from './MoreDataDisplay';

describe('MoreDataDisplay Component', () => {

  let mockPowerData: any;
  let mockWaterData: any;
  let mockSettings: any;

  beforeEach(() => {
    // Load mock data from fixtures
    cy.fixture('powerData.json').then((data) => {
      mockPowerData = data;
    });
    cy.fixture('waterData.json').then((data) => {
      mockWaterData = data;
    });
    cy.fixture('settings.json').then((data) => {
      mockSettings = data;
    }).then(() => {
      // Mount the component with the loaded fixture data
      cy.mount(<MoreDataDisplay powerData={mockPowerData} waterData={mockWaterData} settings={mockSettings} />);
    });
  });

  it('should render MoreDataDisplay component correctly', () => {
    cy.get('[data-testid=moreDataDisplay]').should('exist');
  });

  it('should render PieChartComponent when aggregatedData is available', () => {
    cy.get('.heading').should('contain', 'Percentage Energy from Solar and Incomer');
  });

  it('should render StackedAreaChart when transformedData is available', () => {
    cy.get('.heading').should('contain', 'Energy from Solar and Incomer for Chosen Duration');
  });

  it('should render StackedLineChart when waterData is available', () => {
    cy.get('.heading').should('contain', 'Daily Water Consumption for Chosen Storeys and  Duration');
  });

  it('should display LoadingSpinner when data is not available', () => {
    // Remount the component with empty data to simulate "data not available" scenario
    cy.mount(<MoreDataDisplay powerData={[]} waterData={[]} settings={mockSettings} />);
    cy.get('[data-testid=loading-spinner]').should('exist');
  });

  // Additional tests for filters and settings
  it('should update PieChart settings when checkbox is clicked', () => {
    cy.get('input[type="checkbox"]').first().check();
    cy.get('.applyButton').first().click();
  });

  it('should update StackedAreaChart settings when filters are applied', () => {
    cy.get('select').eq(0).select('month');
    cy.get('.applyButton').eq(0).click();
  });

  it('should update StackedLineChart settings when filters are applied', () => {
    cy.get('select').eq(2).select('month');
    cy.get('.applyButton').eq(2).click();
  });
});
