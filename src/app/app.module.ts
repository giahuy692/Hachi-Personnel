import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DropDownButtonComponent } from './components/drop-down-button/drop-down-button.component';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { LocationComponent } from './pages/personnel/location/location.component';
import { CouponComponent } from './pages/config/coupon/coupon.component';
import { GridLayoutBlockComponent } from './components/grid-layout-block/grid-layout-block.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TreeListModule } from '@progress/kendo-angular-treelist';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LabelModule } from '@progress/kendo-angular-label';
import { DrawerRightComponent } from './components/drawer-right/drawer-right.component';
import { OrgStructureComponent } from './pages/personnel/org-structure/org-structure.component';
import { HeaderQueryDataComponent } from './components/header-query-data/header-query-data.component';
import { PopupModule } from '@progress/kendo-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DatePickerComponent,
    DateTimePickerComponent,
    LocationComponent,
    CouponComponent,
    DropDownButtonComponent,
    GridLayoutBlockComponent,
    DrawerRightComponent,
    OrgStructureComponent,
    HeaderQueryDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    FormsModule,
    LayoutModule,
    TreeListModule,
    InputsModule,
    DateInputsModule,
    DropDownsModule,
    GridModule,
    NotificationModule,
    DialogsModule,
    LabelModule,
    PopupModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
