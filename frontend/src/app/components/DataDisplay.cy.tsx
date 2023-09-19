import { mount } from '@cypress/react';
import DataDisplay from './DataDisplay';

describe('DataDisplay Component', () => {

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
      mount(<DataDisplay powerData={mockPowerData} waterData={mockWaterData} settings={mockSettings} />);
    });
  });

  it('should render PieChartComponent when aggregatedData is available', () => {
    cy.get('[data-testid=pieChart]').should('exist');
    cy.get('.heading').should('contain', 'Percentage Energy from Solar and Incomer');
  });

  it('should render StackedAreaChart when transformedData is available', () => {
    cy.wait(mockSettings.pieChart.duration * 1000); // Wait for the duration specified in settings
    cy.get('[data-testid=stackedAreaChart]').should('exist');
    cy.get('.heading').should('contain', 'Energy from Solar Power and Incomer Power');
  });

  it('should render StackedLineChart when waterData is available', () => {
    cy.wait((mockSettings.pieChart.duration + mockSettings.areaChart.duration) * 1000); // Wait for the duration specified in settings
    cy.get('[data-testid=stackedLineChart]').should('exist');
    cy.get('.heading').should('contain', 'Water Consumption on');
  });

  it('should display LoadingSpinner when data is not available', () => {
    // Remount the component with empty data to simulate "data not available" scenario
    mount(<DataDisplay powerData={[]} waterData={[]} settings={mockSettings} />);
    cy.get('[data-testid=loading-spinner]').should('exist');
  });
});
