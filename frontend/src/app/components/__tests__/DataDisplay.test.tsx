import React from 'react';
import { render, screen } from '@testing-library/react';
import DataDisplay from '../DataDisplay';
import { DataContext } from '../../contexts/DataContext';
import { SettingsContext } from '../../contexts/SettingsContext';

describe('DataDisplay Component', () => {
  it('should render LoadingSpinner when data is not available', () => {
    const mockSettings = { /* your mock settings here */ };
    render(
      <SettingsContext.Provider value={{ settings: mockSettings, setSettings: jest.fn() }}>
        <DataContext.Provider value={{ powerData: [], waterData: [] }}>
          <DataDisplay powerData={[]} waterData={[]} settings={mockSettings} />
        </DataContext.Provider>
      </SettingsContext.Provider>
    );
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should render PieChartComponent when currentChart is PIE and aggregatedData is not null', () => {
    // Mock data
    const powerData = [{ /* your mock data */ }];
    const waterData = [{ /* your mock data */ }];
    const mockSettings = { /* your mock settings */ };

    render(
      <SettingsContext.Provider value={{ settings: mockSettings, setSettings: jest.fn() }}>
        <DataContext.Provider value={{ powerData, waterData }}>
          <DataDisplay powerData={powerData} waterData={waterData} settings={mockSettings} />
        </DataContext.Provider>
      </SettingsContext.Provider>
    );
    expect(screen.getByTestId('pie-chart-component')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
