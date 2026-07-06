package com.example.sihterica.service;

import com.example.sihterica.dto.AttendanceAggregationDTO;
import com.example.sihterica.dto.AttendanceRecordRequestDTO;
import com.example.sihterica.dto.AttendanceRecordResponseDTO;
import com.example.sihterica.model.AttendanceCode;
import com.example.sihterica.model.AttendanceRecord;
import com.example.sihterica.model.Employee;
import com.example.sihterica.repository.AttendanceRecordRepository;
import com.example.sihterica.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AttendanceRecordService {

    private final AttendanceRecordRepository attendanceRecordRepository;
    private final EmployeeRepository employeeRepository;

    public void generateYearForEmployee(Long employeeId, int year){
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Employee not found with id: " + employeeId
                ));

        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year, 12, 31);

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)){
            if (attendanceRecordRepository.existsByEmployeeIdAndDate(employeeId, date)){
                continue;
            }
            AttendanceCode code = isWeekend(date) ? AttendanceCode.DAY_OFF : AttendanceCode.WORK_DAY;
            AttendanceRecord record = new AttendanceRecord();
            record.setEmployee(employee);
            record.setDate(date);
            record.setCode(code);
            record.setHours(code.getDefaultHours());

            attendanceRecordRepository.save(record);
        }
    }

    public AttendanceRecordResponseDTO updateAttendanceRecord(Long recordId, AttendanceRecordRequestDTO requestDTO ){
        AttendanceRecord record = attendanceRecordRepository.findById(recordId)
                .orElseThrow(()-> new EntityNotFoundException(
                        "Attendance record not found with id: " + recordId
                ));

        record.setCode(requestDTO.getCode());
        record.setHours(requestDTO.getCode().getDefaultHours());

        AttendanceRecord updated = attendanceRecordRepository.save(record);
        return mapToResponseDTO(updated);
    }

    public List<AttendanceRecordResponseDTO> getAttendanceForEmployee(Long employeeId, int year){
        employeeRepository.findById(employeeId)
                .orElseThrow(()-> new EntityNotFoundException(
                        "Employee not found with id: " + employeeId));

        LocalDate startDate = LocalDate.of(year, 1,1);
        LocalDate endDate = LocalDate.of(year, 12, 31);

        return attendanceRecordRepository
                .findByEmployeeIdAndDateBetween(employeeId, startDate, endDate)
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    public AttendanceAggregationDTO getMonthlyAggregation(Long employeeId, int year, int month) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Employee not found with id: " + employeeId));

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<AttendanceRecord> records = attendanceRecordRepository
                .findByEmployeeIdAndDateBetween(employeeId, startDate, endDate);

        Map<String, Integer> totalsByCode = new LinkedHashMap<>();
        for (AttendanceRecord record : records){
            String label = record.getCode().getLabel();
            int hours = record.getHours();
            totalsByCode.merge(label, hours, Integer::sum);
        }

        return new AttendanceAggregationDTO(
                employeeId,
                employee.getFirstName() + " " + employee.getLastName(),
                year,
                month,
                totalsByCode
        );
    }

    private boolean isWeekend(LocalDate date) {
        DayOfWeek day = date.getDayOfWeek();
        return day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;
    }

    private AttendanceRecordResponseDTO mapToResponseDTO(AttendanceRecord record){
        return new AttendanceRecordResponseDTO(
                record.getId(),
                record.getDate(),
                record.getCode(),
                record.getHours()
        );
    }
}
