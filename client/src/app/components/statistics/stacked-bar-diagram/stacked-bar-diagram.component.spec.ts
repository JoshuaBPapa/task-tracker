import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBarDiagramComponent } from './stacked-bar-diagram.component';

const mockData = {
  mock1: 1,
  mock2: 2,
  mock3: 3,
  mock4: 4,
};
const mockConfig = [
  {
    label: 'mock1',
    dataKey: 'mock1',
    colour: '#fff',
  },
  {
    label: 'mock2',
    dataKey: 'mock2',
    colour: '#fff',
  },
  {
    label: 'mock3',
    dataKey: 'mock3',
    colour: '#fff',
  },
  {
    label: 'mock4',
    dataKey: 'mock4',
    colour: '#fff',
  },
];

describe('StackedBarDiagramComponent', () => {
  let component: StackedBarDiagramComponent;
  let fixture: ComponentFixture<StackedBarDiagramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StackedBarDiagramComponent],
    });
    fixture = TestBed.createComponent(StackedBarDiagramComponent);
    component = fixture.componentInstance;
    component.data = mockData;
    component.config = mockConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call setTotal and setLabels', () => {
    spyOn(component, 'setTotal');
    spyOn(component, 'setLabels');
    component.ngOnInit();
    expect(component.setTotal).toHaveBeenCalled();
    expect(component.setLabels).toHaveBeenCalled();
  });

  it('setTotal should set the correct total', () => {
    component.setTotal();
    expect(component.total).toBe(10);
  });

  it('setLabels should set the correct labels', () => {
    const mockLabels = [
      {
        label: 'mock1',
        value: 1,
        colour: '#fff',
        proportion: (1 / 10) * 100,
      },
      {
        label: 'mock2',
        value: 2,
        colour: '#fff',
        proportion: (2 / 10) * 100,
      },
      {
        label: 'mock3',
        value: 3,
        colour: '#fff',
        proportion: (3 / 10) * 100,
      },
      {
        label: 'mock4',
        value: 4,
        colour: '#fff',
        proportion: (4 / 10) * 100,
      },
    ];

    component.setLabels();
    expect(component.labels).toEqual(mockLabels);
  });
});
