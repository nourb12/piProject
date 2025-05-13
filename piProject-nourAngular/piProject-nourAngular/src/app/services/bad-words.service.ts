import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BadWordsService {
  private badWords: string[] = ['badword1', 'badword2', 'badword3']; // Ajoute ici les mots interdits

  constructor() {}

  cleanText(text: string): string {
    let regex = new RegExp(this.badWords.join('|'), 'gi');
    return text.replace(regex, '****');
  }

  containsBadWords(text: string): boolean {
    return this.badWords.some(word => new RegExp(`\\b${word}\\b`, 'i').test(text));
  }
}
