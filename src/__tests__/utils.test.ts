import { validateIp, lookupIp } from '../utils/utils';
import * as ipApi from '../utils/ipApi';

jest.mock('../utils/ipApi', () => ({
  fetchIpInfo: jest.fn(),
  getTimeInTimezone: jest.fn(),
}));

const mocked = ipApi as jest.Mocked<typeof ipApi>;

describe('utils', () => {
  describe('validateIp', () => {
    it('returns true for a valid IPv4 address', () => {
      expect(validateIp('192.168.0.1')).toBe(true);
    });

    it('returns false for invalid IPs', () => {
      expect(validateIp('999.999.999.999')).toBe(false);
      expect(validateIp('abc')).toBe(false);
    });
  });

  describe('lookupIp', () => {
    it('throws when value is empty', async () => {
      await expect(lookupIp('')).rejects.toThrow('no-value');
    });

    it('throws when ip is invalid', async () => {
      await expect(lookupIp('foo')).rejects.toThrow('invalid-ip');
    });

    it('returns data when ip is valid', async () => {
      mocked.fetchIpInfo.mockResolvedValue({
        country: 'Testland',
        countryCode: 'TL',
        timezone: 'UTC',
        flagUrl: 'url',
      });
      mocked.getTimeInTimezone.mockResolvedValue('12:00');

      const result = await lookupIp('1.2.3.4');
      expect(result).toEqual({
        country: 'Testland',
        timezone: 'UTC',
        flagUrl: 'url',
        time: '12:00',
      });
    });
  });
});
