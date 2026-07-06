package com.example.sihterica.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceAggregationDTO {

    private Long employeeId;
    private String employeeFullName;
    private int year;
    private int month;
    private Map<String, Integer> totalsByCode;
}