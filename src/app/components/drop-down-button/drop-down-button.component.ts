import { Component, Input, OnInit } from '@angular/core';
import { ListItemModel } from '@progress/kendo-angular-buttons';
import { DrawerComponent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-drop-down-button',
  templateUrl: './drop-down-button.component.html',
  styleUrls: ['./drop-down-button.component.scss'],
})
export class DropDownButtonComponent implements OnInit {
  // DropDownButton \\
  @Input() DrawerRightRef: DrawerComponent;
  public animate: boolean = false;
  public popupClass: string = 'DropDownButton';
  OptionTool: ListItemModel[] = [
    { text: 'Chỉnh sửa', imageUrl: 'assets/images/pen_white.svg' },
    { text: 'Thêm mới đơn vị', imageUrl: 'assets/images/uflow.svg' },
    { text: 'Thêm mới đơn vị con', imageUrl: 'assets/images/uflow.svg' },
    { text: 'Thêm mới chức danh', imageUrl: 'assets/images/User.svg' },
  ];

  constructor() {}

  ngOnInit(): void {}

  HandelOpenEdit(event: any) {
    if (event.text === 'Chỉnh sửa') {
      // Xử lý sự kiện khi click vào item "Chỉnh sửa"
      this.DrawerRightRef.toggle();
    } else if (event.text === 'Thêm mới đơn vị') {
      // Xử lý sự kiện khi click vào item "Thêm mới đơn vị"
    } else if (event.text === 'Thêm mới đơn vị con') {
      // Xử lý sự kiện khi click vào item "Thêm mới đơn vị con"
    } else if (event.text === 'Thêm mới chức danh') {
      // Xử lý sự kiện khi click vào item "Thêm mới chức danh"
    }
  }
}
