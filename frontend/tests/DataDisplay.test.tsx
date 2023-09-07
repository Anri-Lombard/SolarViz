import React from 'react';
import { render, screen } from '@testing-library/react';
import DataDisplay from '../src/app/components/DataDisplay';  // Adjust the import to your file structure

describe('DataDisplay Component', () => {
  it('should render LoadingSpinner when data is not available', () => {
    render(<DataDisplay powerData={[]} waterData={[]} settings={{}} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should render PieChartComponent when currentChart is PIE and aggregatedData is not null', () => {
    // Mock data
    const powerData = [{ /* your mock data */ }];
    const waterData = [{ /* your mock data */ }];
    const settings = { /* your mock settings */ };

    render(<DataDisplay powerData={powerData} waterData={waterData} settings={settings} />);
    expect(screen.getByTestId('pie-chart-component')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
