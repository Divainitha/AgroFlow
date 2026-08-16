import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Request, RequestService } from '../requests/request.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  requests: Request[] = [];

  totalRequests = 0;
  pendingRequests = 0;
  approvedRequests = 0;
  rejectedRequests = 0;

  isLoading = true;
  errorMessage = '';

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.requestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;

        this.totalRequests = data.length;

        this.pendingRequests = data.filter(
          request => request.status?.toLowerCase() === 'pending'
        ).length;

        this.approvedRequests = data.filter(
          request => request.status?.toLowerCase() === 'approved'
        ).length;

        this.rejectedRequests = data.filter(
          request => request.status?.toLowerCase() === 'rejected'
        ).length;

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
        this.errorMessage =
          'Unable to load dashboard data. Please try again.';
      }
    });
  }
}