import { DecimalPipe, NgFor, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

interface StatusSummary {
  label: string;
  value: number;
  icon: string;
  class: string;
  color: string;
}

interface CalibrationAlert {
  deviceName: string;
  dueDate: string;
  location: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgFor,
    NgStyle,
    DecimalPipe,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  protected readonly summaries = signal<StatusSummary[]>([
    { label: 'พร้อมใช้งาน', value: 120, icon: 'verified', class: 'status-ready', color: '#1E88E5' },
    { label: 'รอซ่อม', value: 18, icon: 'build', class: 'status-maintenance', color: '#FFB300' },
    { label: 'ชำรุด', value: 6, icon: 'error', class: 'status-broken', color: '#E53935' },
    { label: 'ยกเลิกใช้งาน', value: 9, icon: 'do_not_disturb', class: 'status-retired', color: '#6D6D6D' },
  ]);

  protected readonly alerts = signal<CalibrationAlert[]>([
    { deviceName: 'Infusion Pump #MD-2045', dueDate: '15 ก.พ. 2568', location: 'ICU ชั้น 3' },
    { deviceName: 'Defibrillator #MD-1021', dueDate: '20 ก.พ. 2568', location: 'ER' },
    { deviceName: 'Ventilator #MD-3301', dueDate: '27 ก.พ. 2568', location: 'หอผู้ป่วยกึ่งวิกฤติ' },
  ]);

  protected readonly totalDevices = computed(() =>
    this.summaries()
      .map((item) => item.value)
      .reduce((acc, curr) => acc + curr, 0)
  );

  protected readonly pieGradient = computed(() => {
    const items = this.summaries();
    const total = items.reduce((sum, item) => sum + item.value, 0);

    let currentOffset = 0;
    const segments = items
      .map((item) => {
        const start = currentOffset;
        const portion = (item.value / total) * 360;
        currentOffset += portion;
        return `${item.color} ${start}deg ${currentOffset}deg`;
      })
      .join(', ');

    return `conic-gradient(${segments})`;
  });
}
