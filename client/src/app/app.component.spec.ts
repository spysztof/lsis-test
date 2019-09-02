import { TestBed, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReportsModule } from './reports/reports.module';
import { HttpClientMock } from './shared/test-mocks/mocks';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,

      ],
      imports: [
        // FormsModule,
        // ReactiveFormsModule,
        ReportsModule,
        BsDatepickerModule.forRoot(),
      ],
      providers:[{provide: HttpClient, useValue: HttpClientMock}]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
