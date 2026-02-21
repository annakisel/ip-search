
import React from 'react';
import './App.scss';
import Header from './components/Header';
import AddButton from './components/AddButton';
import IpRow from './components/IpRow';
import { useState } from 'react';
import { IpRowData } from './components/IpRow';
import { validateIp, INITIAL_ROW } from './utils/utils';
import { fetchIpInfo, getTimeInTimezone } from './utils/ipApi';

const App: React.FC = () => {
  const [rows, setRows] = useState<IpRowData[]>([INITIAL_ROW]);
  const [nextId, setNextId] = useState<number>(2);

  const handleAdd = (): void => {
    setRows((prev: IpRowData[]) => [...prev, { id: nextId, value: '', loading: false }]);
    setNextId((prev: number) => prev + 1);
  };

  const handleChange = (id: number, value: string): void => {
    setRows((prev: IpRowData[]) => prev.map((row: IpRowData) =>
      row.id === id ? { ...row, value, error: undefined } : row
    ));
  };

  const handleBlur = async (id: number): Promise<void> => {
    setRows((prev: IpRowData[]) => prev.map((row: IpRowData) =>
      row.id === id ? { ...row, loading: true, error: undefined } : row
    ));

    const row = rows.find((r: IpRowData) => r.id === id);
    if (!row || !row.value) return;

    if (!validateIp(row.value)) {
      setRows((prev: IpRowData[]) => prev.map((r: IpRowData) =>
        r.id === id ? { ...r, loading: false, error: 'Invalid IP address' } : r
      ));
      return;
    }

      fetchIpInfo(row.value)
        .then(info =>
          getTimeInTimezone(info.timezone).then(time => ({ info, time }))
        )
        .then(({ info, time }) => {
          setRows((prev: IpRowData[]) => prev.map((r: IpRowData) =>
            r.id === id
              ? {
                  ...r,
                  loading: false,
                  country: info.country,
                  flagUrl: info.flagUrl,
                  time,
                  timezone: info.timezone,
                }
              : r
          ));
        })
        .catch(() => {
          setRows((prev: IpRowData[]) => prev.map((r: IpRowData) =>
            r.id === id ? { ...r, loading: false, error: 'Search failed' } : r
          ));
        });
  };

  return (
    <div className="ip-lookup-container">
      <Header />
      <div className="body">
        <div className="desc">Enter one or more IP addresses and get their country</div>
        <AddButton onClick={handleAdd} />
        <hr />
        {rows.map((row, idx) => (
          <IpRow
            key={row.id}
            row={row}
            index={idx}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
