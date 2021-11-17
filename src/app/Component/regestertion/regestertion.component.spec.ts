import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegestertionComponent } from './regestertion.component';

describe('RegestertionComponent', () => {
  let component: RegestertionComponent;
  let fixture: ComponentFixture<RegestertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegestertionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegestertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
