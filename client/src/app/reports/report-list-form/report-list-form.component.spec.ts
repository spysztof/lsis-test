import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListFormComponent } from './report-list-form.component';

describe('ReportListFormComponent', () => {
  let component: ReportListFormComponent;
  let fixture: ComponentFixture<ReportListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
