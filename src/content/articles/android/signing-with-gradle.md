---
title: "Signing an Android apk release with Gradle"
desc: "A quick guide to signing an apk release with Gradle"
updated: 2024-01-15
tags: ["android"]
hide: true
---

## Generating a keystore

To sign your apk, you will need to create a `keystore` file. You can do this with the `keytool` command. 

```bash
keytool -genkey -v -keystore YOUR_KEYSTORE_PATH -alias YOUR_KEY_ALIAS -keyalg RSA -keysize 2048 -validity 10000
```

Make sure to replace `YOUR_KEY_ALIAS` with a name for your key, and `YOUR_KEYSTORE_PATH` with the filename you want to use. The file extension can be anything. The keytool will ask you for a password. Everything else it asks for (like name and organization) can be left blank.

## Adding gradle properties

In your `gradle.properties` file, add the following properties:

```properties
STORE_KEY=C:\path\to\key.store
STORE_KEY_ALIAS=alias_name
STORE_PASSWORD=my_password
```

The values should be the same as the values you used when generating the keystore. The property names can be anything you want, but make sure to use the same names in the next step.

It is recommended to add these properties in the `gradle.properties` file in your `.gradle` home directory, not in your project. If you do add these in your project, make sure you add the `gradle.properties` file to your `.gitignore` file.

## Gradle Build Configuration

We need to specify the signing configuration in the `build.gradle` file.

```kotlin
android {
  ...
  signingConfigs {
      create("release") {
          if (findProperty("STORE_KEY") != null) {
              storeFile = file(findProperty("STORE_KEY") as String)
              storePassword = findProperty("STORE_PASSWORD") as String?
              keyAlias = findProperty("STORE_KEY_ALIAS") as String?
              keyPassword = findProperty("STORE_PASSWORD") as String?
          }
      }
  }
  ...
  buildTypes {
    release {
      isMinifyEnabled = false
      proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
      if (findProperty("STORE_KEY") != null) {
        signingConfig = signingConfigs.getByName("release")
      }
    }
  }
  ...
}
```

The reason I check if the `STORE_KEY` property exists is so that the app can be built without signing it. This is used in any CI workflows, or during the F-Droid build process (if you are publishing to F-Droid).

## Run the build

Now when running `./gradlew assembleRelease`, the apk will be signed with the keystore you generated.
