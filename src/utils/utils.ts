import { fetchIpInfo, getTimeInTimezone } from './ipApi';

export function validateIp(ip: string): boolean {
  return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
}

export async function lookupIp(
  value: string
): Promise<{
  country: string;
  flagUrl: string;
  time: string;
  timezone: string;
}> {
  if (!value) {
    throw new Error('no-value');
  }

  if (!validateIp(value)) {
    throw new Error('invalid-ip');
  }

  const info = await fetchIpInfo(value);
  const time = await getTimeInTimezone(info.timezone);

  return {
    country: info.country,
    flagUrl: info.flagUrl,
    time,
    timezone: info.timezone,
  };
}
