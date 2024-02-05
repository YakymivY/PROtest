import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudntComponent } from './studnt.component';

describe('StudntComponent', () => {
  let component: StudntComponent;
  let fixture: ComponentFixture<StudntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
