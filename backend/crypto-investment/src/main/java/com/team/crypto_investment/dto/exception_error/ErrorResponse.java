package com.team.crypto_investment.dto.exception_error;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ErrorResponse {

    private String message;
    private int status;
    private String error;
    private LocalDateTime timestamp;
    private List<FieldErrorResponse> fields;
}
