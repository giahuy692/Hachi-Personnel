import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() selectedNav = new EventEmitter<string>();

  NavItems = [
    { text: 'CẤU HÌNH' },
    { text: 'MUA HÀNG' },
    { text: 'KHO HÀNG' },
    { text: 'ĐIỀU PHỐI' },
    { text: 'MARKETING' },
    { text: 'E-COMMERCE' },
    { text: 'KINH DOANH' },
    { text: 'NHÂN SỰ', selected: true },
    { text: 'BÁO CÁO' },
  ];

  constructor() {}
  ngOnInit() {
    for (let i = 0; i < this.NavItems.length; i++) {
      if (this.NavItems[i].selected == true) {
        this.selectedNav.emit(this.NavItems[i].text);
      }
    }
  }

  selected(v: string) {
    this.selectedNav.emit(v);
  }
}
