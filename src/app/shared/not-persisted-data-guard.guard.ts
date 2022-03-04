import { Injectable } from '@angular/core';
import {CanDeactivate, CanLoad} from '@angular/router';
import {BookDetailsComponent} from "../book/components/book-details/book-details.component";

@Injectable({
  providedIn: 'root'
})
export class NotPersistedDataGuardGuard implements CanDeactivate<BookDetailsComponent> {
  canDeactivate(component: BookDetailsComponent):  boolean  {

    if(!component.datapersisted){
      return confirm('Data nor persisted!')
    }

    return true;
  }

}
