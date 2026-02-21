
import React from 'react';
import './App.scss';
import Header from './components/Header';
import AddButton from './components/AddButton';
import IpRow from './components/IpRow';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [rowIds, setRowIds] = useState<string[]>(() => [uuidv4()]);

  const handleAdd = (): void => {
    setRowIds(prev => [...prev, uuidv4()]);
  };

  return (
    <div className="ip-lookup-container">
      <Header />
      <div className="body">
        <div className="desc">Enter one or more IP addresses and get their country</div>
        <AddButton onClick={handleAdd} />
        <hr />
        {rowIds.map((id, index) => (
          <IpRow key={id} index={index} />
        ))}
      </div>
    </div>
  );
};

export default App;
