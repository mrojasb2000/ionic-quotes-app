import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  async setDeleteEnabled(value: boolean) {
    await Preferences.set({ key: 'allowDelete', value: JSON.stringify(value) });
  }

  async getDeleteEnabled(): Promise<boolean> {
    const { value } = await Preferences.get({ key: 'allowDelete' });
    return value ? JSON.parse(value) : false;
  }
}
