package com.example.sihterica.controller;

import com.example.sihterica.dto.EmployeeRequestDTO;
import com.example.sihterica.dto.EmployeeResponseDTO;
import com.example.sihterica.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees(){
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> createEmployee(@RequestBody EmployeeRequestDTO requestDTO){
        EmployeeResponseDTO created = employeeService.createEmployee(requestDTO);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(
            @PathVariable Long id, @RequestBody EmployeeRequestDTO requestDTO){
        EmployeeResponseDTO updated = employeeService.updateEmployee(id, requestDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> deleteEmployee(@PathVariable Long id){
        EmployeeResponseDTO deleted = employeeService.deleteEmployee(id);
        return ResponseEntity.ok(deleted);
    }
}
