import React, { createContext, useContext, useState } from 'react';

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  company?: string;
  position?: string;
  photoUri?: string;
}

const defaultProfile: ProfileData = {
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean.dupont@email.com',
  phone: '06 12 34 56 78',
  address: '123 rue de la République',
  postalCode: '75001',
  city: 'Paris',
  company: 'Entreprise SARL',
  position: 'Développeur',
  photoUri: undefined,
};

interface ProfileContextProps {
  profile: ProfileData;
  setProfile: (data: ProfileData) => void;
}

const ProfileContext = createContext<ProfileContextProps>({
  profile: defaultProfile,
  setProfile: () => {},
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
