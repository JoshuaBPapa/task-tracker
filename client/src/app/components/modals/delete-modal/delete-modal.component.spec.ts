import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalComponent } from './delete-modal.component';
import { MessageService } from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeleteModalComponent, NoopAnimationsModule],
      providers: [MessageService],
    });
    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleConfirm should call confirmDelete.emit', () => {
    spyOn(component.confirmDelete, 'emit');
    component.handleConfirm();
    expect(component.confirmDelete.emit).toHaveBeenCalled();
  });

  it('handleCancel should call closeModal.emit', () => {
    spyOn(component.closeModal, 'emit');
    component.handleCancel();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });
});
