#!/usr/bin/env node

const { execSync } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');

function runCommand(cmd) {
  try {
    return execSync(cmd, { stdio: 'pipe' }).toString().trim();
  } catch (err) {
    return null;
  }
}

function getJavaVersion() {
  try {
    const output = execSync('java -version 2>&1', { encoding: 'utf8' });
    return output;
  } catch (err) {
    return err.stderr?.toString() || err.stdout?.toString() || err.message;
  }
}

function validateJavaVersion(output) {
  const match = output.match(/version "(17)\.(\d+)\.(\d+)"/);
  return match ? match[0] : null;
}

function checkInstalledSoftware() {
  console.log('🧰 Checking dependencies...\n');
  const checks = [
    { name: 'Node.js', cmd: 'node -v', validate: (v) => parseFloat(v.slice(1)) >= 18 },
    { name: 'npm', cmd: 'npm -v' },
    { name: 'npx', cmd: 'npx -v' },
    { name: 'Java Compiler (javac)', cmd: 'javac -version' },
    { name: 'ADB', cmd: 'adb version' },
  ];

  checks.forEach(({ name, cmd, validate }) => {
    const output = runCommand(cmd);
    if (output && (!validate || validate(output))) {
      console.log(`✅ ${name}: ${output.split('\n')[0]}`);
    } else {
      console.log(`❌ ${name} not properly installed or version mismatch.`);
    }
  });

  const javaOutput = getJavaVersion();
  const javaVersion = validateJavaVersion(javaOutput);
  if (javaVersion) {
    console.log(`✅ Java: ${javaVersion}`);
  } else {
    console.log("❌ Java not properly installed or version mismatch.");
  }
}

function checkEnvVars() {
  console.log('\n🔍 Checking environment variables...\n');
  const envs = ['JAVA_HOME', 'ANDROID_HOME'];
  envs.forEach((env) => {
    if (process.env[env]) {
      console.log(`✅ ${env} = ${process.env[env]}`);
    } else {
      console.log(`❌ ${env} not set.`);
    }
  });

  const platformTools = path.join(process.env.ANDROID_HOME || '', 'platform-tools');
  if (fs.existsSync(platformTools)) {
    console.log(`✅ platform-tools found at ${platformTools}`);
  } else {
    console.log(`❌ platform-tools not found.`);
  }
}

function checkAndroidSdk() {
  console.log('\n📦 Checking Android SDK components...');
  const sdkManager = path.join(process.env.ANDROID_HOME || '', 'cmdline-tools', 'latest', 'bin', 'sdkmanager.bat');
  if (fs.existsSync(sdkManager)) {
    const output = runCommand(`"${sdkManager}" --list`);
    if (output?.includes('platforms;android-35')) {
      console.log('✅ Android SDK Platform 35 is installed.');
    } else {
      console.log('❌ Android SDK Platform 35 is missing.');
    }
    if (output?.includes('build-tools;35.0.0')) {
      console.log('✅ Build Tools 35.0.0 is installed.');
    } else {
      console.log('❌ Build Tools 35.0.0 is missing.');
    }
  } else {
    console.log('❌ sdkmanager not found. Check if cmdline-tools are installed.');
  }
}

function main() {
  console.log(`🖥️ Host OS: ${os.type()} ${os.release()}`);
  if (os.platform() !== 'win32') {
    console.error('❌ This tool only supports Windows for now.');
    return;
  }

  checkInstalledSoftware();
  checkEnvVars();
  checkAndroidSdk();

  console.log('\n✅ React Native environment check completed.');
}

main();
