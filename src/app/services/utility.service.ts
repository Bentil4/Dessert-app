import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  sanitizeInput(input: string): string {
    return input.replace(/[\n\r]/g, ' ').trim();
  }
}
