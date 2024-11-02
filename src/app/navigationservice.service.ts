import { Injectable } from '@angular/core';
import { NavigationComponent } from './common/navigation/navigation.component';

@Injectable({
  providedIn: 'root'
})
export class NavigationserviceService {

  constructor(private navigation:NavigationComponent) { }

  public checkAvatarExists(){
    return this.navigation.showAvatar;
  }
}
