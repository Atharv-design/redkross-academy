"""Unit tests for rkloga (run: python -m unittest -v)."""
import tempfile
import unittest
from datetime import timedelta
from pathlib import Path

import rkloga

F = "2026-11-07T10:00:{:02d}Z sshd[1]: Failed password for {} from 203.0.113.7 port 5000"
OK = "2026-11-07T10:05:00Z sshd[2]: Accepted password for chen from 203.0.113.7 port 5001"


def write_temp(lines):
    with tempfile.NamedTemporaryFile("w", delete=False, suffix=".log", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")
    return Path(fh.name)


class ParseTests(unittest.TestCase):
    def test_valid_failed_line(self):
        ev = rkloga.parse_line(F.format(1, "asha"))
        self.assertEqual((ev.result, ev.user, ev.ip), ("Failed", "asha", "203.0.113.7"))

    def test_invalid_user_phrase(self):
        self.assertEqual(rkloga.parse_line(F.format(2, "invalid user admin")).user, "admin")

    def test_garbage_and_oversized_lines_rejected(self):
        self.assertIsNone(rkloga.parse_line("hello world"))
        self.assertIsNone(rkloga.parse_line("x" * 5000))

    def test_suspicious_user_text_rejected(self):
        self.assertIsNone(rkloga.parse_line(F.format(3, "bob; rm -rf /")))


class AnalyseTests(unittest.TestCase):
    def events(self, lines):
        return [rkloga.parse_line(line) for line in lines]

    def test_spray_detected_once(self):
        evs = self.events([F.format(i, u) for i, u in enumerate(["a", "b", "c", "d"])])
        r = rkloga.analyse(evs, timedelta(minutes=5), 3)
        self.assertEqual([f["type"] for f in r["findings"]], ["spray"])

    def test_success_after_failure(self):
        r = rkloga.analyse(self.events([F.format(1, "chen"), OK]), timedelta(minutes=5), 3)
        self.assertEqual(r["findings"][0]["type"], "success_after_failure")

    def test_no_findings_for_single_failure(self):
        r = rkloga.analyse(self.events([F.format(1, "asha")]), timedelta(minutes=5), 3)
        self.assertEqual(r["findings"], [])


class CliTests(unittest.TestCase):
    def test_missing_file_returns_2(self):
        self.assertEqual(rkloga.main(["no_such_file.log"]), 2)

    def test_bad_arguments_return_2(self):
        p = write_temp([F.format(1, "asha")])
        try:
            self.assertEqual(rkloga.main([str(p), "--spray-users", "1"]), 2)
        finally:
            p.unlink()

    def test_findings_return_1(self):
        p = write_temp([F.format(1, "chen"), OK])
        try:
            self.assertEqual(rkloga.main([str(p)]), 1)
        finally:
            p.unlink()


if __name__ == "__main__":
    unittest.main()
