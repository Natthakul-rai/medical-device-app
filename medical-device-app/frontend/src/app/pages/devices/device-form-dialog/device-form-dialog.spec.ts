import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceFormDialog } from './device-form-dialog';

describe('DeviceFormDialog', () => {
  let component: DeviceFormDialog;
  let fixture: ComponentFixture<DeviceFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
