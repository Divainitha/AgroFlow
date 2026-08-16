import { Component, OnInit } from '@angular/core';
import { Request, RequestService } from '../requests/request.service';

@Component({
  selector: 'app-approvals',
  imports: [],
  templateUrl: './approvals.html',
  styleUrl: './approvals.scss'
})
export class Approvals implements OnInit {

  approvals: Request[] = [];
  selectedApproval: Request | null = null;

  isLoading = true;
  errorMessage = '';
  actionErrorMessage = '';

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadPendingApprovals();
  }

  loadPendingApprovals(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.requestService.getPendingRequests().subscribe({
      next: (data) => {
        this.approvals = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading pending approvals:', error);
        this.isLoading = false;
        this.errorMessage =
          'Unable to load pending approvals. Please try again.';
      }
    });
  }

  selectApproval(approval: Request): void {
    this.selectedApproval = approval;
    this.actionErrorMessage = '';
  }

  approveRequest(): void {
    if (this.selectedApproval?.id === undefined) {
      return;
    }

    const requestId = this.selectedApproval.id;
    this.actionErrorMessage = '';

    this.requestService.approveRequest(requestId).subscribe({
      next: () => {
        this.selectedApproval = null;
        this.loadPendingApprovals();
      },
      error: (error) => {
        console.error('Error approving request:', error);
        this.actionErrorMessage =
          'Unable to approve this request. Please try again.';
      }
    });
  }

  rejectRequest(): void {
    if (this.selectedApproval?.id === undefined) {
      return;
    }

    const requestId = this.selectedApproval.id;
    this.actionErrorMessage = '';

    this.requestService.rejectRequest(requestId).subscribe({
      next: () => {
        this.selectedApproval = null;
        this.loadPendingApprovals();
      },
      error: (error) => {
        console.error('Error rejecting request:', error);
        this.actionErrorMessage =
          'Unable to reject this request. Please try again.';
      }
    });
  }
}