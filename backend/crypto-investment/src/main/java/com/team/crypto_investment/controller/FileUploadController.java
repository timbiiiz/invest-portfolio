package com.team.crypto_investment.controller;

import com.team.crypto_investment.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/uploads")
public class FileUploadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    private UserService userService;

    @PostMapping("/profile")
    public ResponseEntity<?> uploadProfileImage(
            @RequestParam("file")MultipartFile file,
            @RequestParam("userId") Long userId) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("");
        }

        try {
            // 保存先ディレクトリ作成
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                boolean created = uploadDir.mkdirs();
                if (!created) {
                    throw new RuntimeException("Failed to create upload directory: " + uploadPath);
                }
            }

            // ファイル名をUUIDでユニーク化
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            File destinationFile = new File(uploadPath + fileName);
            file.transferTo(destinationFile);

            // アクセスURLを返す
            String fileUrl = "/uploads/" + fileName;

            // ユーザに画像urlを紐づける
            userService.updateProfileImage(userId, fileUrl);

            return ResponseEntity.ok(Map.of("url", fileUrl));

        } catch (IOException e) {
            logger.error("Failed to upload file. file name: {}", file.getOriginalFilename(), e);
            return ResponseEntity.internalServerError().body("Failed upload: " + e.getMessage());
        }
    }
}
