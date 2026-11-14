```text
/var/log/auth.log (Debian, Ubuntu) or /var/log/secure (RHEL family)
      sshd logins (Accepted password/publickey, Failed password, Invalid
      user), sudo commands, su, PAM messages.
systemd journal  binary logs read with journalctl. Useful options:
      --since/--until, -u <unit>, _COMM=sshd, -o short-iso-precise, --utc.
      It may be volatile (/run/log/journal) unless persistent storage
      (/var/log/journal) is configured.
wtmp, btmp, lastlog  binary login records: "last" reads wtmp (sessions),
      "lastb" reads btmp (failed logins), "lastlog" shows each account's
      most recent login.
/var/log/syslog or messages, kern.log, cron logs, and application logs
      (web server access and error logs, database logs).
auditd (/var/log/audit/audit.log)  if configured, records syscalls,
      file watches and command execution with an audit ID linking
      records of one event.
```

Classic syslog timestamps have no year and no time zone (Course 08 Module 3). Record the host's time zone (timedatectl) and clock offset during collection, and state the assumption you make when parsing. On a copied disk image, read logs offline; on a live system, copy them first and hash the copies.

**Attackers tamper with logs:** truncating files, deleting lines, or stopping logging. Look for gaps in otherwise regular activity, file sizes smaller than rotation would explain, and differences from logs already forwarded to a central server.
