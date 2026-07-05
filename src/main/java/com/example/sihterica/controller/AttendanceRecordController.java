package com.example.sihterica.controller;

import com.example.sihterica.dto.AttendanceRecordRequestDTO;
import com.example.sihterica.dto.AttendanceRecordResponseDTO;
import com.example.sihterica.service.AttendanceRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceRecordController {

    private final AttendanceRecordService attendanceRecordService;

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<AttendanceRecordService> getAttendanceForEmployee(
            @PathVariable Long employeeId,
            @RequestParam int year){
        return ResponseEntity.ok(attendanceRecordService.getAttendanceForEmployee(employeeId, year));
    }

    @PutMapping("/{recordId}")
    public ResponseEntity<AttendanceRecordResponseDTO> updateAttendanceRecord(
            @PathVariable Long recordId,
            @RequestBody AttendanceRecordRequestDTO requestDTO){
        return ResponseEntity.ok(attendanceRecordService.updateAttendanceRecord(recordId, requestDTO));
    }
}
