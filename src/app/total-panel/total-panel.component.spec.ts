import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPanelComponent } from './total-panel.component';

describe('TotalPanelComponent', () => {
  let component: TotalPanelComponent;
  let fixture: ComponentFixture<TotalPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
