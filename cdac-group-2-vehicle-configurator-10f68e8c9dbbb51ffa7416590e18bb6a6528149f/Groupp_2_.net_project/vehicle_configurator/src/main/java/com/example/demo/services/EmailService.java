package com.example.demo.services;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entities.EmailDetails;

public interface EmailService {
//    String sendSimpleMail(EmailDetails details);
	public String sendMailWithAttachment(EmailDetails details, MultipartFile[] attachments);
  
}
