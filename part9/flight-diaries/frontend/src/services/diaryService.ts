import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../../../backend/src/types';

const baseUrl = 'http://localhost:3000/api/diaries'

export const getDiaryEntries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const createEntry = (object:NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl,object)
    .then(response => response.data)
}