plugins {
    id("com.android.application")
}

android {
    namespace = "lk.com.drinkanddrivecolombo.app"
    compileSdk = 36

    defaultConfig {
        applicationId = "lk.com.drinkanddrivecolombo.app"
        minSdk = 23
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        debug {
            isMinifyEnabled = false
        }
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    lint {
        abortOnError = true
    }
}

dependencies {
    implementation("androidx.activity:activity:1.13.0")
}
