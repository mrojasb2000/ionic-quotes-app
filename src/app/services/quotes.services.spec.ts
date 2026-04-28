import { QuotesService } from './quotes.services';
import { SqliteService } from './sqlite.services';
import { Quote } from '../models/quote.model';

describe('QuotesService', () => {
  let service: QuotesService;
  let sqliteSpy: jasmine.SpyObj<SqliteService>;

  beforeEach(() => {
    sqliteSpy = jasmine.createSpyObj<SqliteService>('SqliteService', [
      'initDB',
      'getQuotes',
      'addQuote',
      'deleteQuote',
    ]);

    service = new QuotesService(sqliteSpy);
  });

  it('should seed quotes when database has fewer than 5 records (happy path)', async () => {
    sqliteSpy.initDB.and.resolveTo();
    sqliteSpy.getQuotes.and.resolveTo([]);
    sqliteSpy.addQuote.and.resolveTo();

    await service.init();

    expect(sqliteSpy.initDB).toHaveBeenCalled();
    expect(sqliteSpy.addQuote).toHaveBeenCalledTimes(5);
    expect(sqliteSpy.getQuotes).toHaveBeenCalledTimes(2);
    expect(service.getAll().length).toBe(0);
  });

  it('should return null for getRandom when quotes list is empty (sad path)', () => {
    expect(service.getRandom()).toBeNull();
  });

  it('should add a quote and refresh list (happy path)', async () => {
    const quote: Quote = { text: 'Nueva cita', author: 'Autor' };

    sqliteSpy.addQuote.and.resolveTo();
    sqliteSpy.getQuotes.and.resolveTo([{ id: 1, text: 'Nueva cita', author: 'Autor' }]);

    await service.add(quote);

    expect(sqliteSpy.addQuote).toHaveBeenCalledWith(quote);
    expect(sqliteSpy.getQuotes).toHaveBeenCalled();
    expect(service.getAll().length).toBe(1);
  });

  it('should delete a quote and refresh list (happy path)', async () => {
    sqliteSpy.deleteQuote.and.resolveTo();
    sqliteSpy.getQuotes.and.resolveTo([]);

    await service.delete(1);

    expect(sqliteSpy.deleteQuote).toHaveBeenCalledWith(1);
    expect(sqliteSpy.getQuotes).toHaveBeenCalled();
  });
});
