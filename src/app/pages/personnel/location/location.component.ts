import {
  Component,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ListLocationTree, LocationDTO } from '../../../share/DTO/mock-data';
import { DrawerComponent } from '@progress/kendo-angular-layout';
import { ListItemModel } from '@progress/kendo-angular-buttons';
import { Align } from '@progress/kendo-angular-popup';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements AfterViewInit {
  @ViewChild('drawerRight') public DrawerRightComponent: DrawerComponent;
  expandedRight: boolean = false;

  items = ['Đang áp dụng'];

  // Variable treeview \\
  ListLocationTree: any;
  ListLocationTreeView: any;
  public rootData: LocationDTO[] = ListLocationTree.ObjectReturn;

  // Variable header query data \\
  buttonsForHeaderQueryData = [
    {
      text: 'THÊM ĐIỂM LÀM VIỆC',
      color: 'primary',
      imageUrl: 'assets/images/uflow.svg',
      height: undefined,
      width: undefined,
    },
    {
      text: 'THÊM ĐIỂM LÀM VIỆC CON',
      color: 'primary',
      selected: true,
      imageUrl: 'assets/images/uflow.svg',
      height: undefined,
      width: undefined,
    },
  ];

  // Variable button DropListTool \\
  public animate: boolean = false;
  public popupClass: string = 'DropDownButton';
  OptionTool: ListItemModel[] = [
    { text: 'Chỉnh sửa', imageUrl: 'assets/images/pen_white.svg' },
    { text: 'Thêm mới đơn vị', imageUrl: 'assets/images/uflow.svg' },
    { text: 'Thêm mới đơn vị con', imageUrl: 'assets/images/uflow.svg' },
    { text: 'Thêm mới chức danh', imageUrl: 'assets/images/User.svg' },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ListLocationTreeView = ListLocationTree.ObjectReturn;
    this.ListLocationTree = ListLocationTree;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  // Treeview \\
  public fetchChildren = (item: LocationDTO): LocationDTO[] => {
    return item.ListChild;
  };

  public hasChildren = (item: LocationDTO): boolean => {
    return item.ListChild && item.ListChild.length > 0;
  };

  // DropListTool \\
  HandelOpenEdit(event: any) {
    if (event.text === 'Chỉnh sửa') {
      // Xử lý sự kiện khi click vào item "Chỉnh sửa"
      this.DrawerRightComponent.toggle();
    } else if (event.text === 'Thêm mới đơn vị') {
      // Xử lý sự kiện khi click vào item "Thêm mới đơn vị"
    } else if (event.text === 'Thêm mới đơn vị con') {
      // Xử lý sự kiện khi click vào item "Thêm mới đơn vị con"
    } else if (event.text === 'Thêm mới chức danh') {
      // Xử lý sự kiện khi click vào item "Thêm mới chức danh"
    }
  }
}
