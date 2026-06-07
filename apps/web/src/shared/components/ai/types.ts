export interface AISuggestion {

  id: string;

  title: string;

  description: string;

  prompt: string;
}

export interface AIAction {

  id: string;

  prompt: string;

  status:
    | 'pending'
    | 'completed'
    | 'failed';

  createdAt: string;
}