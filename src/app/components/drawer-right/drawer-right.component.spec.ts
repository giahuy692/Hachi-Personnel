import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerRightComponent } from './drawer-right.component';

describe('DrawerRightComponent', () => {
  let component: DrawerRightComponent;
  let fixture: ComponentFixture<DrawerRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
