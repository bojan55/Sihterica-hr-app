package com.example.sihterica.repository;

import com.example.sihterica.model.AttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {

    List<AttendanceRecord> findByEmployeeIdAndDateBetween(Long employeeId, LocalDate startDate, LocalDate endDate);

    Optional<AttendanceRecord> findByEmployeeIdAndDate(Long employeeId, LocalDate date);

    boolean existsByEmployeeIdAndDate(Long employeeId, LocalDate date);
}
