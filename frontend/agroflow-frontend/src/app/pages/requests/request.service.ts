import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Request {
  id?: number;
  employeeName: string;
  requestType: string;
  description: string;
  status?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/api/requests`;

  createRequest(request: Request): Observable<Request> {
    return this.http.post<Request>(this.apiUrl, request);
  }

  getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl);
  }

  getRequestsByEmployee(employeeName: string): Observable<Request[]> {
    return this.http.get<Request[]>(
      `${this.apiUrl}/employee/${encodeURIComponent(employeeName)}`
    );
  }

  getPendingRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(
      `${this.apiUrl}/pending`
    );
  }

  getRequestById(id: number): Observable<Request> {
    return this.http.get<Request>(
      `${this.apiUrl}/${id}`
    );
  }

  approveRequest(id: number): Observable<Request> {
    return this.http.put<Request>(
      `${this.apiUrl}/${id}/approve`,
      {}
    );
  }

  rejectRequest(id: number): Observable<Request> {
    return this.http.put<Request>(
      `${this.apiUrl}/${id}/reject`,
      {}
    );
  }
}