"""
Vercel serverless function — POST /api/send-emails
Sends 15 personalized "Events Missing Services" emails via Resend.
"""

from http.server import BaseHTTPRequestHandler
import json
import os
import resend

RECIPIENT  = "tss-demo@eleos.health"
SENDER     = "Jamie Jones (TSS) <onboarding@resend.dev>"
WEEK_LABEL = "week of May 18-24"

CLINICIANS = [
    {
        "first": "Morgan", "full": "Morgan Reyes, LCSW", "role": "Therapist",
        "events": [
            {"date": "May 19", "client": "CL-10238 (JS)", "type": "Arrived, missing documentation", "service": "Individual therapy"},
            {"date": "May 21", "client": "CL-10412 (AK)", "type": "Arrived, missing documentation", "service": "Individual therapy"},
            {"date": "May 22", "client": "CL-11003 (MP)", "type": "Complete, no service attached", "service": "Individual therapy"},
            {"date": "May 23", "client": "CL-10876 (DR)", "type": "Complete, no service attached", "service": "Individual therapy"},
        ],
    },
    {
        "first": "Jamie", "full": "Jamie Lin, SDP", "role": "Senior Direct Provider",
        "events": [
            {"date": "May 20", "client": "CL-10519 (RT)", "type": "Scheduled, no service attached", "service": "Care coordination"},
            {"date": "May 22", "client": "CL-11248 (SL)", "type": "Scheduled, no service attached", "service": "Care coordination"},
        ],
    },
    {
        "first": "Avery", "full": "Avery Patel, LPC", "role": "Therapist",
        "events": [
            {"date": "May 18", "client": "CL-10755 (BG)", "type": "Arrived, missing documentation", "service": "Individual therapy"},
            {"date": "May 19", "client": "CL-10901 (TH)", "type": "Complete, no service attached", "service": "Individual therapy"},
            {"date": "May 20", "client": "CL-11102 (CL)", "type": "Complete, no service attached", "service": "Individual therapy"},
            {"date": "May 22", "client": "CL-10688 (NM)", "type": "Scheduled, no service attached", "service": "Individual therapy"},
            {"date": "May 23", "client": "CL-11340 (FA)", "type": "Arrived, missing documentation", "service": "Individual therapy"},
        ],
    },
    {
        "first": "Sam", "full": "Sam Whitcomb, BHC", "role": "Behavioral Health Consultant",
        "events": [
            {"date": "May 19", "client": "CL-10455 (KP)", "type": "Complete, no service attached", "service": "Behavioral health consultation"},
            {"date": "May 21", "client": "CL-11189 (DV)", "type": "Arrived, missing documentation", "service": "Behavioral health consultation"},
            {"date": "May 23", "client": "CL-10712 (JM)", "type": "Complete, no service attached", "service": "Behavioral health consultation"},
        ],
    },
    {
        "first": "Riley", "full": "Riley Okafor, Care Navigator", "role": "Care Navigator",
        "events": [
            {"date": "May 20", "client": "CL-10833 (AS)", "type": "Scheduled, no service attached", "service": "Care navigation"},
            {"date": "May 22", "client": "CL-11455 (PR)", "type": "Scheduled, no service attached", "service": "Care navigation"},
        ],
    },
    {
        "first": "Quinn", "full": "Quinn Davenport, LCSW", "role": "Therapist",
        "events": [
            {"date": "May 18", "client": "CL-10977 (EH)", "type": "Arrived, missing documentation", "service": "Individual therapy"},
            {"date": "May 19", "client": "CL-11061 (LG)", "type": "Complete, no service attached", "service": "Individual therapy"},
            {"date": "May 21", "client": "CL-10502 (WB)", "type": "Arrived, missing documentation", "service": "Individual therapy"},
            {"date": "May 22", "client": "CL-11212 (MO)", "type": "Complete, no service attached", "service": "Individual therapy"},
        ],
    },
    {
        "first": "Cameron", "full": "Cameron Hayes, FSP", "role": "Family Support Provider",
        "events": [
            {"date": "May 19", "client": "CL-10644 (CN)", "type": "Complete, no service attached", "service": "Family support session"},
            {"date": "May 21", "client": "CL-11008 (RS)", "type": "Scheduled, no service attached", "service": "Family support session"},
            {"date": "May 23", "client": "CL-10791 (BT)", "type": "Arrived, missing documentation", "service": "Family support session"},
        ],
    },
    {
        "first": "Taylor", "full": "Taylor Brennan, LPC", "role": "Therapist",
        "events": [
            {"date": "May 18", "client": "CL-11077 (DK)", "type": "Complete, no service attached", "service": "Individual therapy"},
            {"date": "May 20", "client": "CL-10322 (IH)", "type": "Arrived, missing documentation", "service": "Individual therapy"},
            {"date": "May 22", "client": "CL-11401 (YS)", "type": "Complete, no service attached", "service": "Individual therapy"},
            {"date": "May 23", "client": "CL-10885 (OL)", "type": "Arrived, missing documentation", "service": "Individual therapy"},
        ],
    },
    {
        "first": "Jordan", "full": "Jordan Mitchell, RSS", "role": "Recovery Support Specialist",
        "events": [
            {"date": "May 20", "client": "CL-10566 (HP)", "type": "Scheduled, no service attached", "service": "Recovery support"},
            {"date": "May 22", "client": "CL-11293 (UA)", "type": "Complete, no service attached", "service": "Recovery support"},
        ],
    },
    {
        "first": "Casey", "full": "Casey Whitlock, BHC", "role": "Behavioral Health Consultant",
        "events": [
            {"date": "May 19", "client": "CL-10720 (FE)", "type": "Arrived, missing documentation", "service": "Behavioral health consultation"},
            {"date": "May 21", "client": "CL-11125 (ZK)", "type": "Complete, no service attached", "service": "Behavioral health consultation"},
            {"date": "May 23", "client": "CL-10934 (VR)", "type": "Arrived, missing documentation", "service": "Behavioral health consultation"},
        ],
    },
    {
        "first": "Drew", "full": "Drew Castellano, LCSW", "role": "Therapist",
        "events": [
            {"date": "May 19", "client": "CL-11366 (QT)", "type": "Complete, no service attached", "service": "Individual therapy"},
            {"date": "May 21", "client": "CL-10487 (XM)", "type": "Arrived, missing documentation", "service": "Individual therapy"},
            {"date": "May 22", "client": "CL-11018 (NJ)", "type": "Complete, no service attached", "service": "Individual therapy"},
        ],
    },
    {
        "first": "Skyler", "full": "Skyler Romero, SDP", "role": "Senior Direct Provider",
        "events": [
            {"date": "May 20", "client": "CL-10812 (PD)", "type": "Scheduled, no service attached", "service": "Care coordination"},
            {"date": "May 23", "client": "CL-11444 (GH)", "type": "Scheduled, no service attached", "service": "Care coordination"},
        ],
    },
    {
        "first": "Logan", "full": "Logan Ferraro, Care Navigator", "role": "Care Navigator",
        "events": [
            {"date": "May 18", "client": "CL-10653 (TC)", "type": "Scheduled, no service attached", "service": "Care navigation"},
            {"date": "May 20", "client": "CL-11271 (AB)", "type": "Arrived, missing documentation", "service": "Care navigation"},
            {"date": "May 22", "client": "CL-10996 (RM)", "type": "Scheduled, no service attached", "service": "Care navigation"},
        ],
    },
    {
        "first": "Reese", "full": "Reese Calloway, LPC", "role": "Therapist",
        "events": [
            {"date": "May 19", "client": "CL-10778 (DS)", "type": "Arrived, missing documentation", "service": "Individual therapy"},
            {"date": "May 21", "client": "CL-11154 (EW)", "type": "Complete, no service attached", "service": "Individual therapy"},
            {"date": "May 23", "client": "CL-10403 (IK)", "type": "Arrived, missing documentation", "service": "Individual therapy"},
        ],
    },
    {
        "first": "Hayden", "full": "Hayden Marsh, FSP", "role": "Family Support Provider",
        "events": [
            {"date": "May 20", "client": "CL-10867 (LP)", "type": "Complete, no service attached", "service": "Family support session"},
            {"date": "May 22", "client": "CL-11328 (BR)", "type": "Scheduled, no service attached", "service": "Family support session"},
        ],
    },
]


