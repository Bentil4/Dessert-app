import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  formatCurrency(amount: number, currency: string = 'GH₵'): string {
    return `${currency}${amount.toFixed(2)}`;
  }

  calculateTotal(items: { quantity: number; price: number }[]): number {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  sanitizeInput(input: string): string {
    return input.replace(/[\n\r]/g, ' ').trim();
  }
}
