import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// get token
function generateToken(tokenServerUrl: string, userID: string) {
  // Obtain the token interface provided by the App Server
  return fetch(
    `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());
}

function randomID(len: number) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css'],
})
export class VideoCallComponent implements AfterViewInit {
  @ViewChild('zegoVideo')
  zegoVideo!: ElementRef;

  ngAfterViewInit() {
    const roomID = getUrlParams().get('roomID') || 'defaultRoom'; // Get roomID from query params or default
    const userID = randomID(5);
    const userName = randomID(5);
    // generate token
    generateToken('https://nextjs-token.vercel.app/api', userID).then((res) => {
      const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        1484647939, // **REPLACE THIS WITH YOUR ACTUAL ZEGOCLOUD APP ID**
        res.token,
        roomID,
        userID,
        userName
      );
      // create instance object from token
      const zp = ZegoUIKitPrebuilt.create(token);

      console.log(
        'this.zegoVideo.nativeElement',
        this.zegoVideo.nativeElement.clientWidth
      );
      // start the call
      zp.joinRoom({
        container: this.zegoVideo.nativeElement,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.origin +
              '/video-call?roomID=' + // Assuming your route for this component is /video-call
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
    });
  }
}