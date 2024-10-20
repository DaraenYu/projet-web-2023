import axios from 'axios';
import { apiUrl } from './utility';

export async function fetchPosts() {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}