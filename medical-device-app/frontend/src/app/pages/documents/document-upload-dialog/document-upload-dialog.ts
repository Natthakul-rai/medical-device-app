import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface UploadDialogData {
  types: string[];
}

interface UploadDialogResult {
  deviceName: string;
  documentType: string;
  fileName: string;
}

@Component({
  selector: 'app-document-upload-dialog',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './document-upload-dialog.html',
  styleUrl: './document-upload-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentUploadDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<DocumentUploadDialogComponent, UploadDialogResult | undefined>);
  protected readonly data = inject<UploadDialogData>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    deviceName: ['', [Validators.required, Validators.minLength(3)]],
    documentType: ['', Validators.required],
    fileName: ['', Validators.required],
  });

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.getRawValue());
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