def render_subject(clinician):
    n = len(clinician["events"])
    item = "item" if n == 1 else "items"
    return f"{clinician['first']} {clinician['full'].split(',')[0].split()[-1]} — Events Missing Services ({n} {item}), {WEEK_LABEL}"


def render_html(clinician):
    by_type = {}
    for event in clinician["events"]:
        by_type.setdefault(event["type"], []).append(event)

    sections = []
    for issue_type, events in by_type.items():
        rows = "".join(
            f'<li style="margin-bottom:4px;"><strong>{e["date"]}:</strong> '
            f'{e["client"]} — {e["service"]}</li>'
            for e in events
        )
        sections.append(
            f'<p style="margin-bottom:6px;"><strong>{issue_type}:</strong></p>'
            f'<ul style="margin-top:0;margin-bottom:14px;">{rows}</ul>'
        )

    total = len(clinician["events"])
    plural = "event" if total == 1 else "events"

    return f"""<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;line-height:1.5;max-width:600px;">
<p>Hi {clinician['first']},</p>
<p>The following {total} {plural} from this week need your attention:</p>
{"".join(sections)}
<p>Please complete documentation by end of business Friday. Reply to this email or message me on Teams if you have questions or need help locating a client record.</p>
<p style="margin-bottom:4px;">Thanks,<br>Eleos Automation</p>
<p style="color:#6b7280;font-size:13px;margin-top:0;">Sent on behalf of the TSS team · Powered by Eleos Health</p>
</body></html>"""


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        api_key = os.environ.get("RESEND_API_KEY", "")
        if not api_key:
            self._respond(500, {"ok": False, "error": "RESEND_API_KEY not set"})
            return

        resend.api_key = api_key
        sent = 0
        failed = 0
        errors = []

        for clinician in CLINICIANS:
            try:
                resend.Emails.send({
                    "from": SENDER,
                    "to": [RECIPIENT],
                    "subject": render_subject(clinician),
                    "html": render_html(clinician),
                })
                sent += 1
            except Exception as e:
                failed += 1
                errors.append(str(e))

        self._respond(200, {"ok": True, "sent": sent, "failed": failed, "errors": errors})

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors_headers()
        self.end_headers()

    def _respond(self, status, body):
        self.send_response(status)
        self._cors_headers()
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(body).encode())

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def log_message(self, format, *args):
        pass  # suppress default access logs
