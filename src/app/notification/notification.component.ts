import { Component } from '@angular/core';
import { NotificationService } from '../Services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  message: string | undefined;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getNotification().subscribe((message) => {
      this.message = message;
      setTimeout(() => {
        this.message = undefined;
      }, 5000);
    });
  }
}
