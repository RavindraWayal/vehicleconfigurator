package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;

@Service
public class ForgetPasswordService implements SendEmailService {
	
	@Autowired
	UserRepository repo;
	
	@Autowired private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") 
    private String sender;
    
    
    
	public boolean forgetPassword(String email) {
		Optional<User> optional = Optional.ofNullable(repo.getUserByEmail(email));
		
		if(!optional.isEmpty()) {
			return true;
		}else {
		
		return false;
		}
	}
	
	public boolean resetPassword(String email,String password){
        Optional<User> optional = Optional.ofNullable(repo.getUserByEmail(email));

        if(!optional.isPresent()){
            return false;
        }else {
            User user = optional.get();
            System.out.println(user);
            user.setPassword(password);
            repo.save(user);
            return true;

        }
    }

	@Override
    public String sendSimpleMail(String toEmail, String subject, String body) {
        try {

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(toEmail);
            mailMessage.setText(subject);
            mailMessage.setSubject(body);

            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        }

        catch (Exception e) {
            System.out.println(e.getMessage());
            return "Error while Sending Mail";
        }    }

}
