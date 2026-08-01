package com.example.sihterica.dto;

import com.example.sihterica.model.EmployeeStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
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

    @NotBlank(message = "First name cannot be blank")
    private String firstName;

    @NotBlank(message = "Last name cannot be blank")
    private String lastName;

    @NotNull(message = "Sector ID cannot be null")
    private Long sectorId;

    @NotBlank(message = "Position cannot be blank")
    private String position;

    @NotNull(message = "Employment date cannot be null")
    @PastOrPresent(message = "Employment date cannot be in the future")
    private LocalDate employmentDate;

    @NotNull(message = "Status cannot be null")
    private EmployeeStatus status;
}
