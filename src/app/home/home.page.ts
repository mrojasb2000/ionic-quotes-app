import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonCard, IonCardContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import { chatbubbleEllipsesOutline } from 'ionicons/icons';
import { Quote } from '../models/quote.model';
import { QuotesService } from '../services/quotes.services';
import { SettingsService } from '../services/settings.services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCard, IonHeader, IonToolbar, IonContent, IonIcon, RouterLink, RouterLinkActive],
})
export class HomePage {
  // public properties for template binding
  quote: Quote | null = null;
  allowDelete = false;

  constructor(private quotesService: QuotesService, private settings: SettingsService) {
    addIcons({ chatbubbleEllipsesOutline });
  }

  // Lifecycle hook to initialize data when the view is about to enter
  async ionViewWillEnter() {
    try {
      await this.quotesService.init();
      this.quote = this.quotesService.getRandom();
      this.allowDelete = await this.settings.getDeleteEnabled();
    } catch (error) {
      console.error('Error during HomePage ionViewWillEnter', error);
    }
  }

  // Method to delete the current quote and fetch a new random quote
  async delete() {
    if (this.quote?.id) {
      await this.quotesService.delete(this.quote.id);
      this.quote = this.quotesService.getRandom();
    }
  }
}
