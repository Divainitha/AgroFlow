package com.agroflow.backend.service;

import com.agroflow.backend.entity.Request;
import com.agroflow.backend.repository.RequestRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    private final RequestRepository requestRepository;

    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public Request createRequest(Request request) {
        request.setStatus("Pending");
        request.setCreatedAt(LocalDateTime.now());

        return requestRepository.save(request);
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public List<Request> getRequestsByEmployee(String employeeName) {
        return requestRepository.findByEmployeeName(employeeName);
    }

    public List<Request> getPendingRequests() {
        return requestRepository.findByStatus("Pending");
    }

    public Optional<Request> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public Optional<Request> approveRequest(Long id) {
        Optional<Request> requestOptional = requestRepository.findById(id);

        if (requestOptional.isPresent()) {
            Request request = requestOptional.get();
            request.setStatus("Approved");

            return Optional.of(requestRepository.save(request));
        }

        return Optional.empty();
    }

    public Optional<Request> rejectRequest(Long id) {
        Optional<Request> requestOptional = requestRepository.findById(id);

        if (requestOptional.isPresent()) {
            Request request = requestOptional.get();
            request.setStatus("Rejected");

            return Optional.of(requestRepository.save(request));
        }

        return Optional.empty();
    }
}