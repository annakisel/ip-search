
import React, { useState } from 'react';
import './IpRow.scss';
import { lookupIp } from '../utils/utils';

const IpRow: React.FC<{ index: number }> = ({ index }: { index: number }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [country, setCountry] = useState<string>();
  const [flagUrl, setFlagUrl] = useState<string>();
  const [time, setTime] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = async () => {
    setFlagUrl(undefined);
    setCountry(undefined);
    setError(undefined);

    if (!value) return;

    setLoading(true);

    try {
      const data = await lookupIp(value);

      setCountry(data.country);
      setFlagUrl(data.flagUrl);
      setTime(data.time);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'invalid-ip') {
        setError('Invalid IP address');
      } else {
        setError('Search failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ip-row">
      <span className="idx">{index + 1}</span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={loading}
        placeholder=""
      />
      {loading && <span className="loader" title="Searching..." />}
      {country && flagUrl && (
        <span className="country-info">
          <img src={flagUrl} alt={country} style={{ width: 24, marginLeft: 8 }} />
          {time && <span className="local-time">{time}</span>}
        </span>
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default IpRow;
