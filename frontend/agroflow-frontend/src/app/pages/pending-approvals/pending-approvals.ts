import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService, Request } from '../requests/request.service';

@Component({
  selector: 'app-pending-approvals',
  imports: [],
  templateUrl: './pending-approvals.html',
  styleUrl: './pending-approvals.scss'
})
export class PendingApprovals implements OnInit {

  approvals: Request[] = [];

  constructor(
    private requestService: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPendingApprovals();
  }

  loadPendingApprovals(): void {
    this.requestService.getPendingRequests().subscribe({
      next: (data) => {
        this.approvals = data;
      },
      error: (error) => {
        console.error('Error loading pending approvals:', error);
      }
    });
  }

  viewRequest(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/approvals', id]);
    }
  }
}