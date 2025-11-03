import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export type DeviceStatus = 'ready' | 'maintenance' | 'broken' | 'retired';

export interface Device {
  id: number;
  code: string;
  name: string;
  specification?: string;
  status: 'ready' | 'maintenance' | 'broken' | 'retired';
  calibration_date?: string;
  next_calibration_date?: string;
  location?: string;
  serial_number?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  documents?: Document[];
  attachments?: Attachment[];
  reports?: Report[];
}

export interface Document {
  id: number;
  device_id: number;
  type: string;
  file_path: string;
  file_name: string;
  file_size?: number;
  uploaded_by?: number;
  createdAt?: string;
}

export interface Attachment {
  id: number;
  device_id: number;
  file_name: string;
  file_path: string;
  file_size?: number;
  file_type?: string;
  category: 'manual' | 'certificate' | 'report' | 'image' | 'other';
  description?: string;
  uploaded_by?: number;
  createdAt?: string;
  uploader?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface Report {
  id: number;
  device_id: number;
  user_id: number;
  message: string;
  image_path?: string;
  status: 'pending' | 'resolved';
  createdAt?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CreateDeviceDto {
  code: string;
  name: string;
  specification?: string;
  status?: 'ready' | 'maintenance' | 'broken' | 'retired';
  calibration_date?: string;
  next_calibration_date?: string;
  location?: string;
  serial_number?: string;
  category?: string;
}

export interface UpdateDeviceDto extends Partial<CreateDeviceDto> {}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private readonly apiService = inject(ApiService);

  // Get all devices with optional search and status filter
  getDevices(params?: { q?: string; status?: string }): Observable<Device[]> {
    return this.apiService.get<Device[]>('/devices', params);
  }

  // Get single device by ID
  getDevice(id: number): Observable<Device> {
    return this.apiService.get<Device>(`/devices/${id}`);
  }

  // Create new device (admin only)
  createDevice(device: CreateDeviceDto): Observable<Device> {
    return this.apiService.post<Device>('/devices', device);
  }

  // Update device (admin only)
  updateDevice(id: number, device: UpdateDeviceDto): Observable<Device> {
    return this.apiService.put<Device>(`/devices/${id}`, device);
  }

  // Delete device (admin only)
  deleteDevice(id: number): Observable<{ message: string }> {
    return this.apiService.delete<{ message: string }>(`/devices/${id}`);
  }

  // Get device QR code
  getDeviceQRCode(id: number): Observable<Blob> {
    return this.apiService.get(`/devices/${id}/qrcode`);
  }

  // Get device documents
  getDeviceDocuments(id: number): Observable<Document[]> {
    return this.apiService.get<Document[]>(`/devices/${id}/documents`);
  }

  // Upload document for device (admin only)
  uploadDeviceDocument(id: number, file: File, type: string = 'calibration'): Observable<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.apiService.uploadFile(`/devices/${id}/documents`, formData);
  }

  // Download document
  downloadDocument(docId: number): Observable<Blob> {
    return this.apiService.get(`/documents/${docId}/download`);
  }

  // Get device reports
  getDeviceReports(id: number): Observable<Report[]> {
    return this.apiService.get<Report[]>(`/devices/${id}/reports`);
  }

  // Create device report (with optional image)
  createDeviceReport(id: number, message: string, image?: File): Observable<Report> {
    const formData = new FormData();
    formData.append('message', message);
    if (image) {
      formData.append('image', image);
    }

    return this.apiService.uploadFile(`/devices/${id}/report`, formData);
  }

  // Update report status (admin only)
  updateReportStatus(reportId: number, status: 'pending' | 'resolved'): Observable<Report> {
    return this.apiService.put<Report>(`/reports/${reportId}/status`, { status });
  }

  // === Attachment Methods ===

  // Get device attachments
  getDeviceAttachments(id: number): Observable<Attachment[]> {
    return this.apiService.get<Attachment[]>(`/devices/${id}/attachments`);
  }

  // Upload attachment for device
  uploadDeviceAttachment(id: number, file: File, category: 'manual' | 'certificate' | 'report' | 'image' | 'other' = 'other', description?: string): Observable<Attachment> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    if (description) {
      formData.append('description', description);
    }

    return this.apiService.uploadFile(`/devices/${id}/attachments`, formData);
  }

  // Delete attachment (admin only)
  deleteAttachment(attachmentId: number): Observable<{ message: string }> {
    return this.apiService.delete<{ message: string }>(`/attachments/${attachmentId}`);
  }
}