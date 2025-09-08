---
title: "Publishing an app on Fdroid"
desc: "A complete guide to publishing an app on Fdroid, including Reproducible builds."
updated: 2025-09-08
tags: ["android"]
---

## What is Fdroid?

[Fdroid](https://fdroid.org/) is an open source app store for Android. While the Google Play Store is full of ads, in app-purchases, and apps that like to request permissions, Fdroid apps generally do not have ads, in-app purchases, or permission requests. All apps on Fdroid are required to be **floss** (free/libre open source software). Fdroid apps tend to be simple, offline, and privacy respecting.

## Why publish on Fdroid?

* The F-Droid app database is tiny compared to the Google Play Store, so your app will get more exposure.
* You can include donation links in your app description.
* You will support the FLOSS community.
* You will learn a lot about your app and android development. F-droid has a very strict publishing process, and will run reports on your dependencies, code, and permissions.

## What are reproducible builds?

Reproducible builds are optional but highly recommended.

Reproducible builds is a way to guarantee that an app was built from the published source code. This is done by building and signing the apk with a key, and publishing the fingerprint of the key. F-Droid will then build the app from the source code, and verify that it built the exact same apk as the one you published.  Luckily, F-Droid and Github together make this process very easy, and this guide will walk you through it.

## 1. Disable dependency metadata

For reproducible builds, we need to disable dependency metadata in the `build.gradle` file. See https://gitlab.com/fdroid/fdroiddata/-/issues/3330 for more details on why this is required.

```kotlin
android {
  ...
  dependenciesInfo {
    includeInApk = false
    includeInBundle = false
  }
  ...
}
```

## 2. Create Metadata

Fdroid uses metadata files to find app descriptions and storefront images. Here is a list of files you should create, at the root of your project:

<img src="/images/fdroid/metadata.png"/>

Ignore the changelogs for now, they will be used for noting changes in your app.

* icon = 512x512
* feature graphic = 1024x500
* screenshots = any size

all images can be png or jpg

* short description = max 80 characters

The title, short description, and long description are shown on the app page in Fdroid, like so:

<img src="/images/fdroid/listing.png"/>


## 3. Build and Sign your app

If you are using **Android Studio**, you can build your app by going to `Build > Generate Signed Bundle / APK`. 

If you are using **Gradle**, you can build your app with `./gradlew assembleRelease`. This will generate an apk file in `app/build/outputs/apk/release/app-release.apk`. See my guide on [Signing Android Apps with Gradle](/articles/android/signing-with-gradle) for more details.

If you are using the **command line**, you can sign your app with the following command:

```bash
apksigner sign --ks-key-alias YOUR_KEY_ALIAS --ks YOUR_KEYSTORE_PATH app-release.apk
```

See my guide on [Signing an Android apk with the command line](/articles/android/signing-with-cmd) for more details.

## 4. Create a Github release

F-Droid needs to download your signed APK file from somewhere. The best place to put this file is in a Github release, tagged with the same tag that Fdroid will use pull your source code from. That way it is all connected. If you have never created a release before, you can follow [Github's instructions](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release).

## 5. Clone the Fdroid repository

Fdroid uses gitlab to host their repositories. You will need to create an account on [gitlab.com](https://gitlab.com/users/sign_in#register-pane) if you don't already have one.

Clone the [Data Repo](https://gitlab.com/fdroid/fdroiddata). This repo holds the metadata for all the apps published on Fdroid.

On your cloned repo, create a new branch for your app. The branch name should be the package name of your app. For example, "com.example.myapp".

## 6. Create your Metadata file

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
CurrentVersion: 1.0.1
CurrentVersionCode: 1
```

Let's go over each section:

### Categories

```yml
Categories:
  - Science & Education
  - Reading
```

The categories your app belongs to. The available categories are Connectivity, Development, Games, Graphics, Internet, Money, Multimedia, Navigation, Phone & SMS, Reading, Science & Education, Security, Sports & Health, System, Theming, Time, Writing

### License

```yml
License: MIT
```

This needs to be an open source license. Some common examples are MIT, GPL-3.0-only, and Apache-2.0.

### Author Details

```yml
AuthorName: John Doe
AuthorEmail: john@example.com
AuthorWebSite: https://example.com
```

These details are optional but recommended.

### Source Code

```yml
SourceCode: https://github.com/username/myapp
IssueTracker: https://github.com/username/myapp/issues
Changelog: https://github.com/username/myapp/releases
```

The `SourceCode` link is required, and should be a link to the source code of your app. The `IssueTracker` and `Changelog` links are optional.

### AutoName

```yml
AutoName: My App Name
```

The name of your app. This is used when F-Droid finds an update for your app, and automatically generates a commit in their repo.

### Repo

```yml
RepoType: git
Repo: https://github.com/username/myapp.git
```

The link to your git repo. This is used to pull your code and build your app. Notice that the URL ends with `.git`. The `Binaries` property is related to [Reproducible Builds](#reproducible-builds) and links to a signed apk file of your app.

### Binaries

```yml
Binaries: https://github.com/username/myapp/releases/download/v%v/MyApp-%v.apk
```

This is where Fdroid will download your signed apk file from. This example uses Github releases, but you can use any file hosting service.

This url uses the `%v` placeholder, which will be replaced with the version name of your app. So if your app's version name is `1.0.1`, the url will be `https://github.com/username/myapp/releases/download/v1.0.1/MyApp-1.0.1.apk`

You can also use the `%c` placeholder, which will be replaced with the version code of your app.

### Builds

```yml
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
```

This is where you specify how to build your app. The `versionName` and `versionCode` properties are the version name and version code of your app. The `commit` property is the git tag or commit hash of the latest version of your app. The `subdir` property is the directory of your app's source code. 

The `sudo` property is a list of commands to run before building. Here we are installing the latest version of Java. This is required for the build to work.

The `gradle` property specifies whether to build with Gradle as opposed to Ant.

### AllowedAPKSigningKeys

```yml
AllowedAPKSigningKeys: 046e269cfdb4816b4ef3d554a63de6be063e40008b524c04397d3b04315eaccd
```

This is the fingerprint of the key used to sign your app. To get this fingerprint, run the following command:

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

You will want to copy the SHA-256 digest and add it to the `AllowedAPKSigningKeys` property in your metadata file.

### Auto Update

```yml
AutoUpdateMode: Version
UpdateCheckMode: Tags
CurrentVersion: 1.0.1
CurrentVersionCode: 1
```

The `AutoUpdateMode` property specifies if F-Droid will check for updates to your app. This should be set to either `Version` or `None`. The `UpdateCheckMode` property specifies how F-Droid will check for updates. It can be set to either `Tags` or `HTTP`, but `Tags` is recommended. The `CurrentVersion` and `CurrentVersionCode` properties are the version name and version code of your app.

### Full Metadata Reference
See the [Full Metadata Reference](https://f-droid.org/en/docs/Build_Metadata_Reference/) for more details on all the properties you can include in your metadata file.


## 7. Testing your build

Push your metadata file to your branch on gitlab, and it will kick off a build. Go to Build -> Pipelines to see the results. If there are any errors, you can keep pushing changes until it runs successfully.

Some potential issues you could run into:
1. Metadata linting failure, meaning your metadata file is formatted incorrectly. This is a common issue since Fdroid expects the properties to be in a specific order. The build output will tell you what it expected, so it is an easy fix.
2. Version mismatch. If the commit tag you specified in your metadata file does not exist, or the version in your gradle file does not match the version in the metadata file, the build will fail. 
3. APK integrity check failed. If the apk you published does not match the apk that Fdroid built, the build will fail. 

## 8. Creating a merge request

Once you have a successful build, it's time to create a merge request.

First create a [Request for Packaging issue](https://gitlab.com/fdroid/rfp/-/issues) for your app. This will let the F-Droid team know that you want your app published. Fill in the minimal template to the best of your ability.

Next, create a merge request on your branch. The merge request should be titled `New app: My App Name`. The description should include a link to the Request for Packaging issue you created above. Once you create the merge request, it will kick off another build, and the Fdroid team will review your app.

## Updating your app after its published

To get your app updated on Fdroid, you will need to do a few things:
1. Update the version name and version code in your gradle build file.
2. Create a new change log in the metadata directory (/metadata/en-US/changelogs/{version code}.txt), and put a description of changes in the file.
3. Tag and create a release on Github with the new version. Make sure you include the signed apk file in the release.
4. Fdroid will automatically see your update, and include it in the next build. This may take a few days or longer to happen.

## Helpful Links

* [Official Guide](https://f-droid.org/en/docs/Submitting_to_F-Droid_Quick_Start_Guide/)
* [Inclusion Policy](https://f-droid.org/en/docs/Inclusion_Policy/)
* [Full Metadata Reference](https://f-droid.org/en/docs/Build_Metadata_Reference/#Binaries)
* [Reproducible Builds](https://f-droid.org/docs/Reproducible_Builds/)
