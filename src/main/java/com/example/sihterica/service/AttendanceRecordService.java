package com.example.sihterica.service;

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

    private boolean isWeekend(LocalDate date) {
        DayOfWeek day = date.getDayOfWeek();
        return day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;
    }
}
