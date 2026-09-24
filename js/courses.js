/* ==========================================================================
   courses.js — course listing page: search, filter, render
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("courseGrid");
  if (!grid) return;

  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const statusFilter = document.getElementById("statusFilter");
  const modeFilter = document.getElementById("modeFilter");
  const resetButton = document.getElementById("resetFilters");
  const resultsCount = document.getElementById("resultsCount");
  const emptyState = document.getElementById("emptyState");

  function populateOptions(select, values) {
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  const categories = [...new Set(getCourses().map((c) => c.category))].sort();
  const statuses = [...new Set(getCourses().map((c) => c.status))].sort();
  const modes = [...new Set(getCourses().map((c) => c.mode))].sort();

  populateOptions(categoryFilter, categories);
  populateOptions(statusFilter, statuses);
  populateOptions(modeFilter, modes);

  const initialCategory = qs("category");
  if (initialCategory && categories.includes(initialCategory)) {
    categoryFilter.value = initialCategory;
  }

  function render() {
    const filters = {
      query: searchInput.value,
      category: categoryFilter.value,
      status: statusFilter.value,
      mode: modeFilter.value
    };
    const results = getFilteredCourses(filters);

    resultsCount.innerHTML = `<strong>${results.length}</strong> of ${getCourses().length} courses`;

    if (results.length === 0) {
      grid.innerHTML = "";
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      grid.innerHTML = results.map(courseCardTemplate).join("");
    }
  }

  const debouncedRender = debounce(render, 200);

  searchInput.addEventListener("input", debouncedRender);
  categoryFilter.addEventListener("change", render);
  statusFilter.addEventListener("change", render);
  modeFilter.addEventListener("change", render);

  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "";
    statusFilter.value = "";
    modeFilter.value = "";
    render();
  });

  render();
});
