import {
  Component,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import {
  ListLocationTree,
  DTOStructure,
  structure,
} from '../../../share/DTO/mock-data';
import { DrawerComponent } from '@progress/kendo-angular-layout';
import { ListItemModel } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-org-structure',
  templateUrl: './org-structure.component.html',
  styleUrls: ['./org-structure.component.scss'],
})
export class OrgStructureComponent implements AfterViewInit {
  // Variable Drawer \\
  @ViewChild('drawerRight') public DrawerRightComponent: DrawerComponent;
  expandedRight: boolean = false;
  items = ['Đang áp dụng'];
  titleDrawer: string = '';

  // Variable TreeList \\
  public rootData: DTOStructure[] = structure;
  buttonsForHeaderQueryData = [
    {
      text: 'THÊM MỚI ĐƠN VỊ',
      color: 'primary',
      imageUrl: 'assets/images/uflow.svg',
      height: undefined,
      width: undefined,
    },
    {
      text: 'THÊM MỚI ĐƠN VỊ CON',
      color: 'primary',
      selected: true,
      imageUrl: 'assets/images/uflow.svg',
      height: undefined,
      width: undefined,
    },
    {
      text: 'THÊM MỚI CHỨC DANH',
      color: 'primary',
      selected: true,
      imageUrl: 'assets/images/User.svg',
      height: undefined,
      width: undefined,
    },
  ];

  // Variable button DropListTool \\
  public popupClass: string = 'DropDownButton';
  public animate: boolean = false;
  OptionTool: ListItemModel[] = [
    { text: 'Chỉnh sửa', imageUrl: 'assets/images/pen_white.svg' },
    { text: 'Thêm mới đơn vị', imageUrl: 'assets/images/uflow.svg' },
    { text: 'Thêm mới đơn vị con', imageUrl: 'assets/images/uflow.svg' },
    { text: 'Thêm mới chức danh', imageUrl: 'assets/images/User.svg' },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log(this.rootData);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  // Treeview \\
  public fetchChildren = (item: DTOStructure): DTOStructure[] => {
    return item.contents;
  };

  public hasChildren = (item: DTOStructure): boolean => {
    return item.contents && item.contents.length > 0;
  };

  // DropListTool \\
  HandelOpenEdit(event: any) {
    if (event.text === 'Chỉnh sửa') {
      // Xử lý sự kiện khi click vào item "Chỉnh sửa"
      this.titleDrawer = 'THÔNG TIN CHỈNH SỬA';
      this.DrawerRightComponent.toggle();
    } else if (event.text === 'Thêm mới đơn vị') {
      // Xử lý sự kiện khi click vào item "Thêm mới đơn vị"
      this.titleDrawer = 'THÔNG TIN ĐƠN VỊ';
      this.DrawerRightComponent.toggle();
    } else if (event.text === 'Thêm mới đơn vị con') {
      // Xử lý sự kiện khi click vào item "Thêm mới đơn vị con"
      this.titleDrawer = 'THÔNG TIN ĐƠN VỊ CON';
      this.DrawerRightComponent.toggle();
    } else if (event.text === 'Thêm mới chức danh') {
      // Xử lý sự kiện khi click vào item "Thêm mới chức danh"
      this.titleDrawer = 'THÔNG TIN CHỨC DANH';
      this.DrawerRightComponent.toggle();
    }
  }
}
