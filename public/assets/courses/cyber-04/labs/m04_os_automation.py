"""RedKross Academy C04-M04 - OS automation: paths, processes, subprocess safety.

Tested: CPython 3.14.4, Windows 11, 2026-11-07. Uses only harmless commands.
"""
import os
import platform
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

# 1. Environment and platform facts
print("1.", platform.system(), platform.release(), "| python:", sys.version.split()[0])
print("   cwd is absolute:", Path.cwd().is_absolute(), "| PATH entries:",
      len(os.environ.get("PATH", "").split(os.pathsep)))

# 2. Walk a folder and find files by pattern and size
work = Path(tempfile.mkdtemp(prefix="rk-m04-"))
for name, size in [("a.log", 10), ("b.log", 2000), ("notes.txt", 5), ("sub/c.log", 300)]:
    p = work / name
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_bytes(b"x" * size)
logs = sorted(work.rglob("*.log"))
print("2.", [str(p.relative_to(work)).replace("\\", "/") for p in logs],
      "| over 100 bytes:", [p.name for p in logs if p.stat().st_size > 100])

# 3. Path traversal check: keep user-supplied names inside a base folder
def safe_join(base: Path, user_name: str) -> Path:
    target = (base / user_name).resolve()
    if not target.is_relative_to(base.resolve()):
        raise ValueError(f"path escapes base folder: {user_name!r}")
    return target

for name in ["sub/c.log", "../../Windows/win.ini"]:
    try:
        print("3. ok:", safe_join(work, name).name)
    except ValueError as err:
        print("3. blocked:", err)

# 4. subprocess: run a program safely with an argument list
result = subprocess.run([sys.executable, "-c", "print('hello from child')"],
                        capture_output=True, text=True, timeout=10, check=True)
print("4. rc =", result.returncode, "| stdout:", result.stdout.strip())

# 5. Why shell=True with untrusted input is dangerous (harmless demo)
user_input = "report.txt & echo INJECTED"
shell_cmd = f"echo processing {user_input}"
unsafe = subprocess.run(shell_cmd, shell=True, capture_output=True, text=True, timeout=10)
print("5. shell=True output lines:", [l.strip() for l in unsafe.stdout.splitlines()])
safe = subprocess.run([sys.executable, "-c", "import sys; print('processing', sys.argv[1])",
                       user_input], capture_output=True, text=True, timeout=10)
print("   list args output:", safe.stdout.strip())

# 6. Timeouts and error handling
try:
    subprocess.run([sys.executable, "-c", "import time; time.sleep(5)"], timeout=1)
except subprocess.TimeoutExpired as err:
    print("6. timeout after", err.timeout, "s")
try:
    subprocess.run([sys.executable, "-c", "import sys; sys.exit(3)"], check=True)
except subprocess.CalledProcessError as err:
    print("   non-zero exit detected:", err.returncode)
print("   shutil.which('python') found:", shutil.which("python") is not None)

shutil.rmtree(work)
print("7. cleaned up:", not work.exists())
