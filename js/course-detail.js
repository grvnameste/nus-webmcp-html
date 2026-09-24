/* ==========================================================================
   course-detail.js — renders a single course's full details
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("courseDetailContent");
  const errorState = document.getElementById("courseErrorState");
  const breadcrumb = document.getElementById("breadcrumb");
  if (!content) return;

  const id = qs("id");
  const course = id ? getCourseById(id) : null;

  if (!course) {
    content.hidden = true;
    breadcrumb.innerHTML = `
      <a href="index.html">Home</a> / <a href="courses.html">Courses</a> / <span class="current">Not found</span>
    `;
    errorState.hidden = false;
    errorState.innerHTML = `
      <div class="icon">⚠️</div>
      <h3>${id ? "Course not found" : "Missing course ID"}</h3>
      <p>${
        id
          ? "We couldn't find a course matching this link. It may have been removed or the link is incorrect."
          : "No course was specified. Please choose a course from the listing page."
      }</p>
      <br />
      <a href="courses.html" class="btn btn-primary">Back to Courses</a>
    `;
    return;
  }

  breadcrumb.innerHTML = `
    <a href="index.html">Home</a> / <a href="courses.html">Courses</a> / <span class="current">${escapeHtml(course.title)}</span>
  `;

  content.innerHTML = `
    <div class="detail-layout">
      <div>
        <div class="detail-header">
          <div class="course-card-top">
            <span class="badge badge-category">${escapeHtml(course.category)}</span>
            <span class="badge badge-status ${statusClass(course.status)}">${escapeHtml(course.status)}</span>
          </div>
          <h1>${escapeHtml(course.title)}</h1>
          <p class="lead">${escapeHtml(course.shortDescription)}</p>
        </div>

        <div class="overview-grid">
          <div class="overview-item"><span>Duration</span><strong>${escapeHtml(course.duration)}</strong></div>
          <div class="overview-item"><span>Mode</span><strong>${escapeHtml(course.mode)}</strong></div>
          <div class="overview-item"><span>Fee</span><strong>${formatCurrency(course.fee)}</strong></div>
          <div class="overview-item"><span>Intake</span><strong>${escapeHtml(course.intakes.join(", "))}</strong></div>
        </div>

        <section class="detail-section">
          <h2>Course Overview</h2>
          <p>${escapeHtml(course.description)}</p>
        </section>

        <section class="detail-section">
          <h2>Course Objectives</h2>
          <ul>${course.objectives.map((o) => `<li>${escapeHtml(o)}</li>`).join("")}</ul>
        </section>

        <section class="detail-section">
          <h2>Who Should Attend</h2>
          <ul>${course.whoShouldAttend.map((w) => `<li>${escapeHtml(w)}</li>`).join("")}</ul>
        </section>

        <section class="detail-section">
          <h2>Requirements / Prerequisites</h2>
          <ul>${course.prerequisites.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
        </section>

        <section class="detail-section">
          <h2>Additional Information</h2>
          <p>${escapeHtml(course.additionalInfo)}</p>
        </section>
      </div>

      <aside class="detail-sidebar">
        <div class="cta-card">
          <div class="fee">${formatCurrency(course.fee)}</div>
          <div class="fee-note">Course fee, per participant</div>
          <dl>
            <div><dt>Duration</dt><dd>${escapeHtml(course.duration)}</dd></div>
            <div><dt>Mode</dt><dd>${escapeHtml(course.mode)}</dd></div>
            <div><dt>Status</dt><dd>${escapeHtml(course.status)}</dd></div>
            <div><dt>Intake</dt><dd>${escapeHtml(course.intakes.join(", "))}</dd></div>
          </dl>
          <a href="register-interest.html?courseId=${encodeURIComponent(course.id)}" class="btn btn-primary btn-block">Register Interest</a>
        </div>
      </aside>
    </div>
  `;
});
