import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDataWrapperComponent } from './modal-data-wrapper.component';

describe('ModalDataWrapperComponent', () => {
  let component: ModalDataWrapperComponent;
  let fixture: ComponentFixture<ModalDataWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalDataWrapperComponent],
    });
    fixture = TestBed.createComponent(ModalDataWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
