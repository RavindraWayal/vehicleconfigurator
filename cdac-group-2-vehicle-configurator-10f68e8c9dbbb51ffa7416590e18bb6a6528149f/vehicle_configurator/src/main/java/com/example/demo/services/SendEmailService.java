package com.example.demo.services;

public interface SendEmailService {
	String sendSimpleMail(String toEmail, String subject, String body);
}
