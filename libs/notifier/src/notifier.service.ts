import { Injectable } from '@nestjs/common';
import { initializeApp, messaging } from 'firebase-admin';
import { NotificationModel } from './notification.model';

@Injectable()
export class NotifierService {
  private readonly messaging: any;
  constructor() {
    const app = initializeApp();
    this.messaging = messaging(app);
  }

  /**
   * Subscibe the devices to the topic
   *
   * @param devices registrationTokens
   * @param topic topic name
   */
  async subcribe(devices: string[], topic: string): Promise<void> {
    // Subscribe the devices corresponding to the registration tokens to the
    // topic.
    await this.messaging.subscribeFromTopic(devices, topic);
  }

  /**
   * Unsubscibe the devices from the topic
   *
   * @param devices registrationTokens
   * @param topic topic name
   */
  async unsubcribe(devices: string[], topic: string): Promise<void> {
    // Unsubscribe the devices corresponding to the registration tokens from
    // the topic.
    await this.messaging.unsubscribeFromTopic(devices, topic);
  }

  /**
   * Send notification to devices by Condition
   *
   * @param notification notification message
   * @param condition send condition
   * @param group device's group
   */
  async toCondition(
    notification: NotificationModel,
    condition: string,
    group?: string,
  ): Promise<void> {
    const message: messaging.Message = {
      ...toMessage(notification, group),
      condition: condition,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    const response = await this.messaging.send(message);
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  }

  /**
   * Send notification to devices which subscribed to the topic
   *
   * @param notification notification message
   * @param topic topic name
   * @param group device's group
   */
  async toTopic(
    notification: NotificationModel,
    topic: string,
    group?: string,
  ): Promise<void> {
    const message: messaging.Message = {
      ...toMessage(notification, group),
      token: topic,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    const response = await this.messaging.send(message);
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  }

  /**
   * Send notification to multiple devices
   *
   * @param notification notification message
   * @param devices registrationTokens
   * @param group device's group
   */
  async toDevices(
    notification: NotificationModel,
    devices: string[],
    group?: string,
  ): Promise<void> {
    const message: messaging.MulticastMessage = {
      ...toMessage(notification, group),
      tokens: devices,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    const response = await this.messaging.sendMulticast(message);
    // Response is a message ID string.
    if (response.failureCount > 0) {
      console.log(response.responses[0].error);
      console.log('Successfully sent message:', response);
    }
  }
}

/**
 * Create messaging object
 *
 * @param notification notification message
 * @param group device's group
 * @returns Messaging
 */
const toMessage = (notification: NotificationModel, group = 'fcm'): any => {
  return {
    data: notification.payload,
    android: {
      collapseKey: group,
      priority: 'high',
      data: notification.payload,
      notification: notification.notification,
    },
    apns: {
      payload: {
        ...notification.payload,
        link: notification.link,
        aps: {
          alert: {
            title: notification.notification.title,
            body: notification.notification.body,
            launchImage: notification.notification.image,
          },
          badge: notification.badge,
        },
      },
      headers: {
        'apns-priority': '10',
        'apns-collapse-id': group,
      },
      fcmOptions: {
        imageUrl: notification.notification.image,
      },
    },
    webpush: {
      notification: {
        ...notification.notification,
        actions: notification.actions,
      },
      headers: {
        TTL: '86400',
        Urgency: 'high',
      },
      data: notification.payload,
      fcmOptions: {
        link: notification.link,
      },
    },
  };
};
