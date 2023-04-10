import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMemoriaComponent } from './tabla-memoria.component';

describe('TablaMemoriaComponent', () => {
  let component: TablaMemoriaComponent;
  let fixture: ComponentFixture<TablaMemoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaMemoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaMemoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
