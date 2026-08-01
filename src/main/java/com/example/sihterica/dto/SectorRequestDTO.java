package com.example.sihterica.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SectorRequestDTO {

    @NotBlank(message = "Sector name cannot be blank")
    @Size(min = 2, max = 100, message = "Sector name must be between 2 and 100 characters")
    private String name;

}
