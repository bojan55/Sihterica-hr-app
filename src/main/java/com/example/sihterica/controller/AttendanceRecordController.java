package com.example.sihterica.controller;

import com.example.sihterica.dto.AttendanceAggregationDTO;
import com.example.sihterica.dto.AttendanceRecordRequestDTO;
import com.example.sihterica.dto.AttendanceRecordResponseDTO;
import com.example.sihterica.service.AttendanceRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceRecordController {

    private final AttendanceRecordService attendanceRecordService;

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<AttendanceRecordResponseDTO>> getAttendanceForEmployee(
            @PathVariable Long employeeId,
            @RequestParam int year){
        return ResponseEntity.ok(attendanceRecordService.getAttendanceForEmployee(employeeId, year));
    }

    @PutMapping("/{recordId}")
    public ResponseEntity<AttendanceRecordResponseDTO> updateAttendanceRecord(
            @PathVariable Long recordId,
            @Valid
            @RequestBody AttendanceRecordRequestDTO requestDTO){
        return ResponseEntity.ok(attendanceRecordService.updateAttendanceRecord(recordId, requestDTO));
    }

    @GetMapping("/employee/{employeeId}/aggregation")
    public ResponseEntity<AttendanceAggregationDTO> getMonthlyAggregation(
            @PathVariable Long employeeId,
            @RequestParam int year,
            @RequestParam int month){
        return ResponseEntity.ok(attendanceRecordService.getMonthlyAggregation(employeeId,year,month));
    }

}
