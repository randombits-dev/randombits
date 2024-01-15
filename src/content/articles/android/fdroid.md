---
title: "Publishing an app on Fdroid"
desc: "A complete guide to publishing an app on Fdroid. Including Reproducible builds."
updated: 2024-01-14
tags: ["android"]
---

## What is Fdroid?

[Fdroid](https://fdroid.org/) is an open source app store for Android. While the Google Play Store is full of ads, in app-purchases, and apps that like to request permissions, Fdroid apps generally do not have ads, in-app purchases, or permission requests. All apps on Fdroid are required to be **floss** (free/libre open source software). Fdroid apps tend to be simple, offline, and privacy respecting.

## Why publish on Fdroid?

* The F-Droid app database is tiny compared to the Google Play Store, so your app will get more exposure.
* You can include donation links in your app description.
* You will support the FLOSS community.
* You will learn a lot about your app and android development. F-droid has a very strict publishing process, and will run reports on your dependencies, code, and permissions.

## 1. Build and Sign your app

If you are using **Android Studio**, you can build your app by going to `Build > Generate Signed Bundle / APK`. 

If you are using **Gradle**, you can build your app with `./gradlew assembleRelease`. This will generate an apk file in `app/build/outputs/apk/release/app-release.apk`. See my guide on [Signing Android Apps with Gradle](/articles/android-gradle) for more details.

If you are using the **command line**, you can sign your app with the following command:

```bash
apksigner sign --ks-key-alias YOUR_KEY_ALIAS --ks YOUR_KEYSTORE_PATH app-release.apk
```

See my guide on [Signing an Android apk with the command line](/articles/android/signing-with-cmd) for more details.

## 2. Clone the Fdroid repository

Fdroid uses gitlab to host their repositories. You will need to create an account on [gitlab.com](https://gitlab.com/users/sign_in#register-pane) if you don't already have one.

Clone the [Data Repo](https://gitlab.com/fdroid/fdroiddata). This repo holds the metadata for all the apps published on Fdroid.

On your cloned repo, create a new branch for your app. The branch name should be the package name of your app. For example, "com.example.myapp".

## 3. Create your Metadata file

Create a new file in the `metadata/` directory. The file name should be the package name of your app, with a .yml extension. For example, `metadata/com.example.myapp.yml`.

The file should contain the metadata for your app. Here is an example:

```yml
Categories:
  - Science & Education
  - Reading
License: MIT
AuthorName: John Doe
AuthorEmail: john@example.com
AuthorWebSite: https://example.com
SourceCode: https://github.com/username/myapp
IssueTracker: https://github.com/username/myapp/issues
Changelog: https://github.com/username/myapp/releases

AutoName: My App Name

RepoType: git
Repo: https://github.com/username/myapp.git
Binaries: https://github.com/username/myapp/releases/download/v%v/MyApp-%v.apk

Builds:
  - versionName: 1.0.1
    versionCode: 1
    commit: v1.0.1
    subdir: app
    sudo:
      - apt-get update
      - apt-get install -y openjdk-17-jdk-headless
      - update-java-alternatives -a
    gradle:
      - yes

AllowedAPKSigningKeys: 046e269cfdb4816b4ef3d554a63de6be063e40008b524c04397d3b04315eaccd

AutoUpdateMode: Version
UpdateCheckMode: Tags
CurrentVersion: 1.0.5
CurrentVersionCode: 5
```

### Categories

The categories your app belongs to. The available categories are Connectivity, Development, Games, Graphics, Internet, Money, Multimedia, Navigation, Phone & SMS, Reading, Science & Education, Security, Sports & Health, System, Theming, Time, Writing

### License

This needs to be an open source license. Some common examples are MIT, GPL-3.0-only, and Apache-2.0.

### Author Details

These details are optional but recommended. You can include your name, email, and website.

### Source Code

The `SourceCode` link is required, and should be a link to the source code of your app. The `IssueTracker` and `Changelog` links are optional.

### AutoName

The name of your app. This is used when F-Droid finds an update for your app, and generates a commit in their repo.

### Repo

The link to your git repo. This is used to pull your code and build your app. Notice that the URL ends with `.git`. The `Binaries` property is related to [Reproducible Builds](#reproducible-builds) and links to a signed apk file of your app.

### Builds

This is where you specify how to build your app. The `versionName` and `versionCode` properties are the version name and version code of your app. The `commit` property is the git tag or commit hash of the latest version of your app. The `subdir` property is the directory of your app's source code. The `sudo` property is a list of commands to run as root. The `gradle` property specifies whether to build with Gradle as opposed to Ant.

### AllowedAPKSigningKeys

This is the fingerprint of the key used to sign your app. See [Reproducible Builds](#reproducible-builds) below for more details.

### Auto Update

The `AutoUpdateMode` property specifies if F-Droid will check for updates to your app. This should be set to either `Version` or `None`. The `UpdateCheckMode` property specifies how F-Droid will check for updates. It can be set to either `Tags` or `HTTP`, but `Tags` is recommended. The `CurrentVersion` and `CurrentVersionCode` properties are the version name and version code of your app.

### Full Metadata Reference
See the [Full Metadata Reference](https://f-droid.org/en/docs/Build_Metadata_Reference/) for more details on all the properties you can include in your metadata file.

## Reproducible Builds

Reproducible builds are optional but highly recommended.

Reproducible builds is a way to guarantee that an app was built from the published source code. This is done by building and signing the apk with a key, and publishing the fingerprint of the key. F-Droid will then build the app from the source code, and verify that it built the exact same apk as the one you published.  Luckily, F-Droid and Github together make this process very easy.

### Generating a signing key

If you already have a signing key from publishing to the Google Play Store, you can use that key. Otherwise, you can generate a new key.

```bash
keytool -genkey -v -keystore YOUR_KEYSTORE_PATH -alias YOUR_KEY_ALIAS -keyalg RSA -keysize 2048 -validity 10000
```

Make sure to replace `YOUR_KEY_ALIAS` with a name for your key, and `YOUR_KEYSTORE_PATH` with the filename you want to use. The file extension can be anything. The keytool will ask you for a password. Everything else it asks for (like name and organization) can be left blank.

### Signing your app

If you are using Gradle to sign (my recommendation), follow my guide on [Signing Android Apps with Gradle](/articles/android-gradle).


If you are using Android Studio, you can sign your app by going to `Build > Generate Signed Bundle / APK`. If you are using the command line, you can sign your app with the following command:

```bash
apksigner sign --ks-key-alias YOUR_KEY_ALIAS --ks YOUR_KEYSTORE_PATH app-release.apk
```

Make sure to replace `YOUR_KEY_ALIAS` and `YOUR_KEYSTORE_PATH` with the values you used above.


### Publishing the fingerprint

You can get the SHA-256 fingerprint of your key with the following command:

```bash
apksigner verify --print-certs app-release.apk
```

This will output something like the following:
```
Signer #1 certificate DN: CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown
Signer #1 certificate SHA-256 digest: 467b191ab3a180cf99db79aef870c52ff2f8ebd5967d4c0e923626a0dc422528
Signer #1 certificate SHA-1 digest: ed9d1cede4e3a4b586655e97993b00c7ba9eb1cd
Signer #1 certificate MD5 digest: 6ecd4e59e7cc26253763ca9590443fa1
```

Grab the SHA-256 digest and add it to the `AllowedAPKSigningKeys` property in your metadata file.

### Publishing the signed apk

F-Droid needs to download your signed APK file from somewhere. The best place to put this file is in a Github release, tagged with the same tag that Fdroid will use pull your source code from. That way it is all connected. If you have never created a release before, you can follow [Github's instructions](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release).

Then put a link in your metadata file to the signed apk file:
```yml
Binaries: https://github.com/username/myapp/releases/download/v%v/MyApp-%v.apk
```

This url uses the `%v` placeholder, which will be replaced with the version name of your app. So if your app's version name is `1.0.1`, the url will be `https://github.com/username/myapp/releases/download/v1.0.1/MyApp-1.0.1.apk`

You can also use the `%c` placeholder, which will be replaced with the version code of your app.


## Testing your build

Push your metadata file to your branch on gitlab, and it will kick off a build. If there are any errors, you can keep pushing changes until it runs successfully.

## Creating a merge request

First create a [Request for Packaging issue](https://gitlab.com/fdroid/rfp/-/issues) for your app. This will let the F-Droid team know that you want your app published. Fill in the minimal template to the best of your ability.

Next, create a merge request on your branch. The merge request should be titled `New app: My App Name`. The description should include a link to the Request for Packaging issue you created above. Once you create the merge request, it will kick off another build, and the Fdroid team will review your app.

## Helpful Links

* [Official Guide](https://f-droid.org/en/docs/Submitting_to_F-Droid_Quick_Start_Guide/)
* [Inclusion Policy](https://f-droid.org/en/docs/Inclusion_Policy/)
* [Full Metadata Reference](https://f-droid.org/en/docs/Build_Metadata_Reference/#Binaries)
* [Reproducible Builds](https://f-droid.org/docs/Reproducible_Builds/)
