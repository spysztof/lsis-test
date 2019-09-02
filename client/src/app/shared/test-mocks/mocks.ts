import { of } from 'rxjs';

export const ReportServiceMock = {
    filteredReports$: of([]),
    rawReports$: of([]),
    INITAL_FILTERS: {
        placeFormControl: null,
        dateFromFormControl: null,
        dateToFormControl: null,
    },
    getReports: () => { },
    filterReports: () => { },
}

export const HttpClientMock = jasmine.createSpyObj(
    'HttpClient',
    ['get', 'post']
)