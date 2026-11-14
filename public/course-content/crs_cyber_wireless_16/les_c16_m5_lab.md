> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C16_Lab_Kit.zip](/downloads/labs/RedKross_C16_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C16/...` refer to the extracted `C16` folder. Everything runs locally against systems you own.

## Practical 1: Map the demo app against the platform model

**Objective:** Identify where the demo app respects or breaks the Android security model.

**Difficulty:** Intermediate.

**Required tools:** LAB_ASSETS/C16 (demo_app/manifest.json, network_security_config.xml, src/MainActivity.txt).

**Prerequisites:** Lessons L01-L05.

**Environment setup:** offline; read the demo app files.

**Explicit authorised scope:** the provided demo app (yours); static reading only.

**Step-by-step instructions:**

1. From the manifest, list the permissions and judge each against least privilege.
2. List the exported components and whether export looks necessary.
3. From the network security config, note how it weakens the network defaults.
4. From the source, note where sensitive data leaves the sandbox (storage, logs, hardcoded key).
5. For each issue, name the MASVS category it falls under.

**Expected observations:** over-requested permissions; exported activities/provider; cleartext + user-CA trust; token to external storage and logs; hardcoded key; weak crypto.

**Troubleshooting:** if unsure of a category, map it with L06's list.

**Cleanup:** none.

**Learning outcome:** you can relate app weaknesses to the platform model and MASVS.

## Practical 2: Design a model-respecting version

**Objective:** Specify how the demo app should store data, request permissions and configure the network.

**Difficulty:** Intermediate.

**Required tools:** this module.

**Prerequisites:** Lessons L03-L05.

**Environment setup:** none.

**Explicit authorised scope:** design exercise.

**Step-by-step instructions:**

1. Specify where the token and secrets should be stored (private/encrypted, keystore).
2. Reduce the permissions to the minimum and justify each remaining one.
3. Specify the network config (no cleartext, system CAs only / pinning).
4. Decide which components must be exported and how to protect them.
5. Explain how each change respects the platform model.

**Expected observations:** private encrypted storage, keystore keys, least-privilege permissions, TLS-only, minimal protected exports.

**Troubleshooting:** if a change still weakens a default, revise it.

**Cleanup:** none.

**Learning outcome:** you can design an app that works with the platform model.
