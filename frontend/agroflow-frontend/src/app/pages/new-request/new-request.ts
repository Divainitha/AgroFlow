import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { RequestService } from '../requests/request.service';

@Component({
  selector: 'app-new-request',
  imports: [ReactiveFormsModule],
  templateUrl: './new-request.html',
  styleUrl: './new-request.scss'
})
export class NewRequest {

  submitted = false;
  submitting = false;

  requestForm;

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService
  ) {
    this.requestForm = this.formBuilder.group({
      requestType: ['', Validators.required],
      priority: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      amount: [null, [Validators.required, Validators.min(0)]],
      department: ['', Validators.required]
    });
  }

  submitRequest(): void {

    this.submitted = true;

    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const formData = this.requestForm.getRawValue();

    const requestData = {
      employeeName: 'Current Employee',
      requestType: formData.requestType ?? '',
      description: formData.description ?? ''
    };

    console.log('Sending request to backend:', requestData);

    this.requestService.createRequest(requestData).subscribe({

      next: (response) => {

        console.log('Request successfully saved:', response);

        alert('Request submitted successfully!');

        this.requestForm.reset();
        this.submitted = false;
        this.submitting = false;
      },

      error: (error) => {

        console.error('Error submitting request:', error);

        alert(
          'Failed to submit request. Please make sure the backend is running.'
        );

        this.submitting = false;
      }

    });
  }

  cancelRequest(): void {

    this.requestForm.reset();
    this.submitted = false;
    this.submitting = false;
  }
}