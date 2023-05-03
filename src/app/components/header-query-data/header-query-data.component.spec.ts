import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderQueryDataComponent } from './header-query-data.component';

describe('HeaderQueryDataComponent', () => {
  let component: HeaderQueryDataComponent;
  let fixture: ComponentFixture<HeaderQueryDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderQueryDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderQueryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
