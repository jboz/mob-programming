import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobersComponent } from './mobers.component';

describe('MobersComponent', () => {
  let component: MobersComponent;
  let fixture: ComponentFixture<MobersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
