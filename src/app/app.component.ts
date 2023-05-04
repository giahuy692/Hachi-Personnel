import { Component, OnInit } from '@angular/core';
import {
  DrawerItem,
  DrawerSelectEvent,
  PanelBarItemModel,
} from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-test';

  // Variable Sidebar
  public showChildren: boolean = false;
  public selectedItem: number = 1;
  public expanded: boolean = false;
  public expandedRight: boolean = false;

  // Start: Variable Header \\
  valueSeletedNav: string = '';

  public items: Array<any> = [
    {
      text: 'KHUYẾN MÃI',
      icon: 'icon_coppy.png',
      selected: true,
      id: 0,
    },
    {
      text: 'NỘI DUNG WEBSITE',
      icon: 'icon_coppy.png',
      id: 1,
    },
    {
      text: 'QUẢN LÝ BANNER',
      icon: 'icon_coppy.png',
      id: 2,
    },
    {
      text: 'CHÍNH SÁCH',
      icon: 'icon_coppy.png',
      id: 3,
      child: [
        {
          text: 'Coupon',
          icon: '',
          parentId: 3,
          path: 'pessonnel/location',
        },
        {
          text: 'xxxxxxxxxx',
          icon: '',
          parentId: 3,
        },
        {
          text: 'xxxxxxxxxx',
          icon: '',
          parentId: 3,
        },
        {
          text: 'xxxxxxxxxx',
          icon: '',
          parentId: 3,
        },
        {
          text: 'xxxxxxxxxx',
          icon: '',
          parentId: 3,
        },
      ],
    },

    {
      text: 'BÁO CÁO EXCEL',
      icon: 'icon_coppy.png',
      id: 4,
      expanded: false,
    },
  ];

  // End: Variable Header \\

  ngOnInit(): void {}

  //start: Header
  getValueNav(v: string) {
    this.valueSeletedNav = v;

    if (this.valueSeletedNav == 'CẤU HÌNH') {
      this.items = [
        {
          text: 'KHUYẾN MÃI',
          icon: 'icon_coppy.png',
          selected: true,
          id: 0,
        },
        {
          text: 'NỘI DUNG WEBSITE',
          icon: 'icon_coppy.png',
          id: 1,
        },
        {
          text: 'QUẢN LÝ BANNER',
          icon: 'icon_coppy.png',
          id: 2,
        },
        {
          text: 'CHÍNH SÁCH',
          icon: 'icon_coppy.png',
          id: 3,
          child: [
            {
              text: 'Coupon',
              icon: '',
              path: 'config/coupon',

              parentId: 3,
            },
            {
              text: 'xxxxxxxxxx',
              icon: '',
              parentId: 3,
            },
            {
              text: 'xxxxxxxxxx',
              icon: '',
              parentId: 3,
            },
            {
              text: 'xxxxxxxxxx',
              icon: '',
              parentId: 3,
            },
            {
              text: 'xxxxxxxxxx',
              icon: '',
              parentId: 3,
            },
          ],
        },

        {
          text: 'BÁO CÁO EXCEL',
          icon: 'icon_coppy.png',
          id: 4,
          expanded: false,
        },
      ];
    }

    if (this.valueSeletedNav == 'NHÂN SỰ') {
      this.items = [
        {
          text: 'XXXX',
          icon: 'icon_coppy.png',
          id: 0,
        },
        {
          text: 'CƠ CẤU TỔ CHỨC',
          icon: 'icon_coppy.png',
          selected: true,
          id: 1,
          child: [
            {
              text: 'Cơ cấu tổ chức',
              icon: '',
              parentId: 3,
              path: 'pessonnel/organizational',
            },
            {
              text: 'Điểm làm việc',
              path: 'pessonnel/location',
              icon: '',
              parentId: 3,
            },
          ],
        },
        {
          text: 'XXXX',
          icon: 'icon_coppy.png',
          id: 2,
        },
        {
          text: 'XXXX',
          icon: 'icon_coppy.png',
          id: 3,
        },
      ];
    }
  }
  // end: Header

  // <- Drawer left
  //Handle  onSelectd in drawer left
  public onSelect(ev: DrawerSelectEvent): void {
    this.selectedItem = ev.item.id;
  }

  //Handle show children in drawer left
  toggleChildren() {
    this.showChildren = !this.showChildren;
  }

  //Handle expand change drawer left
  onExpandChange(e: boolean): void {
    if (e == false) {
      this.showChildren = false;
    }
  }
  // Drawer left ->

  items1: Array<PanelBarItemModel> = [
    <PanelBarItemModel>{
      title: 'Second item',
      children: [<PanelBarItemModel>{ title: 'Child item' }],
    },
  ];
}
