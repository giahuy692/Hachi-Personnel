import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLayoutBlockComponent } from './grid-layout-block.component';

describe('GridLayoutBlockComponent', () => {
  let component: GridLayoutBlockComponent;
  let fixture: ComponentFixture<GridLayoutBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridLayoutBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridLayoutBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
