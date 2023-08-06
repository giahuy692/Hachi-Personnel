import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupToolComponent } from './popup-tool.component';

describe('PopupToolComponent', () => {
  let component: PopupToolComponent;
  let fixture: ComponentFixture<PopupToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
