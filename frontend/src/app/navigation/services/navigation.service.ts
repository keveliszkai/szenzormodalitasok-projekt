import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NavigationService {
  public toggleNav: EventEmitter<boolean> = new EventEmitter<boolean>();
}
