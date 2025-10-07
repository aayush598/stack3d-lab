This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


ESP32 CODE (WOKWI)

```
#include <WiFi.h>
#include <WebSocketsClient.h>

#define WIFI_SSID "Wokwi-GUEST"
#define WIFI_PASSWORD ""

// Secure WebSocket server (Render)
#define WS_SERVER "stack3d-lab-ws.onrender.com"
#define WS_PORT 443
#define WS_PATH "/"

WebSocketsClient webSocket;
unsigned long lastSendTime = 0;

// WiFi connect helper
void connectToWiFi() {
  Serial.print("Connecting to WiFi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ WiFi connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

// WebSocket events
void webSocketEvent(WStype_t type, uint8_t *payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.println("❌ WebSocket disconnected");
      break;

    case WStype_CONNECTED:
      Serial.println("✅ Connected to WebSocket server!");
      webSocket.sendTXT("{\"status\":\"connected from ESP32\"}");
      break;

    case WStype_TEXT:
      Serial.printf("📩 Received from server: %s\n", payload);
      break;

    case WStype_ERROR:
      Serial.println("⚠️ WebSocket error");
      break;

    default:
      break;
  }
}

void setup() {
  Serial.begin(115200);
  connectToWiFi();

  // Initialize secure WebSocket (wss)
  // Passing empty fingerprint disables SSL verification (good for Wokwi)
  webSocket.beginSSL(WS_SERVER, WS_PORT, WS_PATH, "", "");  
  webSocket.onEvent(webSocketEvent);

  // Try to reconnect automatically every 5 seconds
  webSocket.setReconnectInterval(5000);

  Serial.println("🚀 Attempting secure WebSocket connection...");
}

void loop() {
  webSocket.loop();

  // Send JSON data every 2 seconds
  if (millis() - lastSendTime > 2000) {
    lastSendTime = millis();

    float temp = random(2000, 3000) / 100.0;
    float humidity = random(4000, 6000) / 100.0;
    String message = "{\"temperature\": " + String(temp, 2) +
                     ", \"humidity\": " + String(humidity, 2) +
                     ", \"time\": \"" + String(millis() / 1000) + "s\"}";

    Serial.println("📤 Sending: " + message);
    webSocket.sendTXT(message);
  }
}
```