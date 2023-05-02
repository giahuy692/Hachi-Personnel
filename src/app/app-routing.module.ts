import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponComponent } from './pages/config/coupon/coupon.component';
import { LocationComponent } from './pages/personnel/location/location.component';

const routes: Routes = [
  { path: '', redirectTo: '/config/coupon', pathMatch: 'full' },
  { path: 'config/coupon', component: CouponComponent },
  { path: 'pessonnel/location', component: LocationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
