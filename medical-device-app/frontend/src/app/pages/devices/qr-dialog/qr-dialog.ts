import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-qr-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="qr-dialog">
      <h2 mat-dialog-title>QR Code - {{ data.deviceCode }}</h2>
      <mat-dialog-content>
        <div class="qr-container">
          <div #qrContainer></div>
          <p class="device-info">
            <strong>รหัสอุปกรณ์:</strong> {{ data.deviceCode }}<br>
            <strong>ชื่อ:</strong> {{ data.deviceName }}<br>
            <strong>สถานะ:</strong> {{ data.deviceStatus }}
          </p>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="downloadQR()">
          <mat-icon>download</mat-icon>
          ดาวน์โหลด QR Code
        </button>
        <button mat-button mat-dialog-close>ปิด</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .qr-dialog {
      padding: 20px;
    }

    .qr-container {
      text-align: center;
      padding: 20px 0;
    }

    .qr-container canvas {
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-bottom: 16px;
    }

    .device-info {
      text-align: left;
      background: #f5f5f5;
      padding: 12px;
      border-radius: 6px;
      margin-top: 16px;
      font-size: 14px;
    }
  `]
})
export class QrDialogComponent {
  @ViewChild('qrContainer', { static: true }) qrContainer!: ElementRef;
  qrCodeDataUrl: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    deviceCode: string;
    deviceName: string;
    deviceStatus: string;
  }) {}

  ngOnInit() {
    this.generateQRCode();
  }

  private generateQRCode(): void {
    // QR Code payload with device information
    const payload = JSON.stringify({
      type: 'medical_device',
      code: this.data.deviceCode,
      name: this.data.deviceName,
      timestamp: new Date().toISOString()
    });

    // Import QRCode library dynamically
    import('qrcode').then((QRCode) => {
      QRCode.toDataURL(payload, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      .then((url: string) => {
        this.qrCodeDataUrl = url;

        // Create image element and append to container
        const img = document.createElement('img');
        img.src = url;
        img.style.width = '256px';
        img.style.height = '256px';
        img.style.border = '1px solid #ddd';
        img.style.borderRadius = '8px';

        // Clear container and append image
        this.qrContainer.nativeElement.innerHTML = '';
        this.qrContainer.nativeElement.appendChild(img);
      })
      .catch((error: any) => {
        console.error('Error generating QR code:', error);
        this.qrContainer.nativeElement.innerHTML = '<p>เกิดข้อผิดพลาดในการสร้าง QR Code</p>';
      });
    }).catch(err => {
      console.error('Failed to load QRCode library:', err);
      this.qrContainer.nativeElement.innerHTML = '<p>ไม่สามารถโหลด QR Code Library ได้</p>';
    });
  }

  downloadQR(): void {
    if (this.qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = `QR-${this.data.deviceCode}.png`;
      link.href = this.qrCodeDataUrl;
      link.click();
    }
  }
}