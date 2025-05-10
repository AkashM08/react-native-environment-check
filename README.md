# react-native-environment-check
Check if React Native environment is properly set up on Windows.
# React Native Environment Checker for Windows

A simple CLI tool to verify that your Windows system is properly configured for React Native development.

---

## ✅ What It Checks

- Node.js (version >= 18)
- npm and npx availability
- Java (JDK 17.x)
- Java Compiler (javac)
- Android Debug Bridge (adb)
- Environment variables: `JAVA_HOME`, `ANDROID_HOME`
- Existence of `platform-tools` folder
- Android SDK components:
  - Android SDK Platform 35
  - Android Build Tools 35.0.0

---

## 🚀 Installation

### Local
```bash
npm install
```

### Global (as CLI tool)
```bash
npm install -g .
```

Or, if published:
```bash
npm install -g react-native-environment-check
```

---

## 📦 Usage

```bash
rn-env-check
```

Example output:
```
🖥️ Host OS: Windows_NT 10.0.22621
🧰 Checking dependencies...
✅ Node.js: v18.16.0
✅ npm: 9.6.7
✅ npx: 9.6.7
✅ Java Compiler (javac): javac 17.0.15
✅ ADB: Android Debug Bridge version 1.0.41
✅ Java: version "17.0.15"

🔍 Checking environment variables...
✅ JAVA_HOME = C:\Program Files\Microsoft\jdk-17
✅ ANDROID_HOME = C:\Users\you\AppData\Local\Android\Sdk
✅ platform-tools found at C:\Users\you\AppData\Local\Android\Sdk\platform-tools

📦 Checking Android SDK components...
✅ Android SDK Platform 35 is installed.
✅ Build Tools 35.0.0 is installed.

✅ React Native environment check completed.
```

---

## 🙋 FAQ

### Why is Java not detected?
Java writes its version info to `stderr`, so this tool captures and parses it carefully. Ensure JDK 17 is installed and `JAVA_HOME` is properly set.

---

## 🔧 Requirements
- Windows OS (10/11)
- Node.js >= 18
- JDK 17
- Android Studio
- Chocolatey (optional for package management)

---

## 📄 License

MIT License © 2025 Akash Muttoor

