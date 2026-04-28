import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { QuotesPage } from './quotes.page';
import { QuotesService } from '../services/quotes.services';

describe('QuotesPage', () => {
  let component: QuotesPage;
  let fixture: ComponentFixture<QuotesPage>;
  let quotesServiceSpy: jasmine.SpyObj<QuotesService>;

  beforeEach(async () => {
    quotesServiceSpy = jasmine.createSpyObj<QuotesService>('QuotesService', ['init', 'getAll', 'add', 'delete']);

    await TestBed.configureTestingModule({
      imports: [QuotesPage],
      providers: [
        provideRouter([]),
        { provide: QuotesService, useValue: quotesServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load quotes in ionViewWillEnter (happy path)', async () => {
    const quotes = [{ id: 1, text: 'Texto', author: 'Autor' }];
    quotesServiceSpy.init.and.resolveTo();
    quotesServiceSpy.getAll.and.returnValue(quotes);

    await component.ionViewWillEnter();

    expect(quotesServiceSpy.init).toHaveBeenCalled();
    expect(component.quotes).toEqual(quotes);
  });

  it('should add quote and refresh list when form is valid (happy path)', async () => {
    const quotes = [{ id: 2, text: 'Nueva frase', author: 'Ana' }];
    quotesServiceSpy.add.and.resolveTo();
    quotesServiceSpy.getAll.and.returnValue(quotes);
    component.form.setValue({ text: 'Nueva frase', author: 'Ana' });

    await component.add();

    expect(quotesServiceSpy.add).toHaveBeenCalledWith({ text: 'Nueva frase', author: 'Ana' });
    expect(component.quotes).toEqual(quotes);
    expect(component.form.value).toEqual({ text: null, author: null });
  });

  it('should not add quote when form is invalid (sad path)', async () => {
    component.form.setValue({ text: 'abc', author: '' });

    await component.add();

    expect(quotesServiceSpy.add).not.toHaveBeenCalled();
  });

  it('should delete quote and refresh list when id is defined (happy path)', async () => {
    quotesServiceSpy.delete.and.resolveTo();
    quotesServiceSpy.getAll.and.returnValue([]);

    await component.delete(7);

    expect(quotesServiceSpy.delete).toHaveBeenCalledWith(7);
    expect(component.quotes).toEqual([]);
  });

  it('should not delete quote when id is undefined (sad path)', async () => {
    await component.delete(undefined);

    expect(quotesServiceSpy.delete).not.toHaveBeenCalled();
  });
});
