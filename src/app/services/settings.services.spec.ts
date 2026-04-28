import { SettingsService } from './settings.services';
import { Preferences } from '@capacitor/preferences';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    service = new SettingsService();
  });

  it('should persist allowDelete setting (happy path)', async () => {
    const setSpy = spyOn(Preferences, 'set').and.resolveTo();

    await service.setDeleteEnabled(true);

    expect(setSpy).toHaveBeenCalledWith({ key: 'allowDelete', value: 'true' });
  });

  it('should return false when preference does not exist (sad path)', async () => {
    spyOn(Preferences, 'get').and.resolveTo({ value: null });

    const result = await service.getDeleteEnabled();

    expect(result).toBeFalse();
  });

  it('should parse stored preference value (happy path)', async () => {
    spyOn(Preferences, 'get').and.resolveTo({ value: 'true' });

    const result = await service.getDeleteEnabled();

    expect(result).toBeTrue();
  });
});
