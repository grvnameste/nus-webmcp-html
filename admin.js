/* ==========================================================================
   admin.js — registrations.html: view, search, delete, export
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("registrationsTableBody");
  if (!tableBody) return;

  const table = document.getElementById("registrationsTable");
  const emptyState = document.getElementById("registrationsEmptyState");
  const searchInput = document.getElementById("adminSearch");
  const courseFilter = document.getElementById("adminCourseFilter");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const exportCsvBtn = document.getElementById("exportCsvBtn");
  const countLabel = document.getElementById("adminResultsCount");

  function populateCourseFilter() {
    const courseNames = [...new Set(getRegistrations().map((r) => r.courseName))].sort();
    courseFilter.innerHTML = '<option value="">All courses</option>' +
      courseNames.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("");
  }

  function rowTemplate(reg) {
    return `
      <tr data-id="${escapeHtml(reg.id)}">
        <td class="reg-id-cell">${escapeHtml(reg.id)}</td>
        <td>${formatDateTime(reg.submittedAt)}</td>
        <td>${escapeHtml(reg.courseName)}</td>
        <td>${escapeHtml(reg.fullName)}</td>
        <td>${escapeHtml(reg.email)}</td>
        <td>${escapeHtml(reg.mobile)}</td>
        <td>${escapeHtml(reg.preferredIntake)}</td>
        <td>${escapeHtml(reg.company || "-")}</td>
        <td><button type="button" class="btn btn-danger row-delete-btn" data-id="${escapeHtml(reg.id)}">Delete</button></td>
      </tr>
    `;
  }

  function render() {
    const registrations = getRegistrations();
    const term = (searchInput.value || "").trim().toLowerCase();
    const courseName = courseFilter.value;

    const filtered = registrations.filter((reg) => {
      if (courseName && reg.courseName !== courseName) return false;
      if (!term) return true;
      return [reg.id, reg.fullName, reg.email, reg.mobile, reg.company, reg.courseName]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });

    countLabel.textContent = `${filtered.length} of ${registrations.length} registration${registrations.length === 1 ? "" : "s"}`;

    if (registrations.length === 0) {
      table.hidden = true;
      emptyState.hidden = false;
      emptyState.innerHTML = `
        <div class="icon">🗒️</div>
        <h3>No registrations yet</h3>
        <p>Registrations submitted through the "Register Interest" form will appear here.</p>
      `;
      return;
    }

    table.hidden = false;
    emptyState.hidden = filtered.length !== 0;
    if (filtered.length === 0) {
      emptyState.hidden = false;
      emptyState.innerHTML = `
        <div class="icon">🔍</div>
        <h3>No matching registrations</h3>
        <p>Try adjusting your search or course filter.</p>
      `;
    }

    tableBody.innerHTML = filtered.map(rowTemplate).join("");
  }

  tableBody.addEventListener("click", (event) => {
    const button = event.target.closest(".row-delete-btn");
    if (!button) return;
    const id = button.dataset.id;
    const confirmed = window.confirm(`Delete registration ${id}? This cannot be undone.`);
    if (!confirmed) return;
    deleteRegistration(id);
    populateCourseFilter();
    render();
  });

  clearAllBtn.addEventListener("click", () => {
    if (getRegistrations().length === 0) return;
    const confirmed = window.confirm("Clear ALL registrations from this browser? This cannot be undone.");
    if (!confirmed) return;
    clearRegistrations();
    populateCourseFilter();
    render();
  });

  exportCsvBtn.addEventListener("click", () => {
    if (getRegistrations().length === 0) {
      window.alert("There are no registrations to export.");
      return;
    }
    exportRegistrationsCSV();
  });

  searchInput.addEventListener("input", debounce(render, 200));
  courseFilter.addEventListener("change", render);

  populateCourseFilter();
  render();
});
