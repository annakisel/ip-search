import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IpRow from '../components/IpRow';
import * as utils from '../utils/utils';

jest.mock('../utils/utils');
const mockedUtils = utils as jest.Mocked<typeof utils>;

describe('<IpRow />', () => {
  beforeEach(() => {
    mockedUtils.lookupIp.mockReset();
  });

  it('renders index and input', () => {
    render(<IpRow index={0} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles successful lookup on blur', async () => {
    mockedUtils.lookupIp.mockResolvedValue({
      country: 'Testland',
      flagUrl: 'url',
      time: '12:00',
      timezone: 'UTC',
    });

    render(<IpRow index={0} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '1.2.3.4' } });
    fireEvent.blur(input);

    await waitFor(() => expect(mockedUtils.lookupIp).toHaveBeenCalledWith('1.2.3.4'));

    expect(screen.getByRole('img', { name: 'Testland' })).toBeInTheDocument();
  });

  it('shows error for invalid ip', async () => {
    mockedUtils.lookupIp.mockRejectedValue(new Error('invalid-ip'));
    render(<IpRow index={0} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'foo' } });
    fireEvent.blur(input);

    await waitFor(() => screen.getByText('Invalid IP address'));
  });
});
