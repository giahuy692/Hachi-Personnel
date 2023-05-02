import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DrawerComponent } from '@progress/kendo-angular-layout';
import { ServiceAPIService } from 'src/app/services/service-api.service';

@Component({
  selector: 'app-drawer-right',
  templateUrl: './drawer-right.component.html',
  styleUrls: ['./drawer-right.component.scss'],
})
export class DrawerRightComponent implements OnInit {
  @ViewChild('drawerRight') public DrawerRightComponent: DrawerComponent;
  expandedRight: boolean = false;

  constructor(private serviceCallAPI: ServiceAPIService) {}

  ngOnInit(): void {}
}
