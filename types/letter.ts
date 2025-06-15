export interface UserProfile {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  photoUri?: string;
}

export interface Recipient {
  company?: string;
  firstName?: string;
  lastName?: string;
  service?: string;
  email?: string;
  address: string;
  postalCode: string;
  city: string;
}

export interface Letter {
  id: string;
  type: LetterType;
  title: string;
  content: string;
  recipient: Recipient;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'completed';
}

export type LetterType =
  | 'resiliation'
  | 'reclamation'
  | 'demande'
  | 'candidature'
  | 'remerciement'
  | 'motivation'
  | 'excuse'
  | 'conge'
  | 'administrative'
  | 'commercial'
  | 'autres';

export interface LetterTypeInfo {
  type: LetterType;
  title: string;
  description: string;
  icon: string;
  color: string;
  fields: LetterField[];
}

export interface LetterField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface LetterRequest {
  userProfile: UserProfile;
  recipient: Recipient;
  letterType: LetterType;
  additionalInfo: Record<string, any>;
}

export interface Statistics {
  totalLetters: number;
  lettersByType: Record<LetterType, number>;
  recentActivity: {
    day: string;
    count: number;
  }[];
  monthlyGrowth: number;
}