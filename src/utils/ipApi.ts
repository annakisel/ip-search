// src/utils/ipApi.ts

export interface IpApiResult {
  country: string;
  countryCode: string;
  timezone: string;
  flagUrl: string;
}

export function fetchIpInfo(ip: string): Promise<IpApiResult> {
  const url = `https://ip-api.in/api/v1/ip/${ip}`;
  // use environment variable for token (set in .env)
  const token = process.env.IP_API_TOKEN || '';

  return fetch(url, {
   headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) throw new Error('API error');
      return response.json();
    })
    .then(json => {
      const data = json.data || json;

      if (!data.country || !data.country_code || !data.timezone) {
        throw new Error('Invalid IP or no data');
      }
      return {
        country: data.country,
        countryCode: data.country_code.toLowerCase(),
        timezone: data.timezone,
        flagUrl: `https://flagcdn.com/${data.country_code.toLowerCase()}.svg`,
      };
    });
}

export function getTimeInTimezone(timezone: string): Promise<string> {
  return new Promise(resolve => {
    try {
      resolve(new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: timezone }));
    } catch {
      resolve('');
    }
  });
}
