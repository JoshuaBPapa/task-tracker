import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFooterButtonsComponent } from './modal-footer-buttons.component';

describe('ModalFooterButtonsComponent', () => {
  let component: ModalFooterButtonsComponent;
  let fixture: ComponentFixture<ModalFooterButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalFooterButtonsComponent],
    });
    fixture = TestBed.createComponent(ModalFooterButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onConfirm should call confirm.emit', () => {
    spyOn(component.confirm, 'emit');
    component.onConfirm();
    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('onCancel should call cancel.emit', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });
});
