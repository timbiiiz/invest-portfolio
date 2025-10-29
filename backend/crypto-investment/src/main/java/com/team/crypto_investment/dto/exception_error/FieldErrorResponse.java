package com.team.crypto_investment.dto.exception_error;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FieldErrorResponse {

    private String field;
    private String message;
}
