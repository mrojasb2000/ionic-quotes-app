import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomePage } from './home.page';
import { QuotesService } from '../services/quotes.services';
import { SettingsService } from '../services/settings.services';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let quotesServiceSpy: jasmine.SpyObj<QuotesService>;
  let settingsServiceSpy: jasmine.SpyObj<SettingsService>;

  beforeEach(async () => {
    quotesServiceSpy = jasmine.createSpyObj<QuotesService>('QuotesService', ['init', 'getRandom', 'delete']);
    settingsServiceSpy = jasmine.createSpyObj<SettingsService>('SettingsService', ['getDeleteEnabled']);

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideRouter([]),
        { provide: QuotesService, useValue: quotesServiceSpy },
        { provide: SettingsService, useValue: settingsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load quote and settings in ionViewWillEnter (happy path)', async () => {
    const quote = { id: 1, text: 'Texto', author: 'Autor' };
    quotesServiceSpy.init.and.resolveTo();
    quotesServiceSpy.getRandom.and.returnValue(quote);
    settingsServiceSpy.getDeleteEnabled.and.resolveTo(true);

    await component.ionViewWillEnter();

    expect(quotesServiceSpy.init).toHaveBeenCalled();
    expect(component.quote).toEqual(quote);
    expect(component.allowDelete).toBeTrue();
  });

  it('should keep default state when init fails (sad path)', async () => {
    const consoleErrorSpy = spyOn(console, 'error');
    quotesServiceSpy.init.and.rejectWith(new Error('boom'));

    await component.ionViewWillEnter();

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(component.quote).toBeNull();
    expect(component.allowDelete).toBeFalse();
  });

  it('should delete current quote and refresh random quote (happy path)', async () => {
    component.quote = { id: 10, text: 'A', author: 'B' };
    const nextQuote = { id: 11, text: 'C', author: 'D' };
    quotesServiceSpy.delete.and.resolveTo();
    quotesServiceSpy.getRandom.and.returnValue(nextQuote);

    await component.delete();

    expect(quotesServiceSpy.delete).toHaveBeenCalledWith(10);
    expect(component.quote).toEqual(nextQuote);
  });

  it('should not delete when quote has no id (sad path)', async () => {
    component.quote = { text: 'A', author: 'B' };

    await component.delete();

    expect(quotesServiceSpy.delete).not.toHaveBeenCalled();
  });
});
