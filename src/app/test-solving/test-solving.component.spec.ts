import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSolvingComponent } from './test-solving.component';

describe('TestSolvingComponent', () => {
  let component: TestSolvingComponent;
  let fixture: ComponentFixture<TestSolvingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSolvingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSolvingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
