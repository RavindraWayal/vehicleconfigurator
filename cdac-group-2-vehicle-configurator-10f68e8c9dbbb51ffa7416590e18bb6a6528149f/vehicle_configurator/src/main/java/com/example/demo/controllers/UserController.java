package com.example.demo.controllers;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.User;
import com.example.demo.services.ForgetPasswordService;
import com.example.demo.services.SendEmailService;
import com.example.demo.services.UserManager;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {

	@Autowired
    private UserManager userManager;
	
	@Autowired
	private ForgetPasswordService forgotPassService;
	
	@Autowired
    SendEmailService eservice;
	
    @Autowired
    private MessageSource messageSource;

	@PostMapping(value="/signup")
    public void registerCompany(@RequestBody User Reg) {
        userManager.createUser(Reg);
    }
	

	@PostMapping(value="/login")
    public boolean validateUser(@RequestBody User Reg) {
		return userManager.validateUser(Reg);
    }	 
	
	@GetMapping("/{username}")
	public int getUserByUsername(@PathVariable("username")String username)
	{
		return userManager.getUSerByUsername(username);
	}
	  //applied i18n
		@GetMapping("/forgot-password")
	    public ResponseEntity forgotPassword(@RequestParam String email,@RequestHeader(name = "Accept-Language", required = false) Locale locale ) {
	          String forgetLink="http://localhost:8080/api/reset-password";
	        try {
	            String subject = messageSource.getMessage("email.reset.subject", null, locale);
	            String body = messageSource.getMessage("email.reset.body", new Object[]{forgetLink}, locale);
	            if (forgotPassService.forgetPassword(email)) {
	                eservice.sendSimpleMail(email, body, subject);
	                return ResponseEntity.ok("Email sent successfully");
	            } else {
	                return ResponseEntity.badRequest().body("Email not found");
	            }
	        }catch (Exception e){
	            return ResponseEntity.status(500).body("Internal Server Error");
	        }
	    }
	
	@PutMapping("reset-password")
    public ResponseEntity resetPassword(@RequestParam String email, @RequestParam String password) {
        boolean val = forgotPassService.resetPassword(email, password);
        if (val) {
            return ResponseEntity.status(200).body("password updated successfully");
        } else {
            return ResponseEntity.internalServerError().body("something went wrong while password changing");
        }
    }
}
