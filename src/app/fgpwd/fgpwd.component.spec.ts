import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgpwdComponent } from './fgpwd.component';

describe('FgpwdComponent', () => {
  let component: FgpwdComponent;
  let fixture: ComponentFixture<FgpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
