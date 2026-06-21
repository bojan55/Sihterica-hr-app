package com.example.sihterica.repository;

import com.example.sihterica.model.Employee;
import com.example.sihterica.model.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findBySectorId(Long sectorId);
    List<Employee> findByStatus(EmployeeStatus status);
}
