package com.example.demo.services;

import com.example.demo.entities.EmailDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public String sendMailWithAttachment(EmailDetails details, MultipartFile[] attachments) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setSubject("vehicle_configurator");
            mimeMessageHelper.setText("Enquiry Of: " + details.getMsgBody(), true);

            for (MultipartFile file : attachments) {
                try {
					mimeMessageHelper.addAttachment(file.getOriginalFilename(), new ByteArrayResource(file.getBytes()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            }

            mailSender.send(mimeMessage);
            return "Mail Sent Successfully";
        } catch (MessagingException e) {
            return "Error while sending mail: " + e.getMessage();
        }
    }
}
