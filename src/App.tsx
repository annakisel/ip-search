
import React from 'react';
import './App.scss';
import Header from './components/Header';
import AddButton from './components/AddButton';
import IpRow from './components/IpRow';
import { useState } from 'react';

const App: React.FC = () => {
  const [rowIds, setRowIds] = useState<number[]>([1]);
  const [nextId, setNextId] = useState<number>(2);

  const handleAdd = (): void => {
    setRowIds(prev => [...prev, nextId]);
    setNextId(prev => prev + 1);
  };

  return (
    <div className="ip-lookup-container">
      <Header />
      <div className="body">
        <div className="desc">Enter one or more IP addresses and get their country</div>
        <AddButton onClick={handleAdd} />
        <hr />
        {rowIds.map((id, idx) => (
          <IpRow key={id} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default App;
