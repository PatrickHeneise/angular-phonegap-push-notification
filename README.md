# AngularJS Phonegap/Cordova Push Notifications

Bower component for iOS and Android Push Notifcation services. Check out [node-apn](https://github.com/argon/node-apn) and [node-gcm]([)https://github.com/ToothlessGear/node-gcm) to implement push notification services on a node.js server.

## Usage

1. bower install angular-phonegap-push-notification
2. Made sure the `cordova-*.js` script is in your `.html` file.
3. Replace {your_sender_id} with your GCM sender id
4. Include the `push.js` script, and this script's dependencies are included in your app.
5. Add `cordova` as a module dependency to your app.

## Workflow after optaining the device_id

1. send the device_id to an application server
2. store the device_id on the application server
3. send push notifications with the device_id/token

## Example

    var result = push.registerPush(function (result) {
      if (result.type === 'registration') {
        localStorage.setItem('device_id', result.id);
        localStorage.setItem('device', result.device);
      }
    });

## License
MIT
