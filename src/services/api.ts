// src/services/api.ts
import { API_URL } from '@env';

export async function fetchMonCourrier(params: any) {
  const response = await fetch(`${API_URL}/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!response.ok) {
    throw new Error(`Erreur ${response.status}`);
  }
  return response.json();
}
