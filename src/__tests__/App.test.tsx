import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
  it('renders initial row and adds new one when AddButton clicked', () => {
    render(<App />);
    expect(screen.getAllByRole('textbox')).toHaveLength(1);
    
    fireEvent.click(screen.getByText(/Add/));
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
  });
});
