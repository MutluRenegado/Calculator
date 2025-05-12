from pathlib import Path

# Define the markdown content
markdown_content = """
# Code of Conduct

## 1. Purpose
We are committed to providing a welcoming, inclusive, and safe environment for everyone. This Code of Conduct outlines our expectations for behavior and guides our community's interactions to ensure a positive experience for all participants.

## 2. Expected Behavior
All participants are expected to:

- Be respectful, considerate, and inclusive.
- Refrain from demeaning, discriminatory, or harassing behavior.
- Respect differing viewpoints and experiences.
- Use welcoming and inclusive language.
- Gracefully accept constructive criticism.

## 3. Unacceptable Behavior
Unacceptable behaviors include:

- Harassment, intimidation, or discrimination in any form.
- Offensive verbal comments or visual representations.
- Disruptive behavior that interferes with community engagement.
- Inappropriate sexual language or imagery.

## 4. Scope
This Code of Conduct applies to all community spaces, including:

- Online platforms (forums, issue trackers, chats, etc.)
- Public events or meetups
- Project-related interactions (pull requests, code reviews, etc.)

## 5. Reporting
If you observe or experience a violation of this Code of Conduct, please report it by contacting:  
📧 [Insert Reporting Email Address]

We treat all reports with confidentiality and investigate them thoroughly. Reports can be made anonymously if desired.

## 6. Enforcement
Maintainers and community leaders are responsible for enforcing this Code of Conduct. They may take appropriate and fair corrective action in response to any violation, including:

- A warning
- Temporary suspension
- Permanent ban

The decision of maintainers regarding enforcement is final.

## 7. Maintainers' Responsibilities
Maintainers are expected to:

- Uphold and enforce this Code of Conduct consistently and fairly.
- Protect the integrity and safety of the community.
- Act upon reports with discretion and transparency.

## 8. Acknowledgment
This Code of Conduct is adapted from the Contributor Covenant and other open-source community standards.
"""

# Save to a Markdown file
file_path = Path("/mnt/data/CODE_OF_CONDUCT.md")
file_path.write_text(markdown_content.strip())

file_path.name
