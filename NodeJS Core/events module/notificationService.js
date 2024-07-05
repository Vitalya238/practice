const EventEmitter = require('events');

class NotificationService extends EventEmitter {
    constructor() {
        super();
    }

    sendEmailNotification(email, subject, message) {
        console.log(`email: ${email}, subject: ${subject}, message: ${message}`);
        this.emit('email', { email, subject, message });
    }

    sendSMSNotification(phoneNumber, message) {
        console.log(`phoneNumber: ${phoneNumber}, message: ${message}`);
        this.emit('sms', { phoneNumber, message });
    }

    sendPushNotification(deviceId, title, message) {
        console.log(`deviceId: ${deviceId}, title: ${title}, message: ${message}`);
        this.emit('push', { deviceId, title, message });
    }
}
const notificationService = new NotificationService();


class UI {
    updateEmail(data) {
        console.log('Updating UI with email data: ', data);
    }
}

const ui = new UI();

notificationService.on('email', (data) => {
    ui.updateEmail(data);
});

notificationService.sendEmailNotification('test@asd.com', 'test subj', 'test mess');
notificationService.sendSMSNotification('1234567890', 'test SMS');
notificationService.sendPushNotification('device123', 'test title', 'test push');
