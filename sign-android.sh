jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/Dropbox/AndroidKeystore/revision-2016.keystore ~/Documents/Development/partymeister-companion-app/platforms/android/build/outputs/apk/android-release-unsigned.apk revision-2016
~/Library/Android/sdk/build-tools/27.0.3/zipalign -v 4 ~/Documents/Development/partymeister-companion-app/platforms/android/build/outputs/apk/android-release-unsigned.apk ~/Documents/Development/partymeister-companion-app/platforms/android/build/outputs/apk/android-release-signed.apk