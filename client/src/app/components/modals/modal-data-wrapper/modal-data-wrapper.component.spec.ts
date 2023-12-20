import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDataWrapperComponent } from './modal-data-wrapper.component';
import { BehaviorSubject } from 'rxjs';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalDataWrapperComponent', () => {
  let component: ModalDataWrapperComponent;
  let fixture: ComponentFixture<ModalDataWrapperComponent>;
  const modalDataServiceSpy = jasmine.createSpyObj('ModalDataService', [], {
    isLoading: new BehaviorSubject(false),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalDataWrapperComponent, NoopAnimationsModule],
      providers: [{ provide: ModalDataService, useValue: modalDataServiceSpy }],
    });
    fixture = TestBed.createComponent(ModalDataWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set isLoading', () => {
    component.ngOnInit();
    expect(component.isLoading).toEqual(modalDataServiceSpy.isLoading);
  });
});
