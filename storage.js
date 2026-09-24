/* ==========================================================================
   storage.js — localStorage persistence for course registrations
   ========================================================================== */

const REGISTRATIONS_KEY = "courseRegistrations";

function isLocalStorageAvailable() {
  try {
    const testKey = "__storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (err) {
    return false;
  }
}

function getRegistrations() {
  if (!isLocalStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(REGISTRATIONS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function getRegistrationById(id) {
  return getRegistrations().find((reg) => reg.id === id);
}

function generateRegistrationId() {
  const now = new Date();
  const datePart =
    now.getFullYear() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const todaysCount = getRegistrations().filter((reg) =>
    reg.id.startsWith(`REG-${datePart}-`)
  ).length;
  const sequence = String(todaysCount + 1).padStart(3, "0");
  return `REG-${datePart}-${sequence}`;
}

function saveRegistration(registration) {
  if (!isLocalStorageAvailable()) {
    throw new Error("Local storage is not available in this browser.");
  }
  const registrations = getRegistrations();
  registrations.push(registration);
  try {
    window.localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
  } catch (err) {
    throw new Error("Unable to save registration. Local storage may be full.");
  }
  return registration;
}

function deleteRegistration(id) {
  const registrations = getRegistrations().filter((reg) => reg.id !== id);
  window.localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
  return registrations;
}

function clearRegistrations() {
  window.localStorage.removeItem(REGISTRATIONS_KEY);
  return [];
}

function exportRegistrationsCSV() {
  const registrations = getRegistrations();
  const headers = [
    "Registration ID",
    "Submitted At",
    "Course",
    "Full Name",
    "Email",
    "Mobile",
    "Preferred Intake",
    "Company"
  ];

  const escapeCsvValue = (value) => {
    const str = value == null ? "" : String(value);
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = registrations.map((reg) =>
    [
      reg.id,
      reg.submittedAt,
      reg.courseName,
      reg.fullName,
      reg.email,
      reg.mobile,
      reg.preferredIntake,
      reg.company
    ]
      .map(escapeCsvValue)
      .join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `course-registrations-${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
