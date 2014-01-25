/*
 * angular-phonegap-push-notification v0.0.2
 * (c) 2014 Patrick Heneise, patrickheneise.com
 * License: MIT
 */

'use strict';

angular.module('phonegap',
  ['btford.phonegap.ready'])
  .service('phone', function () {
    this.isAndroid = function () {
      var uagent = navigator.userAgent.toLowerCase();
      return uagent.search('android') > -1 ? true : false;
    };
  })

  .factory('push', function ($rootScope, phone, phonegapReady) {
    return {
      registerPush: function (fn) {
        phonegapReady().then(function () {
          var
            pushNotification = window.plugins.pushNotification,
            successHandler = function (result) {},
            errorHandler = function (error) {},
            tokenHandler = function (result) {
              return fn({
                'type': 'registration',
                'id': result,
                'device': 'ios'
              });
            };

          app.onNotificationAPN = function (event) {
            if (event.alert) {
              navigator.notification.alert(event.alert);
            }

            if (event.sound) {
              var snd = new Media(event.sound);
              snd.play();
            }

            if (event.badge) {
              pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
            }
          };

          app.onNotificationGCM = function (event) {
            switch (event.event) {
              case 'registered':
                if (event.regid.length > 0) {
                  return fn({
                    'type': 'registration',
                    'id': event.regid,
                    'device': 'android'
                  });
                }
                break;

              case 'message':
                if (event.foreground) {
                  var my_media = new Media("/android_asset/www/" + event.soundname);
                  my_media.play();
                } else {
                  if (event.coldstart) {
                  } else {
                  }
                }
                break;

              case 'error':
                break;

              default:
                break;
            }
          };

          if (phone.isAndroid()) {
            pushNotification.register(successHandler, errorHandler, {
              'senderID': '{your_sender_id}',
              'ecb': 'app.onNotificationGCM'
            });
          } else {
            console.log('register ios');
            pushNotification.register(tokenHandler, errorHandler, {
              'badge': 'true',
              'sound': 'true',
              'alert': 'true',
              'ecb': 'app.onNotificationAPN'
            });
          }
        });
      }
    };
  });