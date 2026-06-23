package com.example.sihterica.service;

import com.example.sihterica.dto.SectorRequestDTO;
import com.example.sihterica.dto.SectorResponseDTO;
import com.example.sihterica.model.Sector;
import com.example.sihterica.repository.SectorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SectorService {

    private final SectorRepository sectorRepository;

    public List<SectorResponseDTO> getAllSectors(){
        return sectorRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    public SectorResponseDTO createSector(SectorRequestDTO sectorRequestDTO){
        Sector sector = new Sector();
        sector.setName(sectorRequestDTO.getName());
        Sector saved = sectorRepository.save(sector);
        return mapToResponseDTO(saved);
    }

    private SectorResponseDTO mapToResponseDTO(Sector sector){
        return new SectorResponseDTO(sector.getId(), sector.getName());
    }
}
