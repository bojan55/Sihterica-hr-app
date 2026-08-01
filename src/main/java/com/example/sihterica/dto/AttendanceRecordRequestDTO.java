package com.example.sihterica.dto;

import com.example.sihterica.model.AttendanceCode;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRecordRequestDTO {

    @NotNull(message = "Attendance code cannot be null")
    private AttendanceCode code;
}
