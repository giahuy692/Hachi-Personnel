import {
  Component,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import {
  ListLocationDTO,
  ListLocationTree,
  LocationDTO,
  Address,
  mockAddress,
} from '../../../share/DTO/mock-data';
import { DrawerComponent } from '@progress/kendo-angular-layout';
import { ListItemModel } from '@progress/kendo-angular-buttons';
import { SelectableSettings } from '@progress/kendo-angular-treelist';
import { Item } from 'src/app/share/DTO';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements AfterViewInit {
  // Drawer \\
  @ViewChild('drawerRight') public DrawerRightComponent: DrawerComponent;
  expandedRight: boolean = false;
  itemsStatus: Array<Item> = [
    { value: 0, text: 'Tạo mới' },
    { value: 1, text: 'Chờ duyệt' },
    { value: 2, text: 'Đã duyệt' },
    { value: 3, text: 'Ngừng hiển thị' },
    { value: 4, text: 'Trả về' },
  ];
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

  // Variable treelist \\
  TreeListDto = new LocationDTO();
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

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  // Treelist \\
  public fetchChildren = (item: LocationDTO): LocationDTO[] => {
    return item.ListChild;
  };

  public hasChildren = (item: LocationDTO): boolean => {
    return item.ListChild && item.ListChild.length > 0;
  };

  public settingsTreeList: SelectableSettings = {
    enabled: true,
    mode: 'row',
    multiple: true,
    drag: true,
    readonly: false,
  };

  selectedTreeList: any[] = [];

  getValueSelectedTreeList(v: LocationDTO): void {
    this.TreeListDto = v;
  }

  // DropListTool \\
  HandelOpenEdit(event: any, data?: any) {
    if (event.text === 'Chỉnh sửa') {
      // Xử lý sự kiện khi click vào item "Chỉnh sửa"
      this.TreeListDto = data;
      this.selectedItemStatus = this.itemsStatus[data.StatusID];
      this.DrawerRightComponent.toggle();
    } else if (event.text === 'Thêm mới đơn vị') {
      // Xử lý sự kiện khi click vào item "Thêm mới đơn vị"
      this.TreeListDto = data;
      this.selectedItemStatus = this.itemsStatus[data.StatusID];
      this.DrawerRightComponent.toggle();
    } else if (event.text === 'Thêm mới đơn vị con') {
      // Xử lý sự kiện khi click vào item "Thêm mới đơn vị con"
      this.TreeListDto = data;
      this.selectedItemStatus = this.itemsStatus[data.StatusID];
      this.DrawerRightComponent.toggle();
    } else if (event.text === 'Thêm mới chức danh') {
      // Xử lý sự kiện khi click vào item "Thêm mới chức danh"
      this.TreeListDto = data;
      this.selectedItemStatus = this.itemsStatus[data.StatusID];
      this.DrawerRightComponent.toggle();
    }
  }

  Openedpopup(event: any) {
    if (event === 'THÊM ĐIỂM LÀM VIỆC') {
      this.selectedItemStatus = this.itemsStatus[this.TreeListDto.StatusID];
      this.DrawerRightComponent.toggle();
    } else if (event === 'THÊM ĐIỂM LÀM VIỆC CON') {
      this.selectedItemStatus = this.itemsStatus[this.TreeListDto.StatusID];
      this.DrawerRightComponent.toggle();
    }
  }
}
