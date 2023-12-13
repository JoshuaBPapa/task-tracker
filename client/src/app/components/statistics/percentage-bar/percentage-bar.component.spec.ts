import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageBarComponent } from './percentage-bar.component';

describe('PercentageBarComponent', () => {
  let component: PercentageBarComponent;
  let fixture: ComponentFixture<PercentageBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PercentageBarComponent],
    });
    fixture = TestBed.createComponent(PercentageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setPercentage and setColour', () => {
    spyOn(component, 'setPercentage');
    spyOn(component, 'setColour');
    component.ngOnInit();
    expect(component.setPercentage).toHaveBeenCalled();
    expect(component.setColour).toHaveBeenCalled();
  });

  it('setPercentage should set the correct percentage', () => {
    component.value = 44;
    component.total = 100;
    component.setPercentage();
    expect(component.percentage).toBe(44);

    component.value = 25;
    component.total = 50;
    component.setPercentage();
    expect(component.percentage).toBe(50);
  });

  it('setColour should set the correct colour', () => {
    component.percentage = 10;
    component.setColour();
    expect(component.colour).toEqual('var(--red-500)');

    component.percentage = 50;
    component.setColour();
    expect(component.colour).toEqual('var(--orange-500)');

    component.percentage = 90;
    component.setColour();
    expect(component.colour).toEqual('var(--green-500)');

    component.invertColourValues = true;

    component.percentage = 10;
    component.setColour();
    expect(component.colour).toEqual('var(--green-500)');

    component.percentage = 50;
    component.setColour();
    expect(component.colour).toEqual('var(--orange-500)');

    component.percentage = 90;
    component.setColour();
    expect(component.colour).toEqual('var(--red-500)');
  });
});
