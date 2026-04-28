import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonItem, IonToggle, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SettingsService } from '../services/settings.services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCard,
    IonToggle,
    IonItem,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
  ]
})
export class SettingsPage{

  // public properties for template binding
  allowDelete = false;

  constructor(private settings: SettingsService) {}

  // Lifecycle hook to initialize data when the view is about to enter
  async ionViewWillEnter() {
    this.allowDelete = await this.settings.getDeleteEnabled();
  }

  // Method to toggle the delete setting and persist it
  async toggle(ev: any) {
    this.allowDelete = ev.detail.checked;
    await this.settings.setDeleteEnabled(this.allowDelete);
  }

}
