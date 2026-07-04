package com.example.sihterica.dto;

import com.example.sihterica.model.AttendanceCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRecordRequestDTO {
    private AttendanceCode code;
}
