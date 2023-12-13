import { render, screen } from '@testing-library/react';
import MiRTransitionPage from './pages/MiRTransitionPage';
import axios from 'axios';

// Mock axios for our tests
jest.mock('axios');

describe('MiRTransitionPage', () => {
  test('displays "Moving to location..." when MiR is moving', async () => {
    // Mock the API response to simulate MiR moving
    
    test('renders MiRTransitionPage component', () => {
      render(<MiRTransitionPage />);
      const element = screen.getByText(/test text inside component/i);
      expect(element).toBeInTheDocument();
    });
    
    
    axios.get.mockResolvedValue({
      data: {
        mission_text: 'Moving to location X',
        triggers: [false, false]
      }
    });

    render(<MiRTransitionPage />);
    const movingMessage = await screen.findByText(/Moving to location.../i);
    expect(movingMessage).toBeInTheDocument();
  });

  test('shows the map when triggers[1] is true', async () => {
    // Mock the API response to simulate triggers[1] condition being met
    axios.get.mockResolvedValue({
      data: {
        mission_text: 'Some status',
        triggers: [false, true] // Setting triggers[1] to true
      }
    });

    render(<MiRTransitionPage />);
    // Assuming you have a component or element that represents the map
    const mapElement = await screen.findByText(/Show Map or Instructions here/i);
    expect(mapElement).toBeInTheDocument();
  });
}); 
