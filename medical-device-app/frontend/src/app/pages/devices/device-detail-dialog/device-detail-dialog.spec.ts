import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDetailDialog } from './device-detail-dialog';

describe('DeviceDetailDialog', () => {
  let component: DeviceDetailDialog;
  let fixture: ComponentFixture<DeviceDetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceDetailDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceDetailDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
