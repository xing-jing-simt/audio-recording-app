# Demo1
Two part:
1. Python Flask backend server
2. Angular Capacitor mobile frontend

Software dependencies:
- Python
- Node (npm, npx)
- Android Studio

## Mobile development
Build process:
Run `ng build && npx cap sync && npx cap open android` to open the project in Android Studio. Choose a virtual or physical device to run the app.

Environment:
The backend server is listening on `http://127.0.0.1:5000/`, and the mobile client is connecting to `http://127.0.0.1:5000` as well. There are a few ways to connect to the backend server: use a proxy like ngrok to make the backend server available on a public IP address, change the address in the mobile client to the public IP address, enable clear text traffic for the domain; alternatively and in this case, enable port forwarding between the mobile client and the host for port 5000 and port 80. You can do this with `chrome://inspect/devices`, Android Studio > System settings > Manual proxy configuration, or `adb reverse tcp:5000 tcp:5000`.
