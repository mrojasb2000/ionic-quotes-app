import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButton, IonItem, IonList, IonInput, IonCardContent, IonCard, IonIcon } from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import { trashOutline, documentTextOutline } from 'ionicons/icons';
import { Quote } from '../models/quote.model';
import { QuotesService } from '../services/quotes.services';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonButton,
    IonInput,
    IonContent,
    IonHeader,
    IonToolbar,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
  ]
})
export class QuotesPage {
  // public properties for template binding
  quotes: Quote[] = [];
  form: FormGroup;

  // inject services and initialize form
  constructor(private qs: QuotesService, private fb: FormBuilder) {
    addIcons({ trashOutline, documentTextOutline });
    this.form = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      author: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  // Lifecycle hook to initialize data when the view is about to enter
  async ionViewWillEnter() {
    await this.qs.init();
    this.quotes = this.qs.getAll();
  }

  // Method to add a new quote and refresh the list
  async add() {
    if (this.form.valid) {
      await this.qs.add(this.form.value);
      this.form.reset();
      this.quotes = this.qs.getAll();
    }
  }

  // Method to delete a quote by id and refresh the list
  async delete(id: number | undefined) {
    if (id === undefined) {
      return;
    }

    await this.qs.delete(id);
    this.quotes = this.qs.getAll();
  }

}
