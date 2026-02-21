import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

describe('<Header />', () => {
  it('shows title and close button triggers callback', () => {
    const onClose = jest.fn();
    render(<Header onClose={onClose} />);
    expect(screen.getByText('IP Lookup')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('×'));
    expect(onClose).toHaveBeenCalled();
  });
});
