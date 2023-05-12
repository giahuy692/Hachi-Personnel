import {
  Component,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import {
  DepartmentDTO,
  ListDepartment,
  ListDataOrgStructureTree,
  ListPosition,
} from '../../../share/DTO/mock-data';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { DrawerComponent } from '@progress/kendo-angular-layout';
import { ListItemModel } from '@progress/kendo-angular-buttons';
import { Item } from 'src/app/share/DTO';
import { SelectableSettings } from '@progress/kendo-angular-treelist';
import { Observable, Subject, of } from 'rxjs';

@Component({
  selector: 'app-org-structure',
  templateUrl: './org-structure.component.html',
  styleUrls: ['./org-structure.component.scss'],
})
export class OrgStructureComponent implements AfterViewInit {
  // Variable Drawer \\
  @ViewChild('drawerRight') public DrawerRightComponent: DrawerComponent;
  expandedRight: boolean = false;
  itemsStatus: Array<Item> = [
    { value: 0, text: 'mới tạo' },
    { value: 1, text: 'Đang áp dụng' },
    { value: 2, text: 'Duyệt' },
    { value: 3, text: 'Ngừng hoạt động' },
  ];
  titleDrawer: string = '';

  StatusToggleDrawer: string = '';
  selectedItemStatus: Item = this.itemsStatus[0];

  // Define an array of all provinces
  provinces = [
    { id: 1, text: 'Tp. Hồ Chí Minh' },
    // Add other provinces here
  ];
  selectedProvinces = this.provinces[0];
  // Define an array of all districts of Ho Chi Minh City
  districts = [
    { id: 1, text: 'Quận 7', provinceId: 1 },
    { id: 2, text: 'Quận 1', provinceId: 1 },
    { id: 3, text: 'Quận 3', provinceId: 1 },
    { id: 4, text: 'Quận Gò Vấp', provinceId: 1 },
    { id: 5, text: 'Quận 9', provinceId: 1 },
    { id: 6, text: 'Phú Nhuận', provinceId: 1 },
    // Add other districts here
  ];
  selectedDistricts = this.districts[0];

  // Define an array of all wards of Ho Chi Minh City
  wards = [
    { id: 1, text: 'Phường Tân Phong', districtId: 1 },
    { id: 2, text: 'Phường Tân Thuận Đông', districtId: 1 },
    { id: 3, text: 'Phường Tân Thuận Tây', districtId: 1 },
    // Add other wards here
  ];
  selectedWards = this.wards[0];

  // Variable TreeList \\
  public rootData: ListDepartment[];
  DtoDepartment = new ListDepartment();
  DtoPosition = new ListPosition();

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

  // MultiSelect \\
  listItemsMultiSelect: Array<{ text: string; value: number }> = [
    { text: 'Giám đốc', value: 1 },
    { text: 'abc xyz', value: 2 },
  ];
  public value: any = [{ text: 'Giám đốc', value: 2 }];

  constructor(
    private cdr: ChangeDetectorRef,
    private serviceApi: ServiceAPIService
  ) {}

  ngOnInit(): void {
    this.rootData = ListDataOrgStructureTree.ObjectReturn;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  // app-header-query-data \\
  BtnOpenEdit(v: any) {
    if (v === 'THÊM MỚI ĐƠN VỊ') {
      // Xử lý sự kiện khi click vào item "Chỉnh sửa"
      this.titleDrawer = 'THÔNG TIN ĐƠN VỊ';
      this.StatusToggleDrawer = 'Thêm mới đơn vị';
      this.DrawerRightComponent.toggle();
    } else if (v === 'THÊM MỚI ĐƠN VỊ CON') {
      // Xử lý sự kiện khi click vào item "Thêm mới đơn vị"
      this.titleDrawer = 'THÔNG TIN ĐƠN VỊ CON';
      this.StatusToggleDrawer = 'Thêm mới đơn vị con';
      this.DrawerRightComponent.toggle();
    } else if (v === 'THÊM MỚI CHỨC DANH') {
      // Xử lý sự kiện khi click vào item "Thêm mới đơn vị con"
      this.titleDrawer = 'THÔNG TIN CHỨC DANH';
      this.StatusToggleDrawer = 'Thêm mới chức danh';
      this.DrawerRightComponent.toggle();
    }
  }

  // Treeview \\

  public fetchChildren = (dataitem: any): Observable<any[]> =>
    of(this.getListChildrenTreelist(dataitem));

  public hasChildren = (item: any): boolean => {
    if (item.hasOwnProperty('ListPosition')) {
      return (
        item.ListPosition.length > 0 || item.ListDepartment.length !== null
      );
    } else {
      return false;
    }
  };

  getListChildrenTreelist(dataItem: any) {
    let arr: any = [];

    if (dataItem.ListPosition) {
      arr = arr.concat(dataItem.ListPosition);
    }

    if (dataItem.ListDepartment) {
      arr = arr.concat(dataItem.ListDepartment);
    }

    return arr;
  }

  public settingsTreeList: SelectableSettings = {
    enabled: true,
    mode: 'row',
    multiple: true,
    drag: true,
    readonly: false,
  };

  selectedTreeList: any[] = [];

  getValueSelectedTreeList(DtoDepartment: any, DtoPosition: any): void {
    this.DtoDepartment = DtoDepartment;
    this.DtoPosition = DtoPosition;
    console.log('DtoDepartment: ', this.DtoDepartment);
    console.log('DtoPosition: ', this.DtoPosition);
  }

  checkTypeOfValue(value: any, typeCheck: any) {
    if (typeCheck === 'string') {
      return typeof value === 'string';
    } else if (typeCheck == 'number') {
      return typeof value === 'number';
    }
  }

  Openedpopup(event: any) {
    if (event === 'THÊM MỚI ĐƠN VỊ') {
      this.titleDrawer = 'THÔNG TIN ĐƠN VỊ';
      this.StatusToggleDrawer = 'Thêm mới đơn vị';
      this.selectedItemStatus = this.itemsStatus[this.DtoDepartment.StatusID];
      this.DrawerRightComponent.toggle();
    } else if (event === 'THÊM MỚI ĐƠN VỊ CON') {
      this.titleDrawer = 'THÔNG TIN ĐƠN VỊ CON';
      this.StatusToggleDrawer = 'Thêm mới đơn vị con';
      this.selectedItemStatus = this.itemsStatus[this.DtoDepartment.StatusID];
      this.DrawerRightComponent.toggle();
    } else if (event === 'THÊM MỚI CHỨC DANH') {
      this.titleDrawer = 'THÔNG TIN CHỨC DANH';
      this.StatusToggleDrawer = 'Thêm mới chức danh';
      this.selectedItemStatus = this.itemsStatus[this.DtoPosition.StatusID];

      this.DrawerRightComponent.toggle();
    }
  }
}
