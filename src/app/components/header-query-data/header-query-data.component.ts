import { Component, Input, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { IButton } from 'src/app/share/DTO';

@Component({
  selector: 'app-header-query-data',
  templateUrl: './header-query-data.component.html',
  styleUrls: ['./header-query-data.component.scss'],
})
export class HeaderQueryDataComponent implements OnInit {
  textSearch: string = '';
  faSearch = faSearch;

  @Input() buttons = [
    {
      text: 'THÊM ĐIỂM LÀM VIỆC',
      icon: 'k-i-clock',
      color: '#f0c505',
      imageUrl: 'assets/images/uflow.svg',
    },
    {
      text: 'THÊM ĐIỂM LÀM VIỆC CON',
      icon: 'k-i-check-circle',
      color: '#10b507',
      selected: true,
      imageUrl: 'assets/images/uflow.svg',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onKeyUp(event: any) {
    if (event.target.value === '') {
    }
  }

  handleReset() {}

  handleSearch() {}
}
