import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadStoreroomComponent } from './read-storeroom.component';

describe('ReadStoreroomComponent', () => {
  let component: ReadStoreroomComponent;
  let fixture: ComponentFixture<ReadStoreroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadStoreroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadStoreroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
