**User activity:**

- Shell history (~/.bash_history, ~/.zsh_history). It is written when a shell exits, has no timestamps unless HISTTIMEFORMAT was set, and is easily disabled (unset HISTFILE) or deleted. A missing or empty history for an active account is itself notable.
- ~/.ssh/authorized_keys (keys allowed to log in), known_hosts (hosts this account connected to), and ~/.ssh/config.
- Recently modified files in home directories, /tmp, /var/tmp and /dev/shm, which are common staging places.

**Persistence locations to check:**

- cron: /etc/crontab, `/etc/cron.*,` /var/spool/cron/crontabs/<user>.
- systemd units: /etc/systemd/system, ~/.config/systemd/user, and timers.
- Shell start-up files: ~/.bashrc, ~/.profile, /etc/profile.d/.
- SSH: added authorized_keys entries.
- New accounts or UID 0 accounts: /etc/passwd, /etc/shadow, /etc/sudoers and /etc/sudoers.d/.
- Library preloading: /etc/ld.so.preload (rarely legitimate).
- Package integrity: dpkg -V or rpm -Va compares installed files with package metadata (Course 03 Module 8), which catches replaced binaries unless the attacker also altered the database.

Compare the file-system timeline (Module 3) for these paths with login sessions in auth.log to see which session created them.
