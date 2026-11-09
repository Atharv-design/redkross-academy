import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

# ==============================================================================
# COLOR PALETTE: ELECTRIC AMBER ORANGE + DEEP OBSIDIAN BLACK
# ==============================================================================
COLOR_BG_PAGE = colors.HexColor('#07090E')        # Deep obsidian black
COLOR_BG_CARD = colors.HexColor('#0D121D')        # Dark slate card
COLOR_BG_CODE = colors.HexColor('#030508')        # Pure console terminal black
COLOR_BORDER_AMBER = colors.HexColor('#F59E0B')   # Electric Amber
COLOR_BORDER_ORANGE = colors.HexColor('#D97706')  # Dark Amber / Orange
COLOR_BORDER_SUBTLE = colors.HexColor('#1E293B')  # Dark charcoal border

COLOR_AMBER_BRIGHT = colors.HexColor('#F59E0B')   # Bright Amber #F59E0B
COLOR_AMBER_LIGHT = colors.HexColor('#FDE68A')    # Light Amber font
COLOR_ORANGE_GLOW = colors.HexColor('#FB923C')    # Orange glow
COLOR_WHITE = colors.HexColor('#FFFFFF')          # Crisp white text
COLOR_TEXT_LIGHT = colors.HexColor('#E2E8F0')     # Readable body text
COLOR_TEXT_MUTED = colors.HexColor('#94A3B8')     # Slate secondary text
COLOR_CMD_GREEN = colors.HexColor('#34D399')      # Terminal output green

