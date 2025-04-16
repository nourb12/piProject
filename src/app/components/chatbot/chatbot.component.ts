import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage: string = '';
  botResponse: string = '';

  constructor(private chatbotService: ChatbotService) {}

  sendMessage() {
    if (this.userMessage.trim()) {
      this.chatbotService.sendMessage(this.userMessage).subscribe(response => {
        this.botResponse = response;
        this.userMessage = '';  // Reset message field
      });
    }
  }
}
