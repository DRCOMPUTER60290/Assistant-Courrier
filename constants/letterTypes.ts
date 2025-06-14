import { LetterTypeInfo } from '@/types/letter';

export const LETTER_TYPES: LetterTypeInfo[] = [
  {
    type: 'resiliation',
    title: 'Résiliation',
    description: 'Résilier un contrat, abonnement ou service',
    icon: 'X',
    color: '#ef4444',
    fields: [
      {
        key: 'contractType',
        label: 'Type de contrat',
        type: 'select',
        required: true,
        options: ['Internet', 'Téléphone', 'Assurance', 'Abonnement', 'Électricité/Gaz', 'Eau', 'Mutuelle', 'Banque', 'Autre'],
      },
      {
        key: 'contractNumber',
        label: 'Numéro de contrat',
        type: 'text',
        required: false,
        placeholder: 'Ex: 123456789',
      },
      {
        key: 'resiliationDate',
        label: 'Date de résiliation souhaitée',
        type: 'date',
        required: true,
      },
      {
        key: 'reason',
        label: 'Motif de résiliation',
        type: 'textarea',
        required: false,
        placeholder: 'Expliquez brièvement le motif...',
      },
    ],
  },
  {
    type: 'reclamation',
    title: 'Réclamation',
    description: 'Contester une facture ou signaler un problème',
    icon: 'AlertTriangle',
    color: '#f59e0b',
    fields: [
      {
        key: 'subject',
        label: 'Sujet de la réclamation',
        type: 'text',
        required: true,
        placeholder: 'Ex: Facture incorrecte, service défaillant...',
      },
      {
        key: 'referenceNumber',
        label: 'Numéro de référence',
        type: 'text',
        required: false,
        placeholder: 'N° facture, commande, contrat...',
      },
      {
        key: 'incidentDate',
        label: 'Date de l\'incident',
        type: 'date',
        required: false,
      },
      {
        key: 'description',
        label: 'Description détaillée',
        type: 'textarea',
        required: true,
        placeholder: 'Décrivez le problème rencontré...',
      },
      {
        key: 'expectedSolution',
        label: 'Solution attendue',
        type: 'textarea',
        required: false,
        placeholder: 'Quelle solution souhaitez-vous ?',
      },
    ],
  },
  {
    type: 'demande',
    title: 'Demande',
    description: 'Demander des informations ou documents',
    icon: 'FileQuestion',
    color: '#3b82f6',
    fields: [
      {
        key: 'requestType',
        label: 'Type de demande',
        type: 'select',
        required: true,
        options: [
          'Information',
          'Document',
          'Rendez-vous',
          'Remboursement',
          'Modification',
          'Attestation',
          'Certificat',
          'Devis',
          'Autre',
        ],
      },
      {
        key: 'subject',
        label: 'Objet de la demande',
        type: 'text',
        required: true,
        placeholder: 'Ex: Demande d\'attestation, information tarifaire...',
      },
      {
        key: 'details',
        label: 'Détails de la demande',
        type: 'textarea',
        required: true,
        placeholder: 'Précisez votre demande...',
      },
      {
        key: 'urgency',
        label: 'Urgence',
        type: 'select',
        required: false,
        options: ['Normale', 'Urgente', 'Très urgente'],
      },
    ],
  },
  {
    type: 'candidature',
    title: 'Candidature',
    description: 'Postuler pour un emploi ou stage',
    icon: 'Briefcase',
    color: '#8b5cf6',
    fields: [
      {
        key: 'position',
        label: 'Poste visé',
        type: 'text',
        required: true,
        placeholder: 'Ex: Développeur Web, Assistant commercial...',
      },
      {
        key: 'reference',
        label: 'Référence de l\'annonce',
        type: 'text',
        required: false,
        placeholder: 'Numéro ou référence de l\'offre',
      },
      {
        key: 'experience',
        label: 'Expérience pertinente',
        type: 'textarea',
        required: false,
        placeholder: 'Résumez votre expérience liée au poste...',
      },
      {
        key: 'motivation',
        label: 'Motivation',
        type: 'textarea',
        required: true,
        placeholder: 'Pourquoi ce poste vous intéresse-t-il ?',
      },
      {
        key: 'availability',
        label: 'Disponibilité',
        type: 'text',
        required: false,
        placeholder: 'Ex: Immédiate, à partir du 15/02...',
      },
    ],
  },
  {
    type: 'remerciement',
    title: 'Remerciement',
    description: 'Remercier pour un service ou une aide',
    icon: 'Heart',
    color: '#10b981',
    fields: [
      {
        key: 'occasion',
        label: 'Occasion',
        type: 'text',
        required: true,
        placeholder: 'Ex: Excellent service, aide précieuse...',
      },
      {
        key: 'details',
        label: 'Détails',
        type: 'textarea',
        required: true,
        placeholder: 'Expliquez ce pour quoi vous remerciez...',
      },
      {
        key: 'impact',
        label: 'Impact positif',
        type: 'textarea',
        required: false,
        placeholder: 'Comment cela vous a-t-il aidé ?',
      },
    ],
  },
  {
    type: 'motivation',
    title: 'Lettre de motivation',
    description: 'Lettre de motivation personnalisée',
    icon: 'Target',
    color: '#ec4899',
    fields: [
      {
        key: 'company',
        label: 'Nom de l\'entreprise',
        type: 'text',
        required: true,
        placeholder: 'Ex: Google, Microsoft...',
      },
      {
        key: 'position',
        label: 'Poste visé',
        type: 'text',
        required: true,
        placeholder: 'Ex: Chef de projet, Développeur...',
      },
      {
        key: 'sector',
        label: 'Secteur d\'activité',
        type: 'select',
        required: false,
        options: ['Informatique', 'Commerce', 'Santé', 'Éducation', 'Finance', 'Marketing', 'Industrie', 'Autre'],
      },
      {
        key: 'skills',
        label: 'Compétences clés',
        type: 'textarea',
        required: true,
        placeholder: 'Listez vos principales compétences...',
      },
      {
        key: 'achievements',
        label: 'Réalisations importantes',
        type: 'textarea',
        required: false,
        placeholder: 'Vos principales réalisations professionnelles...',
      },
    ],
  },
  {
    type: 'excuse',
    title: 'Excuse / Justificatif',
    description: 'Justifier une absence ou un retard',
    icon: 'Clock',
    color: '#f97316',
    fields: [
      {
        key: 'absenceType',
        label: 'Type d\'absence',
        type: 'select',
        required: true,
        options: ['Maladie', 'Rendez-vous médical', 'Urgence familiale', 'Transport', 'Autre'],
      },
      {
        key: 'date',
        label: 'Date concernée',
        type: 'date',
        required: true,
      },
      {
        key: 'duration',
        label: 'Durée',
        type: 'select',
        required: false,
        options: ['Quelques heures', 'Demi-journée', 'Journée complète', 'Plusieurs jours'],
      },
      {
        key: 'reason',
        label: 'Motif détaillé',
        type: 'textarea',
        required: true,
        placeholder: 'Expliquez la raison de votre absence...',
      },
      {
        key: 'documents',
        label: 'Documents joints',
        type: 'text',
        required: false,
        placeholder: 'Ex: Certificat médical, justificatif...',
      },
    ],
  },
  {
    type: 'conge',
    title: 'Demande de congé',
    description: 'Demander un congé ou une absence prolongée',
    icon: 'Plane',
    color: '#0d9488',
    fields: [
      {
        key: 'leaveType',
        label: 'Type de congé',
        type: 'select',
        required: true,
        options: ['Congé payé', 'Congé sans solde', 'Maladie', 'Maternité/Paternité', 'Autre'],
      },
      {
        key: 'startDate',
        label: 'Date de début',
        type: 'date',
        required: true,
      },
      {
        key: 'endDate',
        label: 'Date de fin',
        type: 'date',
        required: true,
      },
      {
        key: 'reason',
        label: 'Motif',
        type: 'textarea',
        required: false,
        placeholder: 'Indiquez le motif du congé...'
      },
      {
        key: 'contactDuringLeave',
        label: 'Contact pendant le congé',
        type: 'text',
        required: false,
        placeholder: 'Email ou téléphone en cas d\'urgence',
      },
    ],
  },
  {
    type: 'administrative',
    title: 'Démarche administrative',
    description: 'Courrier pour administrations et services publics',
    icon: 'Building',
    color: '#0ea5e9',
    fields: [
      {
        key: 'administration',
        label: 'Administration concernée',
        type: 'select',
        required: true,
        options: ['Mairie', 'Préfecture', 'CAF', 'Pôle Emploi', 'CPAM', 'Impôts', 'Autre'],
      },
      {
        key: 'requestType',
        label: 'Type de demande',
        type: 'select',
        required: true,
        options: ['Certificat', 'Attestation', 'Changement d\'adresse', 'Réclamation', 'Information', 'Autre'],
      },
      {
        key: 'subject',
        label: 'Objet précis',
        type: 'text',
        required: true,
        placeholder: 'Ex: Demande d\'acte de naissance...',
      },
      {
        key: 'details',
        label: 'Détails de la demande',
        type: 'textarea',
        required: true,
        placeholder: 'Précisez votre demande administrative...',
      },
      {
        key: 'urgency',
        label: 'Caractère urgent',
        type: 'select',
        required: false,
        options: ['Non', 'Oui - préciser le motif'],
      },
    ],
  },
  {
    type: 'commercial',
    title: 'Courrier commercial',
    description: 'Négociation, commande ou relation client',
    icon: 'ShoppingCart',
    color: '#84cc16',
    fields: [
      {
        key: 'commercialType',
        label: 'Type de courrier',
        type: 'select',
        required: true,
        options: ['Demande de devis', 'Négociation tarifaire', 'Commande', 'Réclamation SAV', 'Partenariat', 'Autre'],
      },
      {
        key: 'product',
        label: 'Produit/Service concerné',
        type: 'text',
        required: false,
        placeholder: 'Ex: Logiciel, formation, équipement...',
      },
      {
        key: 'quantity',
        label: 'Quantité/Volume',
        type: 'text',
        required: false,
        placeholder: 'Ex: 10 licences, 50 unités...',
      },
      {
        key: 'budget',
        label: 'Budget approximatif',
        type: 'text',
        required: false,
        placeholder: 'Ex: 5000€, à négocier...',
      },
      {
        key: 'details',
        label: 'Détails de la demande',
        type: 'textarea',
        required: true,
        placeholder: 'Précisez vos besoins commerciaux...',
      },
    ],
  },
  {
    type: 'autres',
    title: 'Autres',
    description: 'Courrier personnalisé pour toute autre situation',
    icon: 'Edit',
    color: '#64748b',
    fields: [
      {
        key: 'subject',
        label: 'Objet du courrier',
        type: 'text',
        required: true,
        placeholder: 'Précisez l\'objet de votre courrier...',
      },
      {
        key: 'content',
        label: 'Contenu souhaité',
        type: 'textarea',
        required: true,
        placeholder: 'Décrivez le contenu que vous souhaitez...',
      },
      {
        key: 'tone',
        label: 'Ton du courrier',
        type: 'select',
        required: false,
        options: ['Formel', 'Cordial', 'Ferme', 'Amical'],
      },
    ],
  },
];