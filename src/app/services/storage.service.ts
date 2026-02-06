import { Injectable, inject } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private loggingService = inject(LoggingService);
  private readonly STORAGE_KEY = 'dessert-shop-cart';

  saveCart<T>(data: T): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      this.loggingService.logAction('Cart saved to localStorage');
    } catch (error) {
      this.loggingService.logError('Failed to save cart', error);
    }
  }

  loadCart<T>(): T | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        this.loggingService.logAction('Cart loaded from localStorage');
        return JSON.parse(data) as T;
      }
      return null;
    } catch (error) {
      this.loggingService.logError('Failed to load cart', error);
      return null;
    }
  }

  clearCart(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      this.loggingService.logAction('Cart cleared from localStorage');
    } catch (error) {
      this.loggingService.logError('Failed to clear cart', error);
    }
  }
}
