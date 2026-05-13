import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function ScanQR({ navigation }: any) {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        javaScriptEnabled
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        source={{
          html: `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;">
    <div id="reader" style="width:100%;height:100vh;"></div>

    <script src="https://unpkg.com/html5-qrcode"></script>
    <script>
      function startScanner() {
        const html5QrCode = new Html5Qrcode("reader");

        html5QrCode.start(
          { facingMode: "environment" }, // ✅ kamera belakang
          {
            fps: 10,
            qrbox: 250
          },
          (decodedText) => {
            // kirim ke React Native
            window.ReactNativeWebView.postMessage(decodedText);

            // stop biar ga scan berkali-kali
            html5QrCode.stop();
          },
          (errorMessage) => {
            // ignore scan error
          }
        ).catch(err => {
          window.ReactNativeWebView.postMessage("ERROR:" + err);
        });
      }

      startScanner();
    </script>
  </body>
</html>
          `,
        }}
        onMessage={(event) => {
          const data = event.nativeEvent.data;

          if (data.startsWith("ERROR:")) {
            console.log("QR Error:", data);
            return;
          }

          navigation.replace("Siswa", {
            kodeQR: data,
          });
        }}
      />
    </View>
  );
}