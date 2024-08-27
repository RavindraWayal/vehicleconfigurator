package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entities.EmailDetails;
import com.example.demo.services.EmailService;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private EmailService emailService;
    String status="";

    @PostMapping(value = "/sendMailWithAttachment", consumes = "multipart/form-data")
    public ResponseEntity<String> sendMailWithAttachment(
            @RequestParam("ToEmail") String toEmail,
            @RequestParam("Body") String body,
            @RequestParam("Attachments") MultipartFile[] attachments) {

        EmailDetails details = new EmailDetails();
        details.setRecipient(toEmail);
        details.setMsgBody(body);

        status = emailService.sendMailWithAttachment(details, attachments);
        System.out.println("in spring boot using microservices");
        return ResponseEntity.ok(status);
    }
}
