import { Component } from '@angular/core';

@Component({
  selector: 'app-requests',
  imports: [],
  templateUrl: './requests.html',
  styleUrl: './requests.scss'
})
export class Requests {

  requests = [
    {
      id: 'REQ-2026-001',
      title: 'Office Equipment Purchase',
      type: 'Procurement',
      department: 'Operations',
      amount: 50000,
      priority: 'Normal',
      status: 'Pending',
      submittedDate: '09 Aug 2026'
    }
  ];

}