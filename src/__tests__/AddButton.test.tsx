import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddButton from '../components/AddButton';

describe('<AddButton />', () => {
  it('renders with text and calls onClick', () => {
    const onClick = jest.fn();
    render(<AddButton onClick={onClick} />);
    expect(screen.getByText(/Add/)).toBeInTheDocument();
    
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
