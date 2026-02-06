import { Injectable, inject } from '@angular/core';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private utilityService = inject(UtilityService);

  logAction(action: string, details?: string): void {
    const sanitized = this.utilityService.sanitizeInput(action);
    console.log(`[ACTION] ${sanitized}`, details ? this.utilityService.sanitizeInput(details) : '');
  }

  logError(error: string, details?: unknown): void {
    const sanitized = this.utilityService.sanitizeInput(error);
    console.error(`[ERROR] ${sanitized}`, details);
  }

  logInfo(message: string): void {
    const sanitized = this.utilityService.sanitizeInput(message);
    console.info(`[INFO] ${sanitized}`);
  }
}
