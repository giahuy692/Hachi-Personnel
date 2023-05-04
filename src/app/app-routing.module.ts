import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponComponent } from './pages/config/coupon/coupon.component';
import { LocationComponent } from './pages/personnel/location/location.component';
import { OrgStructureComponent } from './pages/personnel/org-structure/org-structure.component';

const routes: Routes = [
  { path: '', redirectTo: '/config/organizational', pathMatch: 'full' },
  { path: 'pessonnel/location', component: LocationComponent },
  { path: 'pessonnel/organizational', component: OrgStructureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
