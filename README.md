# Drink & Drive Colombo — Android app

This repository contains a lightweight Android app for the existing website. The app loads `https://www.drinkanddrivecolombo.com.lk/` directly, so website content, styling, colours, pricing, and wording remain managed by the website and are not copied or redesigned in the Android project.

## Build

Open this folder in Android Studio with Android SDK 36 and JDK 17 installed, then sync the Gradle project and run the `app` configuration on an Android device or emulator.

The GitHub Actions workflow builds and lint-checks the debug APK on pushes to `main` and manual workflow runs. Download the generated `Drink-Drive-Colombo-debug-apk` artifact from the workflow run's **Artifacts** section.

## Verify locally

With JDK 17, Android SDK 36, and Gradle 8.13 installed, run:

```sh
gradle --no-daemon clean lintDebug assembleDebug
```

The APK output is `app/build/outputs/apk/debug/app-debug.apk`.

## App details

- Package: `lk.com.drinkanddrivecolombo.app`
- Minimum Android: API 23 (Android 6.0)
- Target Android: API 36 (Android 16)
- Website UI stays on the original website; external links open in their relevant Android app/browser.

The CI debug APK is for installation/testing. Publishing to Google Play requires a separately signed release bundle and completion of Play Console requirements.