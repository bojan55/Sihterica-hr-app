package com.example.sihterica.dto;

import com.example.sihterica.model.AttendanceCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRecordResponseDTO {

    private Long id;
    private LocalDate date;
    private AttendanceCode code;
    private int hours;
}
