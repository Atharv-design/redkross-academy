/**
 * LinkedIn helpers. These use LinkedIn's public "Add to profile" and share URLs,
 * which need no LinkedIn developer app or API approval.
 *
 * Optional: set VITE_LINKEDIN_ORG_ID to the numeric id of the RedKross LinkedIn
 * company page so certificates show the company logo; otherwise the issuer is
 * shown by name.
 */
const ORG_ID = import.meta.env?.VITE_LINKEDIN_ORG_ID || '';
const ORG_NAME = 'RedKross Academy';

export function addToProfileUrl(cred) {
  const d = new Date(cred.issue_date || Date.now());
  const params = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: cred.credential_title || cred.course_title || 'Certificate',
    issueYear: String(d.getFullYear()),
    issueMonth: String(d.getMonth() + 1),
    certUrl: cred.verification_url || `${window.location.origin}/verify/${cred.verification_id}`,
    certId: cred.verification_id,
  });
  if (ORG_ID) params.set('organizationId', ORG_ID);
  else params.set('organizationName', ORG_NAME);
  return `https://www.linkedin.com/profile/add?${params.toString()}`;
}

export function shareUrl(cred) {
  const url = cred.verification_url || `${window.location.origin}/verify/${cred.verification_id}`;
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

export function verifyUrl(cred) {
  return cred.verification_url || `${window.location.origin}/verify/${cred.verification_id}`;
}
