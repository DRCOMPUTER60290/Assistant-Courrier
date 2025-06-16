import { Letter, LetterRequest, UserProfile, Statistics } from '@/types/letter';
import { API_BASE_URL } from '@/utils/apiConfig';

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
      // await AsyncStorage.setItem('userProfile', profileData);
      console.log('Profil sauvegardé:', profileData);
    } catch (error) {
      console.error('Erreur sauvegarde profil:', error);
      throw new Error('Impossible de sauvegarder le profil');
    }
  }

  async getUserProfile(): Promise<UserProfile | null> {
    try {
      // const profileData = await AsyncStorage.getItem('userProfile');
      // return profileData ? JSON.parse(profileData) : null;

      return {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@email.com',
        phone: '06 12 34 56 78',
        address: '123 Rue de la République',
        postalCode: '75001',
        city: 'Paris',
      };
    } catch (error) {
      console.error('Erreur chargement profil:', error);
      return null;
    }
  }

  async saveLetters(letters: Letter[]): Promise<void> {
    try {
      const lettersData = JSON.stringify(letters);
      // await AsyncStorage.setItem('letters', lettersData);
      console.log('Courriers sauvegardés:', lettersData);
    } catch (error) {
      console.error('Erreur sauvegarde courriers:', error);
      throw new Error('Impossible de sauvegarder les courriers');
    }
  }

  async getLetters(): Promise<Letter[]> {
    try {
      // const lettersData = await AsyncStorage.getItem('letters');
      // return lettersData ? JSON.parse(lettersData) : [];

      return [
        {
          id: '1',
          type: 'resiliation',
          title: 'Résiliation contrat internet',
          content: 'Objet : Résiliation de contrat internet...',
          recipient: {
            company: 'Orange',
            service: 'Service Client',
            address: '1 Avenue du Service',
            postalCode: '75000',
            city: 'Paris',
          },
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15'),
          status: 'completed',
        },
        {
          id: '2',
          type: 'reclamation',
          title: 'Réclamation facture incorrecte',
          content: 'Objet : Contestation facture n°12345...',
          recipient: {
            company: 'EDF',
            service: 'Service Réclamations',
            address: '22 Avenue de Wagram',
            postalCode: '75008',
            city: 'Paris',
          },
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-10'),
          status: 'completed',
        },
        {
          id: '3',
          type: 'conge',
          title: 'Demande de congé annuel',
          content: 'Objet : Demande de congé du 01/08 au 15/08...',
          recipient: {
            company: 'ACME Corp',
            service: 'Ressources Humaines',
            address: '50 Rue Exemple',
            postalCode: '69000',
            city: 'Lyon',
          },
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date('2024-01-05'),
          status: 'completed',
        },
      ];
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
