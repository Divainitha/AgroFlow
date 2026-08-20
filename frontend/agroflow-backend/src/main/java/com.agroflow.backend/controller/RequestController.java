package com.agroflow.backend.controller;

import com.agroflow.backend.entity.Request;
import com.agroflow.backend.service.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = {
    "http://localhost:4200",
    "https://agro-flow-sandy.vercel.app"
})
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        Request createdRequest = requestService.createRequest(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdRequest);
    }

    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    @GetMapping("/employee/{employeeName}")
    public ResponseEntity<List<Request>> getRequestsByEmployee(
            @PathVariable String employeeName) {

        return ResponseEntity.ok(
                requestService.getRequestsByEmployee(employeeName)
        );
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Request>> getPendingRequests() {
        return ResponseEntity.ok(requestService.getPendingRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable Long id) {

        return requestService.getRequestById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Request> approveRequest(@PathVariable Long id) {

        return requestService.approveRequest(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Request> rejectRequest(@PathVariable Long id) {

        return requestService.rejectRequest(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}