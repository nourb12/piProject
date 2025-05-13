package com.esprit.stage.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String fromPhoneNumber;

    public void sendSms(String to, String message) {
        if (!to.startsWith("+")) {
            to = "+216" + to;  // Assure-toi que le numéro est au format international
        }

        System.out.println("📩 Envoi du SMS à : " + to); // Vérifier si la fonction est bien appelée

        Twilio.init(accountSid, authToken);

        try {
            Message twilioMessage = Message.creator(
                    new com.twilio.type.PhoneNumber(to),
                    new com.twilio.type.PhoneNumber(fromPhoneNumber),
                    message
            ).create();

            System.out.println("✅ SMS envoyé avec SID : " + twilioMessage.getSid());
        } catch (Exception e) {
            System.out.println("❌ Erreur lors de l'envoi du SMS : " + e.getMessage());
        }
    }
}
