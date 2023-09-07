import React from 'react';
import { render, screen } from '@testing-library/react';
import DataDisplay from '../DataDisplay';

import {describe, expect, test} from '@jest/globals';

describe('DataDisplay Component', () => {
  test('should render LoadingSpinner when data is not available', () => {
    const mockSettings = {
      incomerPower: '#183d33',
      solarPower: '#b9544f',
      water: '#2779a7',
      pieChart: { sequence: 1, duration: 10, display: true },
      areaChart: { sequence: 2, duration: 10, display: true },
      lineChart: { sequence: 3, duration: 10, display: true },
    };
    render(
          <DataDisplay powerData={[]} waterData={[]} settings={mockSettings} />
    );
    expect(screen.getByTestId('loading-spinner')).toBeDefined();
  });

  // it('should render PieChartComponent when currentChart is PIE and aggregatedData is not null', () => {
  //   // Mock data
  //   const powerData = [{ /* your mock data */ }];
  //   const waterData = [{ /* your mock data */ }];
  //   const mockSettings = {
  //     incomerPower: '#183d33',
  //     solarPower: '#b9544f',
  //     water: '#2779a7',
  //     pieChart: { sequence: 1, duration: 10, display: true },
  //     areaChart: { sequence: 2, duration: 10, display: true },
  //     lineChart: { sequence: 3, duration: 10, display: true },
  //   };

  //   render(
  //     <SettingsContext.Provider value={{ settings: mockSettings, setSettings: jest.fn() }}>
  //       <DataContext.Provider value={{ powerData, waterData }}>
  //         <DataDisplay powerData={powerData} waterData={waterData} settings={mockSettings} />
  //       </DataContext.Provider>
  //     </SettingsContext.Provider>
  //   );
  //   expect(screen.getByTestId('pie-chart-component')).toBeInTheDocument();
  // });

  // Add more test cases as needed
});
