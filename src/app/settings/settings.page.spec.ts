import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SettingsPage } from './settings.page';
import { SettingsService } from '../services/settings.services';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;
  let settingsServiceSpy: jasmine.SpyObj<SettingsService>;

  beforeEach(async () => {
    settingsServiceSpy = jasmine.createSpyObj<SettingsService>('SettingsService', [
      'getDeleteEnabled',
      'setDeleteEnabled',
    ]);

    await TestBed.configureTestingModule({
      imports: [SettingsPage],
      providers: [
        provideRouter([]),
        { provide: SettingsService, useValue: settingsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stored setting on enter (happy path)', async () => {
    settingsServiceSpy.getDeleteEnabled.and.resolveTo(true);

    await component.ionViewWillEnter();

    expect(settingsServiceSpy.getDeleteEnabled).toHaveBeenCalled();
    expect(component.allowDelete).toBeTrue();
  });

  it('should persist toggle changes (happy path)', async () => {
    settingsServiceSpy.setDeleteEnabled.and.resolveTo();
    const event = { detail: { checked: true } };

    await component.toggle(event);

    expect(component.allowDelete).toBeTrue();
    expect(settingsServiceSpy.setDeleteEnabled).toHaveBeenCalledWith(true);
  });

  it('should set allowDelete to false when toggle is unchecked (sad path)', async () => {
    settingsServiceSpy.setDeleteEnabled.and.resolveTo();
    const event = { detail: { checked: false } };

    await component.toggle(event);

    expect(component.allowDelete).toBeFalse();
    expect(settingsServiceSpy.setDeleteEnabled).toHaveBeenCalledWith(false);
  });
});
