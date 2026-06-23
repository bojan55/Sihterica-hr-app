package com.example.sihterica.dto;

import com.example.sihterica.model.EmployeeStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeRequestDTO {

    private String firstName;
    private String lastName;
    private Long sectorId;
    private String position;
    private LocalDate employmentDate;
    private EmployeeStatus status;
}
