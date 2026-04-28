import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, CapacitorSQLite } from '@capacitor-community/sqlite';

import { Quote } from '../models/quote.model';

@Injectable({ providedIn: 'root' })
export class SqliteService {
  sqlite = new SQLiteConnection(CapacitorSQLite);
  db: any;
  private readonly dbName = 'quotesDB';

  async initDB() {
    if (Capacitor.getPlatform() === 'web') {
      await this.sqlite.initWebStore();
    }

    const hasConnection = await this.sqlite.isConnection(this.dbName, false);
    this.db = hasConnection.result
      ? await this.sqlite.retrieveConnection(this.dbName, false)
      : await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);

    await this.db.open();

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        author TEXT NOT NULL
      );
    `);

    await this.persistWebStore();
  }

  private async persistWebStore() {
    if (Capacitor.getPlatform() === 'web') {
      await this.sqlite.saveToStore(this.dbName);
    }
  }

  async getQuotes() {
    const res = await this.db.query('SELECT * FROM quotes');
    return res.values || [];
  }

  async addQuote(q: Quote) {
    await this.db.run('INSERT INTO quotes (text, author) VALUES (?,?)', [q.text, q.author]);
    await this.persistWebStore();
  }

  async deleteQuote(id: number) {
    await this.db.run('DELETE FROM quotes WHERE id=?', [id]);
    await this.persistWebStore();
  }
}
