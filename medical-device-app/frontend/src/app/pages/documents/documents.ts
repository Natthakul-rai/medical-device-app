import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DocumentUploadDialogComponent } from './document-upload-dialog/document-upload-dialog';

export interface DocumentItem {
  id: string;
  deviceName: string;
  documentType: string;
  uploadedAt: string;
  fileName: string;
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './documents.html',
  styleUrl: './documents.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly fb = inject(FormBuilder);

  protected readonly filterGroup = this.fb.nonNullable.group({
    search: [''],
    type: ['all'],
  });

  private readonly documents = signal<DocumentItem[]>([
    {
      id: 'DOC-001',
      deviceName: 'Infusion Pump CZ-200',
      documentType: 'ใบรับรองการสอบเทียบ',
      uploadedAt: '2024-01-08',
      fileName: 'certificate-md2045.pdf',
    },
    {
      id: 'DOC-002',
      deviceName: 'Defibrillator PX-10',
      documentType: 'คู่มือการใช้งาน',
      uploadedAt: '2023-11-20',
      fileName: 'manual-px10.pdf',
    },
    {
      id: 'DOC-003',
      deviceName: 'Ventilator V7 Pro',
      documentType: 'รายงานการซ่อม',
      uploadedAt: '2023-12-15',
      fileName: 'maintenance-ventilator.pdf',
    },
  ]);

  protected readonly columns = ['device', 'type', 'uploadedAt', 'actions'];

  protected readonly documentTypes = [
    'ใบรับรองการสอบเทียบ',
    'รายงานการซ่อม',
    'คู่มือการใช้งาน',
    'บันทึกการตรวจสอบประจำวัน',
  ];

  protected readonly filteredDocuments = signal<DocumentItem[]>([]);

  constructor() {
    this.filterGroup.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.applyFilter());
    this.applyFilter();
  }

  protected openUpload(): void {
    const dialogRef = this.dialog.open(DocumentUploadDialogComponent, {
      width: '520px',
      data: { types: this.documentTypes },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      const newDoc: DocumentItem = {
        id: `DOC-${Math.floor(Math.random() * 900 + 100)}`,
        deviceName: result.deviceName,
        documentType: result.documentType,
        uploadedAt: new Date().toISOString().slice(0, 10),
        fileName: result.fileName,
      };

      this.documents.update((items) => [newDoc, ...items]);
      this.applyFilter();
      this.snackBar.open('อัปโหลดเอกสารสำเร็จ', undefined, { duration: 2500 });
    });
  }

  protected download(document: DocumentItem): void {
    this.snackBar.open(`เตรียมดาวน์โหลด ${document.fileName}`, undefined, { duration: 2000 });
  }

  protected remove(document: DocumentItem): void {
    this.documents.update((items) => items.filter((item) => item.id !== document.id));
    this.applyFilter();
    this.snackBar.open('ลบเอกสารเรียบร้อยแล้ว', undefined, { duration: 2000 });
  }

  private applyFilter(): void {
    const { search, type } = this.filterGroup.getRawValue();
    const keyword = (search ?? '').trim().toLowerCase();

    const filtered = this.documents().filter((doc) => {
      const matchesKeyword = keyword
        ? `${doc.deviceName} ${doc.documentType} ${doc.fileName}`.toLowerCase().includes(keyword)
        : true;
      const matchesType = type === 'all' ? true : doc.documentType === type;
      return matchesKeyword && matchesType;
    });

    this.filteredDocuments.set(filtered);
  }
}
