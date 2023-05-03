import { Component, OnInit, ViewChild } from '@angular/core';
import { ListLocationTree, LocationDTO } from '../../../share/DTO/mock-data';
import { DrawerComponent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @ViewChild('drawerRight') public DrawerRightComponent: DrawerComponent;
  expandedRight: boolean = false;

  items = ['Đang áp dụng'];

  // Variable treeview \\
  ListLocationTree: any;
  ListLocationTreeView: any;

  constructor() {}

  ngOnInit(): void {
    this.ListLocationTreeView = ListLocationTree.ObjectReturn;
    this.ListLocationTree = ListLocationTree;
  }

  public rootData: LocationDTO[] = ListLocationTree.ObjectReturn;

  public fetchChildren = (item: LocationDTO): LocationDTO[] => {
    return item.ListChild;
  };

  public hasChildren = (item: LocationDTO): boolean => {
    return item.ListChild && item.ListChild.length > 0;
  };
}
