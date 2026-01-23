import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import type { ICartLine, CartState } from '../types/cart';
import { IProduct } from '../types/product';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _state$ = new BehaviorSubject<CartState>({ lines: [] });

  readonly state$ = this._state$.asObservable();
  readonly count$ = this.state$.pipe(map((s) => s.lines.reduce((sum, l) => sum + l.quantity, 0)));
  readonly total$ = this.state$.pipe(
    map((s) => s.lines.reduce((sum, l) => sum + l.quantity * l.product.price, 0)),
  );

  add(product: IProduct): void {
    const s = this._state$.value;
    const idx = s.lines.findIndex((l) => l.product.name === product.name);
    const updated: ICartLine[] =
      idx === -1
        ? [...s.lines, { product, quantity: 1 }]
        : s.lines.map((l, i) => (i === idx ? { ...l, quantity: l.quantity + 1 } : l));
    this._state$.next({ lines: updated });
  }

  remove(productName: string): void {
    const s = this._state$.value;
    this._state$.next({ lines: s.lines.filter((l) => l.product.name !== productName) });
  }

  setQuantity(productName: string, qty: number): void {
    const q = Number.isFinite(qty) && qty > 0 ? Math.floor(qty) : 1;
    const s = this._state$.value;
    this._state$.next({
      lines: s.lines.map((l) => (l.product.name === productName ? { ...l, quantity: q } : l)),
    });
  }

  clear(): void {
    this._state$.next({ lines: [] });
  }

  inCartQuantity(productName: string): number {
    const found = this._state$.value.lines.find((l) => l.product.name === productName);
    return found ? found.quantity : 0;
  }
}
