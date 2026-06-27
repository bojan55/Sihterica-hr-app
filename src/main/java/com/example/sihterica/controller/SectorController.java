package com.example.sihterica.controller;

import com.example.sihterica.dto.SectorRequestDTO;
import com.example.sihterica.dto.SectorResponseDTO;
import com.example.sihterica.service.SectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/sectors")
@RequiredArgsConstructor
public class SectorController {

    private final SectorService sectorService;

    @GetMapping
    public ResponseEntity<List<SectorResponseDTO>> getAllSectors(){
        return ResponseEntity.ok(sectorService.getAllSectors());
    }

    @PostMapping
    public ResponseEntity<SectorResponseDTO> createSector(@RequestBody SectorRequestDTO requestDTO){
        SectorResponseDTO created = sectorService.createSector(requestDTO);
        return ResponseEntity.status(201).body(created);
    }
}
