import { Platform } from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';

class fcm {

    private notificationListener: any;
    private refreshTokenListener: any;
    
    public requestPermissions(): void {
        FCM.requestPermissions(); // for iOS
    }
    
    public getFCMToken(): Promise<any> {
        return FCM.getFCMToken().then((token: string) => {
            console.log(token);
            // store fcm token in your server
        });
    }

    public startListeners(): void {

        this.notificationListener = FCM.on(FCMEvent.Notification, (notif: any) => {
            alert(notif);
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            if (notif.local_notification) {
                //this is a local notification
            }
            if (notif.opened_from_tray) {
                //app is open/resumed because user clicked banner
            }

            if (Platform.OS === 'ios') {
                //optional
                //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link. 
                //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                //notif._notificationType is available for iOS platfrom
                switch (notif._notificationType) {
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
                        break;
                }
            }
        });

        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token: string) => {
            console.log(token);
            // fcm token may not be available on first load, catch it here
        });
    }

    public removeListeners() {
        // stop listening for events
        this.notificationListener.remove();
        this.refreshTokenListener.remove();
    }
}

export default new fcm();
