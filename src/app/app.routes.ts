import { Routes } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { AllitemsComponent } from './common/allitems/allitems.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { CartComponent } from './common/cart/cart.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'all-items',
        component:AllitemsComponent
    },
    {
        path:'cart',
        component:CartComponent
    },
    {
        path:'user-dashboard/:userId',
        component:UserdashboardComponent
    },
    {
        path:'admin-dashboard/:userId',
        component:AdmindashboardComponent
    }
];
