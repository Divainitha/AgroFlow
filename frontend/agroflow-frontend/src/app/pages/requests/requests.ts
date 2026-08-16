import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RequestService } from './request.service';

@Component({
  selector: 'app-requests',
  imports: [DatePipe, RouterLink],
  templateUrl: './requests.html',
  styleUrl: './requests.scss'
})
export class Requests implements OnInit {

  requests: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.requestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading requests:', error);
        this.isLoading = false;
        this.errorMessage = 'Unable to load requests. Please try again.';
      }
    });
  }
}