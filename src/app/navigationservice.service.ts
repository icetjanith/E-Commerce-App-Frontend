import { Injectable } from '@angular/core';
import { NavigationComponent } from './common/navigation/navigation.component';

@Injectable({
  providedIn: 'root'
})
export class NavigationserviceService {

  constructor() { }

  public avatarImg:boolean=false;
  public customerId='';
}