class ObsidianAmberCanvas(canvas.Canvas):
    """
    Two-pass canvas that applies the full obsidian page background,
    amber top glow bar, running header/footer rules, and exact page numbers.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, total_pages):
        self.saveState()
        # Full page background fill
        self.setFillColor(COLOR_BG_PAGE)
        self.rect(0, 0, 595.27, 841.89, fill=1, stroke=0)

        # Top illuminated amber accent bar
        self.setFillColor(COLOR_BORDER_AMBER)
        self.rect(0, 836, 595.27, 6, fill=1, stroke=0)

        # Running header border line
        self.setStrokeColor(COLOR_BORDER_ORANGE)
        self.setLineWidth(0.8)
        self.line(26, 814, 569, 814)

        # Header running labels
        self.setFillColor(COLOR_AMBER_BRIGHT)
        self.setFont('Helvetica-Bold', 7.5)
        self.drawString(26, 820, 'REDKROSS DEFENSIVE CYBERSECURITY ACADEMY')
        self.setFont('Helvetica', 7.5)
        self.setFillColor(COLOR_TEXT_MUTED)
        self.drawRightString(569, 820, 'VERIFIED PRACTICAL TOOLS & COMMAND VAULT')

        # Footer border line
        self.setStrokeColor(COLOR_BORDER_SUBTLE)
        self.setLineWidth(0.8)
        self.line(26, 26, 569, 26)

        # Footer running labels
        self.setFillColor(COLOR_TEXT_MUTED)
        self.setFont('Helvetica', 7.5)
        self.drawString(26, 17, 'CONFIDENTIAL // OFFICIAL STUDENT LAB EXECUTION BLUEPRINT')
        self.setFont('Helvetica-Bold', 7.5)
        self.setFillColor(COLOR_AMBER_BRIGHT)
        self.drawRightString(569, 17, f'PAGE {self._pageNumber} OF {total_pages}')

        self.restoreState()


def build_tools_pdf(output_pdf_path):
    doc = SimpleDocTemplate(
        output_pdf_path,
        pagesize=A4,
        leftMargin=26,
        rightMargin=26,
        topMargin=26,
        bottomMargin=24
    )

    styles = getSampleStyleSheet()

    # Custom Typography Styles - calibrated for high information density & zero orphan pages
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15.5,
        leading=19,
        textColor=COLOR_AMBER_BRIGHT,
        alignment=1, # Center
        spaceAfter=2
    )

    module_header_style = ParagraphStyle(
        'ModuleHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=14,
        textColor=COLOR_AMBER_BRIGHT,
        spaceBefore=1,
        spaceAfter=2
    )

    chapter_title_style = ParagraphStyle(
        'ChapterTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=COLOR_WHITE,
        spaceAfter=2
    )

    tool_link_style = ParagraphStyle(
        'ToolLink',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=COLOR_TEXT_LIGHT,
        spaceAfter=3
    )

    mission_style = ParagraphStyle(
        'MissionText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=COLOR_TEXT_LIGHT,
        spaceAfter=4
    )

    step_header_style = ParagraphStyle(
        'StepHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=COLOR_ORANGE_GLOW,
        spaceBefore=1.5,
        spaceAfter=1.5
    )

    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.5,
        leading=9.5,
        textColor=COLOR_AMBER_LIGHT,
        spaceAfter=1.5
    )

    result_style = ParagraphStyle(
        'ResultStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=COLOR_CMD_GREEN,
        spaceAfter=1.5
    )

    story = []

    # ==========================================================================
    # COVER / HERO HEADER BANNER
    # ==========================================================================
    cover_data = [
        [
            Paragraph(
                "<b><font color='#F59E0B'>REDKROSS DEFENSIVE CYBERSECURITY ACADEMY</font></b><br/>"
                "<b><font color='#FFFFFF' size='14'>PRACTICAL LAB MANUAL: COMPLETE TOOLS & COMMAND ROADMAP</font></b><br/>"
                "<font color='#94A3B8' size='7.5'>Step-by-Step Hands-On Blueprint for Modules 1 to 6 | 100% Executable Commands | Zero Fluff</font>",
                title_style
            )
        ]
    ]
    cover_table = Table(cover_data, colWidths=[543])
    cover_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), COLOR_BG_CARD),
        ('BOX', (0, 0), (-1, -1), 1.5, COLOR_BORDER_AMBER),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(cover_table)
    story.append(Spacer(1, 5))

    def make_card_table(chapter_name, tool_name, tool_link, what_to_perform, steps_list):
        """Builds a single self-contained card table with tight padding."""
        card_content = []

        # Chapter Title
        card_content.append(Paragraph(f"<b>{chapter_name}</b>", chapter_title_style))

        # Tool and Official Link
        link_html = f"<b><font color='#F59E0B'>Tool:</font></b> <font color='#FFFFFF'><b>{tool_name}</b></font> &nbsp;|&nbsp; <b><font color='#F59E0B'>Official Link:</font></b> <a href='{tool_link}' color='#F59E0B'><u>{tool_link}</u></a>"
        card_content.append(Paragraph(link_html, tool_link_style))

        # Kya Karna Hoga (Practical Task)
        mission_html = f"<b><font color='#FB923C'>Kya Karna Hoga (Practical Task):</font></b> {what_to_perform}"
        card_content.append(Paragraph(mission_html, mission_style))

        # Steps Header
        card_content.append(Paragraph("<b><font color='#F59E0B'>Wo Karne Ke Liye Steps (Installation to Final Result):</font></b>", step_header_style))

        for step in steps_list:
            s_title = step.get('title', '')
            s_cmd = step.get('cmd', '')
            s_res = step.get('result', '')

            card_content.append(Paragraph(f"<b><font color='#FDE68A'>&gt; {s_title}</font></b>", step_header_style))

            if s_cmd:
                cmd_table_data = [[Paragraph(f"<font color='#FDE68A'>$ {s_cmd}</font>", code_style)]]
                cmd_table = Table(cmd_table_data, colWidths=[525])
                cmd_table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, -1), COLOR_BG_CODE),
                    ('BOX', (0, 0), (-1, -1), 0.5, COLOR_BORDER_SUBTLE),
                    ('LINELEFT', (0, 0), (-1, -1), 2.2, COLOR_BORDER_AMBER),
                    ('LEFTPADDING', (0, 0), (-1, -1), 6),
                    ('RIGHTPADDING', (0, 0), (-1, -1), 4),
                    ('TOPPADDING', (0, 0), (-1, -1), 2),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
                ]))
                card_content.append(cmd_table)
                card_content.append(Spacer(1, 1.5))

            if s_res:
                res_html = f"<b><font color='#34D399'>Expected Output / Final Result:</font></b> <font color='#CBD5E1'>{s_res}</font>"
                card_content.append(Paragraph(res_html, result_style))

        card_wrapper = Table([[card_content]], colWidths=[543])
        card_wrapper.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), COLOR_BG_CARD),
            ('BOX', (0, 0), (-1, -1), 1, COLOR_BORDER_ORANGE),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 3),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ]))
        return card_wrapper

    def make_module_banner_table(module_title, module_desc):
        banner_data = [
            [
                Paragraph(
                    f"<b><font color='#F59E0B' size='10.5'>[#] {module_title.upper()}</font></b><br/>"
                    f"<font color='#94A3B8' size='7.5'>{module_desc}</font>",
                    module_header_style
                )
            ]
        ]
        banner_table = Table(banner_data, colWidths=[543])
        banner_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#161B29')),
            ('LINELEFT', (0, 0), (-1, -1), 3.5, COLOR_BORDER_AMBER),
            ('BOX', (0, 0), (-1, -1), 0.6, COLOR_BORDER_SUBTLE),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ]))
        return banner_table

    def add_module_section(banner_title, banner_desc, chapters_list):
        """
        Binds the module banner with the first chapter in a KeepTogether
        to prevent orphan module headers, then appends remaining chapters.
        """
        banner_tbl = make_module_banner_table(banner_title, banner_desc)
        first_chap = chapters_list[0]
        first_card_tbl = make_card_table(
            first_chap['name'], first_chap['tool'], first_chap['link'],
            first_chap['task'], first_chap['steps']
        )

        story.append(KeepTogether([banner_tbl, Spacer(1, 4), first_card_tbl, Spacer(1, 3)]))

        for chap in chapters_list[1:]:
            c_tbl = make_card_table(
                chap['name'], chap['tool'], chap['link'],
                chap['task'], chap['steps']
            )
            story.append(KeepTogether([c_tbl, Spacer(1, 3)]))

    # --- MODULE 1 ---
    m1_chapters = [
        {
            "name": "Chapter 1: 1.1 What Is Cybersecurity? & Network Baseline",
            "tool": "cURL & OpenSSL",
            "link": "https://curl.se/ | https://www.openssl.org/",
            "task": "Target web server ke HTTP response headers (HSTS, CSP) inspect karna aur live TLS 1.3 cryptographic certificate handshake audit perform karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y curl openssl dnsutils",
                    "result": "Packages successfully installed; binaries available in system PATH."
                },
                {
                    "title": "Step 2: Inspect Web Security Headers",
                    "cmd": "curl -I https://redkross.org.in",
                    "result": "HTTP/2 200 response with strict-transport-security and x-content-type-options headers confirmed."
                },
                {
                    "title": "Step 3: Audit TLS 1.3 Cryptographic Handshake (Ending Final Result)",
                    "cmd": "openssl s_client -connect redkross.org.in:443 -servername redkross.org.in -tls1_3",
                    "result": "Terminal outputs: 'Cipher is TLS_AES_256_GCM_SHA384' and 'Verify return code: 0 (ok)'."
                }
            ]
        },
        {
            "name": "Chapter 2: 1.2 History of Major Incidents & Traffic Analysis",
            "tool": "TShark / Wireshark",
            "link": "https://www.wireshark.org/",
            "task": "Network interface pe live packets capture karna aur TCP SYN flags wa HTTP request URIs filter karke anomalous traffic analyze karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y tshark",
                    "result": "TShark packet capture utility ready."
                },
                {
                    "title": "Step 2: Capture Live Network Packets to File",
                    "cmd": "sudo tshark -i any -c 20 -f 'tcp port 80 or tcp port 443' -w /tmp/lab_traffic.pcap",
                    "result": "Captured 20 packets written cleanly to /tmp/lab_traffic.pcap."
                },
                {
                    "title": "Step 3: Filter & Parse HTTP/TCP Sessions (Ending Final Result)",
                    "cmd": "tshark -r /tmp/lab_traffic.pcap -Y 'tcp.flags.syn==1' -T fields -e ip.src -e ip.dst -e tcp.dstport",
                    "result": "Structured terminal list displaying source IP, destination IP, and destination ports (80/443)."
                }
            ]
        },
        {
            "name": "Chapter 3: 1.3 Assets and Data Types & Network Inventory",
            "tool": "Nmap (Network Mapper)",
            "link": "https://nmap.org/",
            "task": "Local network range scan karke active live hosts discover karna aur open ports/services ka exact software version extract karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y nmap",
                    "result": "Nmap scanning engine ready."
                },
                {
                    "title": "Step 2: Subnet Host Discovery (Ping Sweep)",
                    "cmd": "nmap -sn 192.168.1.0/24 -oN /tmp/active_hosts.txt",
                    "result": "Reports all active connected IP addresses with latency metrics."
                },
                {
                    "title": "Step 3: Service Version & Default Script Interrogation (Ending Final Result)",
                    "cmd": "nmap -sV -sC -p 22,80,443 127.0.0.1",
                    "result": "Outputs open ports: 22/tcp OpenSSH 8.9p1, 80/tcp nginx 1.18.0; host state 'Host is up'."
                }
            ]
        },
        {
            "name": "Chapter 4: 1.4 Attack Surface & Passive OSINT",
            "tool": "theHarvester",
            "link": "https://github.com/laramies/theHarvester",
            "task": "Target domain ka external attack surface passively enumerate karna bina target infrastructure ko touch kiye (subdomains, emails, DNS).",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y theharvester",
                    "result": "theHarvester OSINT engine ready."
                },
                {
                    "title": "Step 2: Passive Subdomain & Perimeter Enumeration",
                    "cmd": "theHarvester -d redkross.org.in -b crtsh,duckduckgo -l 100 -f /tmp/attack_surface",
                    "result": "Certificate transparency search executed across crt.sh and search indexes."
                },
                {
                    "title": "Step 3: View Discovered Surface Assets (Ending Final Result)",
                    "cmd": "cat /tmp/attack_surface.json | grep -i 'hosts'",
                    "result": "Outputs list of discovered public subdomains and associated external A-records."
                }
            ]
        },
        {
            "name": "Chapter 5: 1.5 Security, Privacy, and Safety",
            "tool": "Tor & Proxychains-NG",
            "link": "https://www.torproject.org/ | https://github.com/rofl0r/proxychains-ng",
            "task": "Outbound terminal connections ko Onion Routing circuit se tunnel karna taaki real origin IP mask ho aur telemetry leak na ho.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y tor proxychains4",
                    "result": "Tor SOCKS5 daemon and proxychains-ng wrapper installed."
                },
                {
                    "title": "Step 2: Start Tor SOCKS5 Service Daemon",
                    "cmd": "sudo systemctl restart tor && sudo systemctl status tor --no-pager",
                    "result": "Tor service active and listening on local socket 127.0.0.1:9050."
                },
                {
                    "title": "Step 3: Route Terminal Request & Verify Masked IP (Ending Final Result)",
                    "cmd": "proxychains4 curl -s https://api.ipify.org",
                    "result": "Terminal outputs Tor exit relay IP address, confirming zero origin IP leakage."
                }
            ]
        },
        {
            "name": "Chapter 6: 1.6 Cyber Ecosystem and Threat Actors",
            "tool": "AlienVault OTX CLI & STIX/TAXII",
            "link": "https://otx.alienvault.com/ | https://oasis-open.github.io/cti-documentation/",
            "task": "Threat intelligence pulse feeds se malicious Indicators of Compromise (IoCs) aur threat adversary attribution query karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt install -y jq curl && pip install OTX-Python-SDK",
                    "result": "Python SDK and JSON processor ready."
                },
                {
                    "title": "Step 2: Query Malicious IP Reputation Feed (Ending Final Result)",
                    "cmd": "curl -s 'https://otx.alienvault.com/api/v1/indicators/IPv4/198.51.100.1/general' | jq '{indicator: .indicator, pulses: .pulse_info.count}'",
                    "result": "Parsed JSON outputs indicator IP, associated threat pulse count, and adversary tags."
                }
            ]
        },
        {
            "name": "Chapter 7: 1.7 Cybersecurity Terminology & Linux Security CLI",
            "tool": "Core Linux Security Utilities (ss, lsof, chmod)",
            "link": "https://www.gnu.org/software/coreutils/ | https://github.com/iproute2/iproute2",
            "task": "System ke open listening sockets inspect karna, unke process bindings trace karna aur sensitive credentials pe strict permission enforce karna.",
            "steps": [
                {
                    "title": "Step 1: Audit Active TCP/UDP Listening Sockets",
                    "cmd": "ss -tulnp",
                    "result": "Displays all listening ports, protocols, and owning process PIDs."
                },
                {
                    "title": "Step 2: Identify Process Binding to Port",
                    "cmd": "sudo lsof -i :22 -P -n",
                    "result": "Outputs sshd PID, user root, and socket state LISTEN."
                },
                {
                    "title": "Step 3: Enforce POSIX Permission Lockdown (Ending Final Result)",
                    "cmd": "sudo chmod 600 /etc/shadow && sudo chown root:root /etc/shadow && ls -l /etc/shadow",
                    "result": "File permission displays '-rw------- 1 root root', blocking unauthorized credential access."
                }
            ]
        }
    ]

    add_module_section(
        "Tools for Modules 1: Module 1 - Fountion Lesson",
        "Master foundational cybersecurity tools: Network diagnostics, traffic capture, asset mapping, OSINT, and CLI security hardening.",
        m1_chapters
    )

    # --- MODULE 2 ---
    m2_chapters = [
        {
            "name": "Chapter 1: 2.1 The CIA Triad Deep Dive (Integrity & Confidentiality)",
            "tool": "sha256sum & OpenSSL AES-256",
            "link": "https://www.openssl.org/",
            "task": "SHA-256 cryptographic checksums se data integrity verify karna aur AES-256-CBC with PBKDF2 encryption se confidentiality enforce karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y coreutils openssl",
                    "result": "Core cryptographic utilities ready."
                },
                {
                    "title": "Step 2: Generate Integrity Hash & Encrypt Asset",
                    "cmd": "echo 'CONFIDENTIAL ASSET - REDKROSS' > /tmp/asset.txt && sha256sum /tmp/asset.txt > /tmp/asset.sha256 && openssl enc -aes-256-cbc -salt -pbkdf2 -iter 100000 -in /tmp/asset.txt -out /tmp/asset.enc -k SecurePass#2026",
                    "result": "Asset encrypted with AES-256-CBC; SHA-256 baseline hash stored."
                },
                {
                    "title": "Step 3: Decrypt & Cryptographically Verify Integrity (Ending Final Result)",
                    "cmd": "openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -in /tmp/asset.enc -out /tmp/asset.dec -k SecurePass#2026 && sha256sum -c /tmp/asset.sha256",
                    "result": "Terminal outputs '/tmp/asset.txt: OK' confirming zero data tampering."
                }
            ]
        },
        {
            "name": "Chapter 2: 2.2 AAA Framework & Non-Repudiation",
            "tool": "GnuPG (GPG)",
            "link": "https://gnupg.org/",
            "task": "RSA-4096 asymmetric keypair create karna, incident report ko detached digital signature se sign karna aur authenticity prove karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y gnupg",
                    "result": "GnuPG cryptography suite ready."
                },
                {
                    "title": "Step 2: Generate Asymmetric Keypair & Sign Incident Report",
                    "cmd": "gpg --batch --passphrase '' --quick-generate-key 'analyst@redkross.org' rsa4096 default 1y && echo 'INCIDENT REPORT #104: VERIFIED CLEAN' > /tmp/report.txt && gpg --yes --armor --detach-sign /tmp/report.txt",
                    "result": "Created detached cryptographic signature /tmp/report.txt.asc."
                },
                {
                    "title": "Step 3: Cryptographic Signature Verification (Ending Final Result)",
                    "cmd": "gpg --verify /tmp/report.txt.asc /tmp/report.txt",
                    "result": "Terminal confirms 'gpg: Good signature from \"analyst@redkross.org\"', establishing legal non-repudiation."
                }
            ]
        },
        {
            "name": "Chapter 3: 2.3 Principle of Least Privilege (PoLP)",
            "tool": "Sudoers (visudo) & POSIX ACLs",
            "link": "https://www.sudo.ws/ | https://savannah.nongnu.org/projects/acl",
            "task": "User ko sirf ek specific administrative command allow karna aur log files pe granular read-only access grant karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & User Setup",
                    "cmd": "sudo apt update && sudo apt install -y sudo acl && sudo useradd -m -s /bin/bash soc_intern",
                    "result": "Created restricted system account 'soc_intern'."
                },
                {
                    "title": "Step 2: Configure Granular Command Privilege & ACL",
                    "cmd": "echo 'soc_intern ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx' | sudo tee /etc/sudoers.d/soc_intern && sudo chmod 440 /etc/sudoers.d/soc_intern && sudo setfacl -m u:soc_intern:r-- /var/log/syslog",
                    "result": "Single command permitted without root escalation; syslog ACL applied."
                },
                {
                    "title": "Step 3: Test Enforcement (Ending Final Result)",
                    "cmd": "sudo -u soc_intern sudo /usr/bin/systemctl restart nginx && getfacl /var/log/syslog",
                    "result": "Nginx restarts cleanly; attempting 'sudo /bin/bash' is rejected with 'user not allowed'."
                }
            ]
        },
        {
            "name": "Chapter 4: 2.4 Defense in Depth Architecture",
            "tool": "UFW Firewall & Fail2ban",
            "link": "https://launchpad.net/ufw | https://github.com/fail2ban/fail2ban",
            "task": "Host perimeter pe default-deny incoming packet filtering deploy karna aur automated brute-force IP banning jail configure karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y ufw fail2ban",
                    "result": "UFW stateful firewall and Fail2ban IPS installed."
                },
                {
                    "title": "Step 2: Deploy Layered Firewall & IPS Policy",
                    "cmd": "sudo ufw default deny incoming && sudo ufw default allow outgoing && sudo ufw allow 22/tcp && sudo ufw allow 443/tcp && sudo ufw --force enable && sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local && sudo systemctl restart fail2ban",
                    "result": "Firewall rules activated; Fail2ban monitoring authentication logs."
                },
                {
                    "title": "Step 3: Verify Multi-Layer Defense Status (Ending Final Result)",
                    "cmd": "sudo ufw status verbose && sudo fail2ban-client status sshd",
                    "result": "UFW shows 'Status: active (incoming deny)'; Fail2ban reports 'Jail sshd is active'."
                }
            ]
        },
        {
            "name": "Chapter 5: 2.5 Zero Trust Architecture (ZTA)",
            "tool": "OpenSSL Mutual TLS (mTLS)",
            "link": "https://www.openssl.org/",
            "task": "Root CA generate karke server aur client dono ke certificates sign karna aur mutual cryptographic authentication enforce karna.",
            "steps": [
                {
                    "title": "Step 1: Generate Root Certificate Authority (CA)",
                    "cmd": "openssl req -x509 -newkey rsa:4096 -days 365 -nodes -keyout /tmp/ca.key -out /tmp/ca.crt -subj '/CN=ZeroTrustRootCA'",
                    "result": "Zero Trust Root CA key and certificate generated."
                },
                {
                    "title": "Step 2: Generate & Sign Client Certificate",
                    "cmd": "openssl req -newkey rsa:2048 -nodes -keyout /tmp/cli.key -out /tmp/cli.csr -subj '/CN=analyst.zt.local' && openssl x509 -req -in /tmp/cli.csr -CA /tmp/ca.crt -CAkey /tmp/ca.key -CAcreateserial -out /tmp/cli.crt -days 365",
                    "result": "Signed client credential created against trusted internal CA."
                },
                {
                    "title": "Step 3: Validate Client Identity Verification (Ending Final Result)",
                    "cmd": "openssl verify -CAfile /tmp/ca.crt /tmp/cli.crt",
                    "result": "Terminal outputs '/tmp/cli.crt: OK', proving cryptographic verification before session access."
                }
            ]
        },
        {
            "name": "Chapter 6: 2.6 Fail-Safe Defaults & Complete Mediation",
            "tool": "AppArmor (Linux Security Modules)",
            "link": "https://gitlab.com/apparmor/apparmor",
            "task": "Application daemon pe restrictive sandbox profile enforce mode me deploy karna taaki undeclared system calls deny ho sakein.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y apparmor apparmor-utils",
                    "result": "AppArmor LSM tools installed."
                },
                {
                    "title": "Step 2: Put Vulnerable Binary into Strict Enforce Mode",
                    "cmd": "sudo aa-enforce /etc/apparmor.d/usr.sbin.tcpdump",
                    "result": "Profile for /usr/sbin/tcpdump set to enforce mode."
                },
                {
                    "title": "Step 3: Audit System Confinement (Ending Final Result)",
                    "cmd": "sudo aa-status | grep -E 'profiles are in enforce mode|tcpdump'",
                    "result": "Confirms profile is active in enforce mode with complete mediation on file/network access."
                }
            ]
        },
        {
            "name": "Chapter 7: 2.7 Separation of Duties & Dual Control",
            "tool": "Git GPG Signed Commits",
            "link": "https://git-scm.com/",
            "task": "Git me mandatory GPG signature verification configure karna taaki single unauthorized developer production change push na kar sake.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y git gnupg",
                    "result": "Git and GPG installed."
                },
                {
                    "title": "Step 2: Configure Global Cryptographic Commit Signing",
                    "cmd": "GPG_KEY=$(gpg --list-secret-keys --keyid-format=long | grep sec | awk '{print $2}' | cut -d'/' -f2 | head -n1) && git config --global user.signingkey \"$GPG_KEY\" && git config --global commit.gpgsign true",
                    "result": "Git configured to reject unsigned commits automatically."
                },
                {
                    "title": "Step 3: Create & Verify Signed Commit (Ending Final Result)",
                    "cmd": "mkdir -p /tmp/prod-repo && cd /tmp/prod-repo && git init && echo 'prod release' > main.py && git add main.py && git commit -m 'release v1.0' && git log --show-signature -1",
                    "result": "Terminal outputs 'gpg: Good signature from ...' proving dual control validation."
                }
            ]
        },
        {
            "name": "Chapter 8: 2.8 Applied Case Analyses of Core Principles",
            "tool": "Lynis Security Auditing Engine",
            "link": "https://cisofy.com/lynis/",
            "task": "Pure system pe automated CIS benchmark audit run karke overall hardening index compute karna aur residual risk identify karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y lynis",
                    "result": "Lynis auditing engine installed."
                },
                {
                    "title": "Step 2: Run Full Automated System Security Audit",
                    "cmd": "sudo lynis audit system --quick --warnings-only",
                    "result": "Comprehensive scan executed across 300+ security controls."
                },
                {
                    "title": "Step 3: Extract Hardening Score (Ending Final Result)",
                    "cmd": "grep -E 'Hardening index' /var/log/lynis-report.dat",
                    "result": "Outputs 'Hardening index : [75+]' alongside priority hardening remediation tasks."
                }
            ]
        }
    ]

    add_module_section(
        "Tools for Modules 2: Module 2 - Core Principles",
        "Implement core defense principles: CIA Triad, Non-Repudiation, Least Privilege, Defense-in-Depth, Zero Trust, and CIS Hardening.",
        m2_chapters
    )

    # --- MODULE 3 ---
    m3_chapters = [
        {
            "name": "Chapter 1: 3.1 Taxonomy of Threat Actors & IoCs",
            "tool": "YARA Signature Engine",
            "link": "https://virustotal.github.io/yara/",
            "task": "Custom YARA rule likhna taaki suspicious binaries me embedded command-and-control (C2) strings aur malicious byte sequences detect kiye ja sakein.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y yara",
                    "result": "YARA pattern matching tool installed."
                },
                {
                    "title": "Step 2: Create Custom C2 Threat Rule",
                    "cmd": "cat << 'EOF' > /tmp/c2_rule.yar\nrule ThreatActor_Lazarus_Beacon {\n    strings:\n        $str = \"REDKROSS_C2_BEACON_V3\"\n    condition:\n        $str\n}\nEOF",
                    "result": "Rule compiled cleanly in /tmp/c2_rule.yar."
                },
                {
                    "title": "Step 3: Scan Artifact & Verify Detection (Ending Final Result)",
                    "cmd": "echo 'Target binary sample with REDKROSS_C2_BEACON_V3' > /tmp/sample.bin && yara /tmp/c2_rule.yar /tmp/sample.bin",
                    "result": "Terminal outputs 'ThreatActor_Lazarus_Beacon /tmp/sample.bin', confirming exact signature match."
                }
            ]
        },
        {
            "name": "Chapter 2: 3.2 Malware Architecture: Viruses, Worms, Trojans",
            "tool": "ClamAV & Linux Binary Tools (file, strings)",
            "link": "https://www.clamav.net/ | https://www.gnu.org/software/binutils/",
            "task": "Suspicious binary ki static inspection karna, embedded ASCII strings extract karna aur ClamAV signature database se scan karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y clamav binutils",
                    "result": "Antivirus engine and binary utilities ready."
                },
                {
                    "title": "Step 2: Static Binary Inspection & String Extraction",
                    "cmd": "file /bin/ls && strings /bin/ls | grep -E 'libc|socket|fopen' | head -n 6",
                    "result": "ELF 64-bit executable header confirmed; sensitive linked API symbols extracted."
                },
                {
                    "title": "Step 3: Execute Local Antivirus Malware Scan (Ending Final Result)",
                    "cmd": "clamscan --infected --recursive /tmp",
                    "result": "Scan summary outputs scanned file count with 0 infected threats detected."
                }
            ]
        },
        {
            "name": "Chapter 3: 3.3 Ransomware Operations & File System Monitoring",
            "tool": "Inotifywait (inotify-tools)",
            "link": "https://github.com/inotify-tools/inotify-tools",
            "task": "Real-time kernel file event monitoring deploy karna taaki ransomware ke through mass file modification/renaming immediately alert ho.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y inotify-tools",
                    "result": "Inotify filesystem watcher installed."
                },
                {
                    "title": "Step 2: Launch Real-Time Directory Sentinel",
                    "cmd": "mkdir -p /tmp/secure_data && inotifywait -m -r -e modify,create,moved_to /tmp/secure_data --format '%T %w%f %e' --timefmt '%F %T' &",
                    "result": "Kernel watcher listening asynchronously for filesystem anomalies."
                },
                {
                    "title": "Step 3: Simulate Attack & Capture Event (Ending Final Result)",
                    "cmd": "touch /tmp/secure_data/users.sql && echo 'ENCRYPTED' >> /tmp/secure_data/users.sql",
                    "result": "Terminal instantaneously prints timestamp, file path, and 'MODIFY' event."
                }
            ]
        },
        {
            "name": "Chapter 4: 3.4 Social Engineering & Spear Phishing Analysis",
            "tool": "ExifTool & DNS Authentication (dig)",
            "link": "https://exiftool.org/ | https://www.isc.org/bind/",
            "task": "Phishing email attachment se hidden forensic metadata extract karna aur sender domain ke SPF, DKIM, DMARC records verify karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y libimage-exiftool-perl dnsutils",
                    "result": "ExifTool and BIND DNS utilities ready."
                },
                {
                    "title": "Step 2: Extract Embedded Document Metadata",
                    "cmd": "exiftool -a -u -g1 /path/to/suspect.pdf",
                    "result": "Reveals author identity, software creation environment, and exact timestamps."
                },
                {
                    "title": "Step 3: Check Domain DMARC / SPF Policies (Ending Final Result)",
                    "cmd": "dig +short TXT google.com | grep 'v=spf1' && dig +short TXT _dmarc.google.com",
                    "result": "Outputs strict domain SPF include list and 'v=DMARC1; p=reject'."
                }
            ]
        },
        {
            "name": "Chapter 5: 3.5 Insider Threats & Privilege Escalation Audit",
            "tool": "LinPEAS (Privilege Escalation Scanner)",
            "link": "https://github.com/peass-ng/PEASS-ng",
            "task": "Automated privilege audit script run karke misconfigured SUID binaries, exposed passwords aur dangerous cron jobs detect karna.",
            "steps": [
                {
                    "title": "Step 1: Download & Prepare LinPEAS Script",
                    "cmd": "curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh -o /tmp/linpeas.sh && chmod +x /tmp/linpeas.sh",
                    "result": "Latest LinPEAS release downloaded and marked executable."
                },
                {
                    "title": "Step 2: Run Fast Quiet Audit & Save Findings",
                    "cmd": "/tmp/linpeas.sh -q -s > /tmp/linpeas_report.txt",
                    "result": "Execution completes without interactive prompts."
                },
                {
                    "title": "Step 3: Filter High-Risk SUID Vector Alerts (Ending Final Result)",
                    "cmd": "grep -E 'SUID|SGID|Interesting writable' /tmp/linpeas_report.txt | head -n 10",
                    "result": "Outputs list of binaries with dangerous elevated privileges for immediate remediation."
                }
            ]
        },
        {
            "name": "Chapter 6: 3.6 Advanced Persistent Threats & Persistence Auditing",
            "tool": "Auditd (Linux Audit Subsystem)",
            "link": "https://github.com/linux-audit/audit-userspace",
            "task": "Kernel-level audit rules deploy karna taaki persistence directories (cron, passwd) me hone wale unauthorised modifications track ho sakein.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y auditd audispd-plugins",
                    "result": "Auditd daemon and userspace utilities ready."
                },
                {
                    "title": "Step 2: Add Kernel Watch Rules for Persistence Vectors",
                    "cmd": "sudo auditctl -w /etc/cron.d -p wa -k apt_cron_watch && sudo auditctl -w /etc/passwd -p wa -k apt_passwd_watch",
                    "result": "Active kernel watches registered with audit keys."
                },
                {
                    "title": "Step 3: Query Security Violation Log (Ending Final Result)",
                    "cmd": "sudo auditctl -l && sudo ausearch -k apt_cron_watch -i",
                    "result": "Audit log entries output user UID, terminal session, executable path, and syscall parameters."
                }
            ]
        },
        {
            "name": "Chapter 7: 3.7 Supply Chain & Third-Party Vulnerability Scanning",
            "tool": "Trivy (Vulnerability & SBOM Scanner)",
            "link": "https://github.com/aquasecurity/trivy",
            "task": "Software Bill of Materials (SBOM) generate karna aur open-source software dependencies me HIGH/CRITICAL CVEs scan karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y wget apt-transport-https gnupg lsb-release && wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo gpg --dearmor -o /usr/share/keyrings/trivy.gpg && echo 'deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main' | sudo tee /etc/apt/sources.list.d/trivy.list && sudo apt update && sudo apt install -y trivy",
                    "result": "Official Aqua Trivy package repository configured."
                },
                {
                    "title": "Step 2: Scan Project Dependencies for Vulnerabilities",
                    "cmd": "trivy fs --severity HIGH,CRITICAL .",
                    "result": "Scans package-lock.json / requirements.txt against CVE databases."
                },
                {
                    "title": "Step 3: Generate CycloneDX Standard SBOM (Ending Final Result)",
                    "cmd": "trivy fs --format cyclonedx --output /tmp/sbom.json .",
                    "result": "Valid /tmp/sbom.json generated with complete component hierarchy."
                }
            ]
        }
    ]

    add_module_section(
        "Tools for Modules 3: Module 3 - Threat Landscape",
        "Detect and mitigate real-world threats: YARA rules, static malware triage, inotify ransomware sentinels, phishing analysis, and SBOM scanning.",
        m3_chapters
    )

    # --- MODULE 4 ---
    m4_chapters = [
        {
            "name": "Chapter 1: 4.1 Risk Management Fundamentals & Scoring",
            "tool": "CVSS Calculator CLI & Python cvss",
            "link": "https://pypi.org/project/cvss/ | https://www.first.org/cvss/calculator/3.1",
            "task": "CVSS v3.1 vector string parse karke base, temporal, aur environmental severity score calculate karna aur quantitative ALE derive karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "pip install cvss",
                    "result": "CVSS official Python calculation library installed."
                },
                {
                    "title": "Step 2: Compute CVSS Vector Base Score",
                    "cmd": "python3 -c \"import cvss; c = cvss.CVSS3('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H'); print('Base Score:', c.scores()[0]); print('Severities:', c.severities())\"",
                    "result": "Calculates 'Base Score: 9.8' and 'Severities: (Critical, Critical, Critical)'."
                },
                {
                    "title": "Step 3: Calculate Annualized Loss Expectancy (ALE) (Ending Final Result)",
                    "cmd": "python3 -c \"sle = 25000; aro = 0.4; print(f'Annualized Loss Expectancy: ${sle * aro:,.2f}')\"",
                    "result": "Outputs 'Annualized Loss Expectancy: $10,000.00' for executive risk reporting."
                }
            ]
        },
        {
            "name": "Chapter 2: 4.2 Vulnerability Assessment & Service Auditing",
            "tool": "Nmap NSE Vulnerability Scripts (vulners)",
            "link": "https://nmap.org/book/nse.html | https://github.com/vulnersCom/nmap-vulners",
            "task": "Target network services pe automated CVE discovery script run karna aur unpatched vulnerabilities ko CVSS scores se correlate karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y nmap git && cd /usr/share/nmap/scripts/ && sudo git clone https://github.com/vulnersCom/nmap-vulners.git || true && sudo nmap --script-updatedb",
                    "result": "Vulners NSE database integrated into local Nmap engine."
                },
                {
                    "title": "Step 2: Execute Automated CVE Audit on Listening Ports",
                    "cmd": "nmap -sV --script vulners -p 22,80,443 127.0.0.1",
                    "result": "Correlates running software versions with active CVE vulnerabilities."
                },
                {
                    "title": "Step 3: Run Standard Safe Vulnerability Suite (Ending Final Result)",
                    "cmd": "nmap -sV --script 'vuln and safe' -p 80,443 127.0.0.1",
                    "result": "Report outputs discovered CVE IDs, CVSS scores, and official patch advisory URLs."
                }
            ]
        },
        {
            "name": "Chapter 3: 4.3 Threat Modeling (STRIDE & PASTA)",
            "tool": "pytm (Python Threat Modeling Framework)",
            "link": "https://github.com/izar/pytm",
            "task": "System architecture ko code ke roop me define karna aur automated Data Flow Diagrams (DFD) wa STRIDE threats report generate karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "pip install pytm graphviz && sudo apt update && sudo apt install -y graphviz",
                    "result": "pytm and Graphviz rendering engine installed."
                },
                {
                    "title": "Step 2: Generate Architecture Data Flow Diagram (DFD)",
                    "cmd": "curl -s https://raw.githubusercontent.com/izar/pytm/master/sample.py -o /tmp/model.py && python3 /tmp/model.py --dfd | dot -Tpng -o /tmp/dfd.png",
                    "result": "Generated visual architecture DFD at /tmp/dfd.png."
                },
                {
                    "title": "Step 3: Generate Automated STRIDE Report (Ending Final Result)",
                    "cmd": "python3 /tmp/model.py --report /tmp/stride_report.html",
                    "result": "HTML threat report generated with classified threats (Spoofing, Tampering, Elevation of Privilege)."
                }
            ]
        },
        {
            "name": "Chapter 4: 4.4 Exploit Lifecycles & Zero-Day Flaws",
            "tool": "Searchsploit (Exploit Database CLI)",
            "link": "https://gitlab.com/exploit-database/exploitdb",
            "task": "Local Exploit-DB offline repository query karke vulnerable software versions ke public Proof-of-Concept exploits inspect karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y exploitdb",
                    "result": "Exploit-DB CLI utility installed."
                },
                {
                    "title": "Step 2: Update Local Exploit Repository",
                    "cmd": "searchsploit -u",
                    "result": "Local exploit archive synchronized with latest security advisories."
                },
                {
                    "title": "Step 3: Search & Inspect Exploit Code (Ending Final Result)",
                    "cmd": "searchsploit 'Apache 2.4.49' && searchsploit -x 50383",
                    "result": "Displays exploit title, CVE-2021-41773 reference, and complete exploit source code path."
                }
            ]
        },
        {
            "name": "Chapter 5: 4.5 Risk Treatment & Baseline Hardening",
            "tool": "Linux Kernel Sysctl Hardening",
            "link": "https://cisofy.com/lynis/ | https://www.kernel.org/doc/Documentation/sysctl/",
            "task": "Linux kernel network stack ko IP spoofing aur ICMP attacks ke against harden karna aur Lynis audit se residual risk mitigate karna.",
            "steps": [
                {
                    "title": "Step 1: Configure Defensive Sysctl Parameters",
                    "cmd": "sudo tee /etc/sysctl.d/99-security.conf << 'EOF'\nnet.ipv4.conf.all.rp_filter = 1\nnet.ipv4.conf.all.accept_redirects = 0\nnet.ipv4.icmp_echo_ignore_broadcasts = 1\nkernel.kptr_restrict = 2\nkernel.dmesg_restrict = 1\nEOF",
                    "result": "Defensive kernel parameters written to persistent configuration."
                },
                {
                    "title": "Step 2: Reload & Apply Kernel Parameters Immediately",
                    "cmd": "sudo sysctl -p /etc/sysctl.d/99-security.conf",
                    "result": "Kernel acknowledges applied security settings."
                },
                {
                    "title": "Step 3: Verify Residual Risk Reduction (Ending Final Result)",
                    "cmd": "sudo lynis audit system --tests-category security",
                    "result": "Lynis validates applied mitigations with resolved risk warnings."
                }
            ]
        },
        {
            "name": "Chapter 6: 4.6 Security Compliance & Audit Standards",
            "tool": "OpenSCAP (oscap)",
            "link": "https://www.open-scap.org/",
            "task": "Operating system configuration ko official NIST 800-53 aur PCI-DSS SCAP security baselines ke against evaluate karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y libopenscap8 ssg-debian ssg-base",
                    "result": "OpenSCAP evaluation engine and compliance data streams ready."
                },
                {
                    "title": "Step 2: Execute Automated SCAP Baseline Audit",
                    "cmd": "oscap xccdf eval --profile xccdf_org.ssgproject.content_profile_standard --report /tmp/scap_report.html /usr/share/xml/scap/ssg/content/ssg-debian11-ds.xml || true",
                    "result": "Full system compliance evaluation executed against baseline rules."
                },
                {
                    "title": "Step 3: Review Compliance Report Summary (Ending Final Result)",
                    "cmd": "grep -E 'Rule Result|Compliance' /tmp/scap_report.html | head -n 8",
                    "result": "Generated HTML audit report detailing rule pass/fail status and compliance score."
                }
            ]
        }
    ]

    add_module_section(
        "Tools for Modules 4: Module 4 - Risk and vulnerability",
        "Master risk quantification, automated vulnerability discovery, threat modeling, exploit intelligence, and SCAP compliance auditing.",
        m4_chapters
    )

    # --- MODULE 5 ---
    m5_chapters = [
        {
            "name": "Chapter 1: 5.1 Identification, Authentication & Authorization",
            "tool": "Linux PAM (pam_faillock)",
            "link": "http://www.linux-pam.org/",
            "task": "Account lockout policy configure karna taaki repeated failed authentication attempts pe account temporarily freeze ho aur brute-force ruk sake.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y libpam-modules libpam-faillock",
                    "result": "PAM faillock module ready."
                },
                {
                    "title": "Step 2: Inspect Account Lockout Status",
                    "cmd": "sudo faillock --user student",
                    "result": "Displays recorded authentication failures and lockout status."
                },
                {
                    "title": "Step 3: Reset & Unlock Locked Account (Ending Final Result)",
                    "cmd": "sudo faillock --user student --reset",
                    "result": "Faillock records cleared cleanly; account access restored."
                }
            ]
        },
        {
            "name": "Chapter 2: 5.2 Password Security & Cryptographic Hashing",
            "tool": "John the Ripper & Hashcat",
            "link": "https://www.openwall.com/john/ | https://hashcat.net/hashcat/",
            "task": "Password hash strength evaluate karna, /etc/shadow ke hashes extract karna aur wordlist dictionary attack se weak passwords uncover karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y john hashcat",
                    "result": "Password security auditing tools installed."
                },
                {
                    "title": "Step 2: Consolidate Shadow Hashes for Audit",
                    "cmd": "sudo unshadow /etc/passwd /etc/shadow > /tmp/hashes.txt",
                    "result": "Password hashes combined with usernames in audit format."
                },
                {
                    "title": "Step 3: Run Dictionary Audit & Reveal Results (Ending Final Result)",
                    "cmd": "john --wordlist=/usr/share/john/password.lst /tmp/hashes.txt && john --show /tmp/hashes.txt",
                    "result": "Outputs cracked weak passwords while verifying resilience of salted strong passwords."
                }
            ]
        },
        {
            "name": "Chapter 3: 5.3 Multi-Factor Authentication (MFA) & Password Vaults",
            "tool": "Google Authenticator PAM & Oathtool",
            "link": "https://github.com/google/google-authenticator-libpam | https://www.nongnu.org/oath-toolkit/",
            "task": "Time-Based One-Time Password (TOTP) MFA configure karna aur terminal se 6-digit dynamic verification codes programmatically generate karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y libpam-google-authenticator oathtool",
                    "result": "TOTP PAM module and CLI code generator installed."
                },
                {
                    "title": "Step 2: Initialize TOTP Secret Key with Rate-Limiting",
                    "cmd": "google-authenticator -t -d -f -r 3 -R 30 -W -q",
                    "result": "Generates secret key and emergency scratch codes in ~/.google_authenticator."
                },
                {
                    "title": "Step 3: Generate Dynamic 6-Digit TOTP Token (Ending Final Result)",
                    "cmd": "oathtool --totp -b 'JBSWY3DPEHPK3PXP'",
                    "result": "Outputs valid 6-digit TOTP code matching mobile authenticator app."
                }
            ]
        },
        {
            "name": "Chapter 4: 5.4 Access Control Architectures (DAC, MAC, RBAC, ABAC)",
            "tool": "Linux Role Groups & POSIX ACLs",
            "link": "https://savannah.nongnu.org/projects/acl",
            "task": "Role-Based Access Control (RBAC) departmental structure build karna aur inherited read-only ACL overrides enforce karna.",
            "steps": [
                {
                    "title": "Step 1: Create Role Groups & Assign User",
                    "cmd": "sudo groupadd -r sec_analysts && sudo groupadd -r sec_auditors && sudo usermod -aG sec_analysts alice",
                    "result": "System role groups created with users mapped to privileges."
                },
                {
                    "title": "Step 2: Deploy Shared Directory with Default ACL Inheritance",
                    "cmd": "sudo mkdir -p /var/log/soc_audit && sudo chown root:sec_analysts /var/log/soc_audit && sudo chmod 770 /var/log/soc_audit && sudo setfacl -d -m g:sec_auditors:r-x /var/log/soc_audit && sudo setfacl -m g:sec_auditors:r-x /var/log/soc_audit",
                    "result": "RBAC directory secured: analysts write/read, auditors read-only."
                },
                {
                    "title": "Step 3: Verify ACL Permissions Matrix (Ending Final Result)",
                    "cmd": "getfacl /var/log/soc_audit",
                    "result": "Validates 'group:sec_analysts:rwx' and 'group:sec_auditors:r-x' permissions."
                }
            ]
        },
        {
            "name": "Chapter 5: 5.5 Privileged Access Management & Credential Vaulting",
            "tool": "HashiCorp Vault CLI",
            "link": "https://www.vaultproject.io/",
            "task": "Centralized credential vault server deploy karna, sensitive database secrets store karna aur authenticated token lease se retrieve karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y wget gpg && wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp.gpg && echo 'deb [signed-by=/usr/share/keyrings/hashicorp.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main' | sudo tee /etc/apt/sources.list.d/hashicorp.list && sudo apt update && sudo apt install -y vault",
                    "result": "HashiCorp Vault enterprise package installed."
                },
                {
                    "title": "Step 2: Start Vault Dev Server & Set Endpoint",
                    "cmd": "vault server -dev & export VAULT_ADDR='http://127.0.0.1:8200'",
                    "result": "Vault server initialized in memory listening on port 8200."
                },
                {
                    "title": "Step 3: Write & Retrieve Privileged Credentials (Ending Final Result)",
                    "cmd": "vault kv put secret/db/production user='db_admin' pass='SuperVaultSecret#2026' && vault kv get secret/db/production",
                    "result": "Formatted tabular output showing metadata, version, and decrypted secret data."
                }
            ]
        }
    ]

    add_module_section(
        "Tools for Modules 5: Module 5 - Identity and access",
        "Implement enterprise IAM controls: Account lockout policies, password hash auditing, TOTP multi-factor auth, RBAC permissions, and HashiCorp Vault.",
        m5_chapters
    )

    # --- MODULE 6 ---
    m6_chapters = [
        {
            "name": "Chapter 1: 6.1 Security Controls and System Protection",
            "tool": "Suricata (Network IDS/IPS)",
            "link": "https://suricata.io/",
            "task": "High-performance Network Intrusion Detection System (NIDS) deploy karna, Emerging Threats rulesets update karna aur live intrusions detect karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y suricata jq",
                    "result": "Suricata packet inspection engine installed."
                },
                {
                    "title": "Step 2: Update Threat Signature Feeds & Start Engine",
                    "cmd": "sudo suricata-update && sudo suricata -c /etc/suricata/suricata.yaml -i lo -D",
                    "result": "30,000+ threat signatures loaded; daemon listening on loopback."
                },
                {
                    "title": "Step 3: Monitor Live Intrusion Alerts (Ending Final Result)",
                    "cmd": "sudo tail -f /var/log/suricata/fast.log",
                    "result": "Alerts display categorized threats (e.g., 'ET SCAN Potential SSH Brute Force')."
                }
            ]
        },
        {
            "name": "Chapter 2: 6.2 Cryptography and Data Protection Fundamentals",
            "tool": "OpenSSL (AES-256-GCM & RSA-4096)",
            "link": "https://www.openssl.org/",
            "task": "AES-256-GCM authenticated symmetric encryption execute karna aur enterprise RSA-4096 asymmetric keypairs generate karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y openssl",
                    "result": "OpenSSL cryptographic CLI ready."
                },
                {
                    "title": "Step 2: Generate Asymmetric RSA-4096 Keypair",
                    "cmd": "openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out /tmp/priv.pem && openssl rsa -pubout -in /tmp/priv.pem -out /tmp/pub.pem",
                    "result": "Created 4096-bit private and public keypair files."
                },
                {
                    "title": "Step 3: Perform Authenticated Symmetric Encryption (Ending Final Result)",
                    "cmd": "KEY=$(openssl rand -hex 32) && IV=$(openssl rand -hex 12) && echo 'TOP SECRET SOC INTEL' | openssl enc -aes-256-gcm -K $KEY -iv $IV -out /tmp/intel.enc && openssl rsa -text -noout -in /tmp/priv.pem | grep 'Private-Key: (4096 bit)'",
                    "result": "Confirms 'Private-Key: (4096 bit)' and verified authenticated ciphertext payload."
                }
            ]
        },
        {
            "name": "Chapter 3: 6.3 Security Operations and Incident Management",
            "tool": "lnav (Log File Navigator)",
            "link": "https://lnav.org/",
            "task": "Live system aur authentication logs (auth.log, syslog) ko SQL queries ke through correlate karke security incidents isolate karna.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y lnav",
                    "result": "Log File Navigator installed."
                },
                {
                    "title": "Step 2: Correlate Multi-Source Logs in Real Time",
                    "cmd": "lnav /var/log/auth.log /var/log/syslog",
                    "result": "Interactive unified log viewer with automated syntax highlighting."
                },
                {
                    "title": "Step 3: Query Security Events via SQL & Export Findings (Ending Final Result)",
                    "cmd": "lnav -n -c \";SELECT log_time, log_user, log_text FROM all_logs WHERE log_text LIKE '%failed%' LIMIT 10;\" /var/log/auth.log > /tmp/soc_incident_report.txt && cat /tmp/soc_incident_report.txt",
                    "result": "Structured chronological incident report isolating failed authentication attempts."
                }
            ]
        },
        {
            "name": "Chapter 4: 6.4 Cybersecurity Law, Ethics and Governance",
            "tool": "dc3dd & sha256sum (Evidence Chain of Custody)",
            "link": "https://sourceforge.net/projects/dc3dd/ | https://www.gnu.org/software/coreutils/",
            "task": "Forensically sound raw evidence image acquire karna with dual on-the-fly hashing (MD5 + SHA-256) aur chain of custody log banana.",
            "steps": [
                {
                    "title": "Step 1: Installation & Setup",
                    "cmd": "sudo apt update && sudo apt install -y dc3dd coreutils",
                    "result": "Forensic imaging and hashing utilities ready."
                },
                {
                    "title": "Step 2: Acquire Forensic Evidence with Dual On-the-Fly Hashing",
                    "cmd": "sudo dc3dd if=/dev/sda1 of=/tmp/evidence.raw hash=sha256 hash=md5 log=/tmp/custody.log",
                    "result": "Raw bitstream copy acquired with cryptographic hashes calculated during read."
                },
                {
                    "title": "Step 3: Write-Protect Evidence & Verify Hashes (Ending Final Result)",
                    "cmd": "chmod 400 /tmp/evidence.raw && cat /tmp/custody.log | grep -E '(sha256|md5|input records)'",
                    "result": "Custody log proves identical cryptographic hashes matching original source media."
                }
            ]
        },
        {
            "name": "Chapter 5: 6.5 Cybersecurity Careers and Professional Development",
            "tool": "OverTheWire Bandit & Git Security Portfolio",
            "link": "https://overthewire.org/wargames/bandit/ | https://github.com/",
            "task": "Live cybersecurity wargames ko SSH ke through solve karna aur open-source technical proof-of-work portfolio repository build karna.",
            "steps": [
                {
                    "title": "Step 1: Connect to Live Security Wargame via SSH",
                    "cmd": "ssh bandit0@bandit.labs.overthewire.org -p 2220",
                    "result": "SSH session established (Password: bandit0)."
                },
                {
                    "title": "Step 2: Capture Level 0 Flag & Advance",
                    "cmd": "cat readme",
                    "result": "Extracts password flag for Level 1 privilege escalation."
                },
                {
                    "title": "Step 3: Document Findings in Git Technical Portfolio (Ending Final Result)",
                    "cmd": "mkdir -p ~/cyber-portfolio/ctf-writeups && cd ~/cyber-portfolio && git init && echo '# OverTheWire Bandit Lab Walkthrough' > README.md && git add README.md && git commit -m 'docs: verified cybersecurity writeup' && git log -1",
                    "result": "Git commit logs verified technical security writeup for employer review."
                }
            ]
        }
    ]

    add_module_section(
        "Tools for Modules 6: Module 6 - Cybersecurity Practices, Operations, Governance & Career Development",
        "Deploy defense operations: Network intrusion detection, modern cryptography, SIEM log correlation, forensic chain of custody, and CTF portfolio.",
        m6_chapters
    )

    # Build Document
    doc.build(story, canvasmaker=ObsidianAmberCanvas)
    print(f"SUCCESS: Generated PDF at {output_pdf_path}")

if __name__ == '__main__':
    out_path = os.path.abspath('public/RedKross_Cybersecurity_Tools_Manual.pdf')
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    build_tools_pdf(out_path)
