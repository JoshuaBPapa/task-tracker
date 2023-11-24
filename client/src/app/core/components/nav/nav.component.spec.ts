import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavComponent],
    });
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onCloseMobileNavMenu should call closeMobileNavMenu.emit ', () => {
    spyOn(component.closeMobileNavMenu, 'emit');
    component.onCloseMobileNavMenu();
    expect(component.closeMobileNavMenu.emit).toHaveBeenCalled();
  });

  it('onLogout should call onCloseMobileNavMenu and logout.emit ', () => {
    spyOn(component, 'onCloseMobileNavMenu');
    spyOn(component.logout, 'emit');
    component.onLogout();
    expect(component.onCloseMobileNavMenu).toHaveBeenCalled();
    expect(component.logout.emit).toHaveBeenCalled();
  });
});
