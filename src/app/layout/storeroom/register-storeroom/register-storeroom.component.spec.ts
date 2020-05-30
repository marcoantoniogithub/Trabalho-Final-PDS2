import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStoreroomComponent } from './register-storeroom.component';

describe('RegisterStoreroomComponent', () => {
  let component: RegisterStoreroomComponent;
  let fixture: ComponentFixture<RegisterStoreroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterStoreroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStoreroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
