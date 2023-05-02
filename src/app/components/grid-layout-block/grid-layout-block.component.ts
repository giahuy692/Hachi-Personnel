import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Jquery
import * as $ from 'jquery';

//kendo
import { ColumnComponent, GridComponent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid-layout-block',
  templateUrl: './grid-layout-block.component.html',
  styleUrls: ['./grid-layout-block.component.scss'],
})
export class GridLayoutBlockComponent implements OnInit {
  @ContentChildren(ColumnComponent) columns: any;
  @ViewChild('cumstomGrid') public GridRef: GridComponent;
  @Input() dataView: Observable<any>;
  pageIndex: number = 1;
  skip: number = 0;
  limit: number = 20;
  limits: number[] = [10, 20, 50];
  selectedValue: number = 10;
  currentPage: number = 1;
  total_Pages: number = 0;
  public buttonCount = 4;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    $(document).ready(function () {
      // Runs after the DOM is loaded.
      $('.k-pager-first').html('<span>Đầu</span>');
      $('.pageSize .k-label').html('<span>Hiển thị mỗi trang</span>');
      $('.k_prev span:nth-child(2) ').html(
        '<img src="assets/images/chevronleft.svg" alt="chevronleft">'
      );
      $('.k_next span:first-child ').html(
        '<img src="assets/images/chevronright.svg" alt="chevronright">'
      );
      $('.k-pager-last').html('<span>Cuối</span>');
    });
  }

  ngAfterViewInit() {
    this.GridRef.columns.reset([
      this.GridRef.toolbarTemplateChildren.toArray(),
      this.columns.toArray(),
    ]);
    this.GridRef.autoFitColumns();
  }
}
