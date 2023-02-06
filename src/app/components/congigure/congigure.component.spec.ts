import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongigureComponent } from './congigure.component';

describe('CongigureComponent', () => {
  let component: CongigureComponent;
  let fixture: ComponentFixture<CongigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongigureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
