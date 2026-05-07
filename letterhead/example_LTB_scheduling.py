"""
Example — LTB Scheduling Request letter (Selena Lyons / T-103871-25).
Copy this file, change the constants, run it.

  python example_LTB_scheduling.py
"""

import os
import sys

# Make ``letterhead`` importable when running from the same folder.
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from letterhead import build_letter  # noqa: E402


CONTENT = {
    'signer':           'jeanfrancois',
    'date':             'May 5, 2026',
    'recipient_person': 'Dana Wren',
    'recipient_title':  'Member, Landlord and Tenant Board',
    'recipient_lines':  [
        '15 Grosvenor Street, Ground Floor',
        'Toronto, ON  M7A 2G6',
    ],
    'delivery_note':    'Delivered via the LTB e-File portal',
    're_line':          'Request to Schedule Hearing — LTB File No. T-103871-25',
    'salutation':       'Dear Member Wren:',
    'body_paragraphs': [
        ('I am the licensed paralegal for the Applicant, '
         '<b>Selena Lyons</b>, in the above-noted matter. I write to you '
         'directly as the Member seized of this file.'),
        ('I write further to your endorsement of <b>February 18, 2026</b>, '
         'in which you directed that this matter not be scheduled before '
         '<b>May 4, 2026</b> in order to permit the Respondent additional '
         'time to obtain and produce a police report. That date has now '
         'passed and, to my knowledge, no police report has been '
         'produced or disclosed to my office.'),
        ('In the circumstances, I respectfully request that the matter be '
         'set down for hearing at the earliest available opportunity. The '
         'Applicant remains ready to proceed and, given the time elapsed, '
         'further delay would be prejudicial.'),
        ('I am happy to provide any additional information you may require '
         'to schedule this matter.'),
    ],
    'closing': 'Respectfully submitted,',
    'cc':      'Respondent / Respondent’s representative (via LTB e-File)',
    'title':   'Request to Schedule Hearing - LTB File T-103871-25',
    'subject': 'LTB Scheduling Request',
}


if __name__ == '__main__':
    out = build_letter(
        CONTENT,
        out_path=os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            '..',
            'outputs',
            'Legal_Assist_LTB_Scheduling_Request.pdf',
        ),
    )
    print(f'OK -> {out}')
    print(f'Size: {os.path.getsize(out)} bytes')
