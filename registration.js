/* ==========================================================================
   registration.js — register-interest.html and registration-success.html
   ========================================================================== */

const VALIDATORS = {
  fullName: (value) => {
    if (!value.trim()) return "Full name is required.";
    if (value.trim().length < 2 || value.trim().length > 80) return "Please enter a valid name (2-80 characters).";
    return "";
  },
  email: (value) => {
    if (!value.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Please enter a valid email address.";
    return "";
  },
  mobile: (value) => {
    if (!value.trim()) return "Mobile number is required.";
    if (!/^\+?[0-9]{8,15}$/.test(value.trim())) return "Enter a valid mobile number (8-15 digits, optional +country code).";
    return "";
  },
  dob: (value) => {
    if (!value) return "Date of birth is required.";
    const date = new Date(value);
    if (Number.isNaN(date.getTime()) || date > new Date()) return "Please enter a valid date of birth.";
    return "";
  },
  idNumber: (value) => {
    if (!value.trim()) return "Identification (NRIC/Passport) number is required.";
    if (!/^[A-Za-z0-9]{5,20}$/.test(value.trim())) return "Enter a valid ID number (5-20 letters/numbers).";
    return "";
  },
  preferredIntake: (value) => {
    if (!value) return "Please select a preferred intake.";
    return "";
  },
  postalCode: (value) => {
    if (!value.trim()) return "Postal code is required.";
    if (!/^[A-Za-z0-9\- ]{4,10}$/.test(value.trim())) return "Enter a valid postal code (4-10 characters).";
    return "";
  },
  country: (value) => {
    if (!value) return "Please select a country.";
    return "";
  },
  address: (value) => {
    if (!value.trim()) return "Address is required.";
    if (value.trim().length > 200) return "Address is too long (max 200 characters).";
    return "";
  },
  company: (value) => {
    if (value.trim().length > 100) return "Company/Organization is too long (max 100 characters).";
    return "";
  },
  jobTitle: (value) => {
    if (value.trim().length > 100) return "Job title is too long (max 100 characters).";
    return "";
  },
  comments: (value) => {
    if (value.trim().length > 500) return "Additional comments are too long (max 500 characters).";
    return "";
  }
};

function initRegisterInterestPage() {
  const form = document.getElementById("registrationForm");
  if (!form) return;

  const summaryCard = document.getElementById("courseSummaryCard");
  const missingState = document.getElementById("courseMissingState");
  const courseId = qs("courseId");
  const course = courseId ? getCourseById(courseId) : null;

  if (!course) {
    form.hidden = true;
    summaryCard.hidden = true;
    missingState.hidden = false;
    missingState.innerHTML = `
      <div class="icon">⚠️</div>
      <h3>${courseId ? "Course not found" : "No course selected"}</h3>
      <p>${
        courseId
          ? "We couldn't find the course you're trying to register interest for."
          : "Please select a course from the listing page before registering interest."
      }</p>
      <br />
      <a href="courses.html" class="btn btn-primary">Browse Courses</a>
    `;
    return;
  }

  summaryCard.innerHTML = `
    <div><span>Course</span><strong>${escapeHtml(course.title)}</strong></div>
    <div><span>Category</span><strong>${escapeHtml(course.category)}</strong></div>
    <div><span>Duration</span><strong>${escapeHtml(course.duration)}</strong></div>
    <div><span>Fee</span><strong>${formatCurrency(course.fee)}</strong></div>
  `;

  form.querySelector("#courseId").value = course.id;
  form.querySelector("#preferredCourse").value = course.title;

  const intakeSelect = form.querySelector("#preferredIntake");
  intakeSelect.innerHTML = '<option value="">Select an intake</option>' +
    course.intakes.map((intake) => `<option value="${escapeHtml(intake)}">${escapeHtml(intake)}</option>`).join("");

  function setFieldError(field, message) {
    const group = field.closest(".form-group");
    const errorEl = group ? group.querySelector(".error-message") : null;
    if (group) group.classList.toggle("has-error", Boolean(message));
    if (errorEl) errorEl.textContent = message;
  }

  function validateField(field) {
    const validator = VALIDATORS[field.name];
    if (!validator) return true;
    const message = validator(field.value);
    setFieldError(field, message);
    return !message;
  }

  Object.keys(VALIDATORS).forEach((name) => {
    const field = form.elements[name];
    if (field) {
      field.addEventListener("blur", () => validateField(field));
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let firstInvalidField = null;
    let isValid = true;

    Object.keys(VALIDATORS).forEach((name) => {
      const field = form.elements[name];
      if (!field) return;
      const fieldValid = validateField(field);
      if (!fieldValid) {
        isValid = false;
        if (!firstInvalidField) firstInvalidField = field;
      }
    });

    if (!isValid) {
      if (firstInvalidField) firstInvalidField.focus();
      return;
    }

    const registration = {
      id: generateRegistrationId(),
      courseId: course.id,
      courseName: course.title,
      fullName: form.elements.fullName.value.trim(),
      email: form.elements.email.value.trim(),
      mobile: form.elements.mobile.value.trim(),
      dob: form.elements.dob.value,
      idNumber: form.elements.idNumber.value.trim(),
      preferredIntake: form.elements.preferredIntake.value,
      company: form.elements.company.value.trim(),
      jobTitle: form.elements.jobTitle.value.trim(),
      address: form.elements.address.value.trim(),
      postalCode: form.elements.postalCode.value.trim(),
      country: form.elements.country.value,
      comments: form.elements.comments.value.trim(),
      submittedAt: new Date().toISOString()
    };

    try {
      saveRegistration(registration);
      window.location.href = `registration-success.html?id=${encodeURIComponent(registration.id)}`;
    } catch (err) {
      const submitError = document.getElementById("submitError");
      if (submitError) {
        submitError.hidden = false;
        submitError.textContent = err.message || "Something went wrong while saving your registration.";
      }
    }
  });
}

function initSuccessPage() {
  const successContent = document.getElementById("successContent");
  if (!successContent) return;

  const errorState = document.getElementById("successErrorState");
  const id = qs("id");
  const registration = id ? getRegistrationById(id) : null;

  if (!registration) {
    successContent.hidden = true;
    errorState.hidden = false;
    errorState.innerHTML = `
      <div class="icon">⚠️</div>
      <h3>Registration not found</h3>
      <p>We couldn't find a registration matching this link. It may have been deleted, or the link is incorrect.</p>
      <br />
      <a href="courses.html" class="btn btn-primary">Back to Courses</a>
    `;
    return;
  }

  successContent.innerHTML = `
    <div class="success-card">
      <div class="success-icon">✓</div>
      <h1>Registration Successful!</h1>
      <p>Thank you, ${escapeHtml(registration.fullName)}. Your interest has been recorded.</p>
      <div class="success-id">${escapeHtml(registration.id)}</div>
      <dl class="success-summary">
        <div><dt>Course</dt><dd>${escapeHtml(registration.courseName)}</dd></div>
        <div><dt>Email</dt><dd>${escapeHtml(registration.email)}</dd></div>
        <div><dt>Mobile</dt><dd>${escapeHtml(registration.mobile)}</dd></div>
        <div><dt>Preferred Intake</dt><dd>${escapeHtml(registration.preferredIntake)}</dd></div>
        <div><dt>Company</dt><dd>${escapeHtml(registration.company || "-")}</dd></div>
        <div><dt>Submitted</dt><dd>${formatDateTime(registration.submittedAt)}</dd></div>
      </dl>
      <p class="success-note">Your registration information has been saved locally in this browser's storage only. It has not been sent to any server. Local storage is not suitable for production storage of sensitive personal information.</p>
      <div class="success-actions">
        <a href="courses.html" class="btn btn-secondary">Back to Courses</a>
        <a href="registrations.html" class="btn btn-primary">View All Registrations</a>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  initRegisterInterestPage();
  initSuccessPage();
});
