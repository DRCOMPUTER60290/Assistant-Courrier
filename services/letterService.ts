import { Letter, LetterRequest, UserProfile, Statistics } from '@/types/letter';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL =
  process.env.API_BASE_URL ?? 'https://assistant-backend-yrbx.onrender.com';

class LetterService {
  async generateLetter(request: LetterRequest): Promise<string> {
    try {
      const { userProfile, recipient, letterType, additionalInfo } = request;

      const promptParts: string[] = [
        `Profil utilisateur : ${userProfile.firstName} ${userProfile.lastName}, ${userProfile.address}, ${userProfile.postalCode} ${userProfile.city}, ${userProfile.email}, ${userProfile.phone}`,
        `Destinataire : ${[
          recipient.company,
          recipient.service,
          recipient.firstName && recipient.lastName ? `${recipient.firstName} ${recipient.lastName}` : null
        ].filter(Boolean).join(', ')}, ${recipient.address}, ${recipient.postalCode} ${recipient.city}${recipient.email ? `, ${recipient.email}` : ''}`,
        `Type de courrier : ${letterType}`,
        `Informations supplémentaires : ${JSON.stringify(additionalInfo)}`,
      ];

      const prompt = promptParts.join('\n');

      const response = await fetch(`${API_BASE_URL}/api/generate-letter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data && typeof data.error === 'string'
          ? data.error
          : 'Erreur lors de la génération du courrier';
        throw new Error(message);
      }

      return data.content;
    } catch (error) {
      console.error('Erreur API:', error);
      throw new Error('Impossible de générer le courrier. Veuillez réessayer.');
    }
  }

  async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      const profileData = JSON.stringify(profile);
      await AsyncStorage.setItem('userProfile', profileData);
    } catch (error) {
      console.error('Erreur sauvegarde profil:', error);
      throw new Error('Impossible de sauvegarder le profil');
    }
  }

  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const profileData = await AsyncStorage.getItem('userProfile');
      return profileData ? (JSON.parse(profileData) as UserProfile) : null;
    } catch (error) {
      console.error('Erreur chargement profil:', error);
      return null;
    }
  }

  async saveLetters(letters: Letter[]): Promise<void> {
    try {
      const lettersData = JSON.stringify(letters);
      await AsyncStorage.setItem('letters', lettersData);
    } catch (error) {
      console.error('Erreur sauvegarde courriers:', error);
      throw new Error('Impossible de sauvegarder les courriers');
    }
  }

  async getLetters(): Promise<Letter[]> {
    try {
      const lettersData = await AsyncStorage.getItem('letters');
      if (!lettersData) {
        return [];
      }

      const parsed = JSON.parse(lettersData) as Array<
        Omit<Letter, 'createdAt' | 'updatedAt'> & {
          createdAt: string;
          updatedAt: string;
        }
      >;

      return parsed.map((letter) => ({
        ...letter,
        createdAt: new Date(letter.createdAt),
        updatedAt: new Date(letter.updatedAt),
      }));
    } catch (error) {
      console.error('Erreur chargement courriers:', error);
      return [];
    }
  }

  async getStatistics(): Promise<Statistics> {
    try {
      const letters = await this.getLetters();

      const totalLetters = letters.length;
      const lettersByType = letters.reduce((acc, letter) => {
        acc[letter.type] = (acc[letter.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const recentActivity = [
        { day: 'Lun', count: 2 },
        { day: 'Mar', count: 1 },
        { day: 'Mer', count: 3 },
        { day: 'Jeu', count: 0 },
        { day: 'Ven', count: 1 },
        { day: 'Sam', count: 0 },
        { day: 'Dim', count: 0 },
      ];

      return {
        totalLetters,
        lettersByType: lettersByType as any,
        recentActivity,
        monthlyGrowth: 15,
      };
    } catch (error) {
      console.error('Erreur statistiques:', error);
      return {
        totalLetters: 0,
        lettersByType: {},
        recentActivity: [],
        monthlyGrowth: 0,
      } as any;
    }
  }

  async deleteLetter(letterId: string): Promise<void> {
    try {
      const letters = await this.getLetters();
      const updatedLetters = letters.filter(letter => letter.id !== letterId);
      await this.saveLetters(updatedLetters);
    } catch (error) {
      console.error('Erreur suppression courrier:', error);
      throw new Error('Impossible de supprimer le courrier');
    }
  }
}

export const letterService = new LetterService();
