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

  constructor() {}

  ngOnInit(): void {}

  onKeyUp(event: any) {
    if (event.target.value === '') {
    }
  }

  handleReset() {}

  handleSearch() {}
}
