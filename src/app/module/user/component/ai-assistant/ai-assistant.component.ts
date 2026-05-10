import { Component } from '@angular/core';
import { UserserviceService } from "../../service/userservice.service";

@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.scss']
})
export class AiAssistantComponent {
  isOpen = false;
  question = '';
  chatHistory: { role: 'user' | 'ai', content: string }[] = [];
  isLoading = false;

  constructor(private userService: UserserviceService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.chatHistory.length === 0) {
      this.chatHistory.push({ role: 'ai', content: 'Hello! I am your Library AI Assistant. How can I help you find books today?' });
    }
  }

  askQuestion() {
    if (!this.question.trim()) return;

    const userQuestion = this.question;
    this.chatHistory.push({ role: 'user', content: userQuestion });
    this.question = '';
    this.isLoading = true;

    this.userService.askAI(userQuestion).subscribe({
      next: (response) => {
        this.chatHistory.push({ role: 'ai', content: response });
        this.isLoading = false;
      },
      error: (err) => {
        this.chatHistory.push({ role: 'ai', content: 'Sorry, I am having trouble connecting right now. Please try again later.' });
        this.isLoading = false;
      }
    });
  }
}
