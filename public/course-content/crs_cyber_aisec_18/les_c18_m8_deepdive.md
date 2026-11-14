Commands (run in LAB_ASSETS/C18/banyanbot on your own computer):

```text
python supply_check.py              > ev_supply.txt
python kb_audit.py                  > ev_kb_audit.txt
python -m unittest -v tool_policy_test 2> ev_tool_tests.txt
python retrieval_trace.py           > ev_retrieval.txt
python probes.py 20                 > ev_probes.txt
python summarise.py                 > ev_summary.txt
python report.py                    > ev_report.txt
```

Then hash them (certutil -hashfile <file> SHA256 on Windows, sha256sum on Linux/macOS) and list the hashes in the report appendix. Record the Ollama version, the model digest from ev_supply.txt, Python version, date and the Git commit of the bench. Expected structure of the results is shown in Modules 2-7; your counts will differ by model, hardware and seed count.
