import { Injectable } from '@angular/core';
import { Quote } from '../models/quote.model';
import { SqliteService } from './sqlite.services';

@Injectable({ providedIn: 'root' })
export class QuotesService {
  private quotes: Quote[] = [];
  private readonly seedPool: Quote[] = [
    { text: 'El éxito es la suma de pequeños esfuerzos repetidos cada día.', author: 'Robert Collier' },
    { text: 'No cuentes los días, haz que los días cuenten.', author: 'Muhammad Ali' },
    { text: 'La disciplina es el puente entre metas y logros.', author: 'Jim Rohn' },
    { text: 'La mejor manera de predecir el futuro es crearlo.', author: 'Peter Drucker' },
    { text: 'Hazlo con pasión o no lo hagas.', author: 'Rosa Nouchette Carey' },
    { text: 'Empieza donde estás, usa lo que tienes, haz lo que puedas.', author: 'Arthur Ashe' },
    { text: 'Nunca es tarde para ser lo que podrías haber sido.', author: 'George Eliot' },
    { text: 'El progreso, no la perfección, es la meta.', author: 'Anónimo' },
    { text: 'La constancia vence lo que la dicha no alcanza.', author: 'Refrán español' },
    { text: 'Si puedes soñarlo, puedes lograrlo.', author: 'Walt Disney' },
  ];

  constructor(private sqlite: SqliteService) {}

  async init() {
    await this.sqlite.initDB();
    this.quotes = await this.sqlite.getQuotes();

    if (this.quotes.length < 5) {
      await this.seedRandomQuotes(5 - this.quotes.length);
      this.quotes = await this.sqlite.getQuotes();
    }
  }

  private async seedRandomQuotes(count: number) {
    const shuffled = [...this.seedPool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, this.seedPool.length));

    for (const quote of selected) {
      await this.sqlite.addQuote(quote);
    }
  }

  async refresh() {
    this.quotes = await this.sqlite.getQuotes();
  }

  getAll() {
    return this.quotes;
  }

  getRandom() {
    if (this.quotes.length === 0) return null;
    return this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }

  async add(q: Quote) {
    await this.sqlite.addQuote(q);
    await this.refresh();
  }

  async delete(id: number) {
    await this.sqlite.deleteQuote(id);
    await this.refresh();
  }
}
