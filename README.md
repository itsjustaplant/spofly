# spofly
Desktop app for spoflyv1.herokuapp.com

It helps you to find lyrics of song you are currently listening on spotify without authentication.

### Screenshots 

![Image of flume-friends](https://github.com/itsjustaplant/spofly/macos/master/screenshots/flume_resized.png)
![Image of rickroll](https://github.com/itsjustaplant/spofly/blob/macos/screenshots/rickastley_resized.png)

# Security
- ✅ Only load secure content

- ⬜️Disable the Node.js integration in all renderers that display remote content

- ⬜️Enable context isolation in all renderers that display remote content

- ⬜️Use ses.setPermissionRequestHandler() in all sessions that load remote content

- ✅Do not disable webSecurity

- ✅Define a Content-Security-Policy and use restrictive rules (i.e. script-src 'self')

- ✅Do not set allowRunningInsecureContent to true

- ✅Do not enable experimental features

- ✅Do not use enableBlinkFeatures

- ✅< webview >: Do not use allowpopups

- ⬜️< webview >: Verify options and params

- ✅Disable or limit navigation

- ✅Disable or limit creation of new windows

- ✅Do not use openExternal with untrusted content

- ⬜️Disable the remote module

- ⬜️Filter the remote module

- ✅Use a current version of Electron
