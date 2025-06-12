import React, { createContext, useContext, useState } from 'react';

export interface HistoryItem {
  id: string;
  type: string;
  title: string;
  date: string;
  recipient: string;
  status: 'completed' | 'draft';
  rating?: number;
}

const defaultHistory: HistoryItem[] = [
  {
    id: '1',
    type: 'Résiliation',
    title: 'Résiliation abonnement téléphonique',
    date: '2024-01-15',
    recipient: 'Orange',
    status: 'completed',
    rating: 5,
  },
  {
    id: '2',
    type: 'Réclamation',
    title: 'Réclamation service client',
    date: '2024-01-10',
    recipient: 'SNCF Connect',
    status: 'completed',
    rating: 4.5,
  },
  {
    id: '3',
    type: 'Candidature',
    title: 'Candidature développeur web',
    date: '2024-01-08',
    recipient: 'TechCorp SARL',
    status: 'draft',
  },
];

interface HistoryContextProps {
  history: HistoryItem[];
  setHistory: (items: HistoryItem[]) => void;
}

const HistoryContext = createContext<HistoryContextProps>({
  history: defaultHistory,
  setHistory: () => {},
});

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>(defaultHistory);

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
