import { fetchIpInfo, getTimeInTimezone } from '../utils/ipApi';

// we'll override global.fetch by casting to any in tests

describe('ipApi', () => {
  beforeEach(() => {
    (global as any).fetch = jest.fn();
  });

  it('fetchIpInfo returns transformed data', async () => {
    const fakeResponse = {
      ok: true,
      json: async () => ({
        data: {
          country: 'Wonderland',
          country_code: 'WL',
          timezone: 'GMT',
        },
      }),
    };
    ((global as any).fetch as jest.Mock).mockResolvedValue(fakeResponse);

    const result = await fetchIpInfo('1.2.3.4');
    expect(result.country).toBe('Wonderland');
    expect(result.flagUrl).toContain('wl.svg');
  });

  it('getTimeInTimezone returns a string even for invalid timezone', async () => {
    const t = await getTimeInTimezone('Invalid/Zone');
    expect(typeof t).toBe('string');
  });
});
