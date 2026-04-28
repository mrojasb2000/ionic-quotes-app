import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { QuotesPage } from './quotes/quotes.page';
import { SettingsPage } from './settings/settings.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'quotes', component: QuotesPage },
  { path: 'settings', component: SettingsPage },
];
