package com.example.sihterica.service;

import com.example.sihterica.dto.EmployeeRequestDTO;
import com.example.sihterica.dto.EmployeeResponseDTO;
import com.example.sihterica.model.Employee;
import com.example.sihterica.model.Sector;
import com.example.sihterica.repository.EmployeeRepository;
import com.example.sihterica.repository.SectorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final SectorRepository sectorRepository;

    public EmployeeResponseDTO createEmployee(EmployeeRequestDTO requestDTO){
        Sector sector = sectorRepository.findById(requestDTO.getSectorId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Sector not found with id : " + requestDTO.getSectorId()
                ));
        Employee employee = new Employee();
        employee.setFirstName(requestDTO.getFirstName());
        employee.setLastName(requestDTO.getLastName());
        employee.setSector(sector);
        employee.setPosition(requestDTO.getPosition());
        employee.setEmploymentDate(requestDTO.getEmploymentDate());
        employee.setStatus(requestDTO.getStatus());

        Employee saved = employeeRepository.save(employee);
        return mapToResponseDTO(saved);
    }

    private EmployeeResponseDTO mapToResponseDTO(Employee employee){
        return new EmployeeResponseDTO(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getSector().getName(),
                employee.getPosition(),
                employee.getEmploymentDate(),
                employee.getStatus()
        );
    }
}
