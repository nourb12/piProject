import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stomp } from '@stomp/stompjs';
import { NotificationService } from './notification.service'; // <-- import it

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: any;
  private stompClient: any;
  private meetingSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private notificationService: NotificationService) { 
     this.socket = new WebSocket('ws://localhost:8093/pi/ws/websocket');
    this.stompClient = Stomp.over(() => this.socket);
  }

  connect() {
    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/meetings', (message: any) => {
        console.log('Received message:', message);
        if (message.body) {
          const meeting = JSON.parse(message.body);
          if (meeting) {
            this.meetingSubject.next(meeting);

            // 💡 Add this to push the notification to the header
            const type = meeting?.isUpdate ? 'update' : 'add'; // You may adjust this based on your payload
            this.notificationService.pushNotification(type, meeting.title || 'New Meeting');

          } else {
            console.error('Received invalid meeting data');
          }
        } else {
          console.error('Received empty message');
        }
      });
    }, (error: any) => {
      console.error('STOMP connection error:', error);
    });
  }

  getMeetings() {
    return this.meetingSubject.asObservable();
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}
