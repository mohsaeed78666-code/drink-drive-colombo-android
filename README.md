# Drink & Drive Colombo — Android app

This repository contains a lightweight Android app for the existing website. The app loads `https://www.drinkanddrivecolombo.com.lk/` directly, so website content, styling, colours, pricing, and wording remain managed by the website and are not copied or redesigned in the Android project.

## Build

Open this folder in Android Studio with Android SDK 36 and JDK 17 installed, then sync the project using the included Gradle wrapper (Gradle 8.13).

On macOS/Linux, run:

```sh
./gradlew --no-daemon clean lintDebug assembleDebug
```

On Windows, run:

```bat
gradlew.bat --no-daemon clean lintDebug assembleDebug
```

The debug APK output is `app/build/outputs/apk/debug/app-debug.apk`.

GitHub Actions runs Android lint and builds the debug APK on pushes to `main`. Download `Drink-Drive-Colombo-debug-apk` from the successful workflow run's **Artifacts** section.

## App details

- Package: `lk.com.drinkanddrivecolombo.app`
- Minimum Android: API 23 (Android 6.0)
- Target Android: API 36 (Android 16)
- The original website supplies the complete page design and content; the app does not modify the website. External links open in the relevant Android app/browser.

The CI debug APK is signed for local installation/testing. Publishing to Google Play requires a separately signed release bundle and completion of Play Console requirements.


The repository includes the Gradle 8.13 wrapper so Android Studio and CI can use the same Gradle version.

Back navigation uses AndroidX's predictive-back-compatible dispatcher.
