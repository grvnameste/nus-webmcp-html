/* ==========================================================================
   common.js — shared course data, utilities, and site-wide behaviour
   ========================================================================== */

const COURSES = [
  {
    id: "1",
    title: "Full-Stack Web Development Bootcamp",
    category: "Information Technology",
    shortDescription: "Learn to design, build, and deploy modern web applications from front end to back end.",
    description: "This bootcamp takes you from HTML/CSS fundamentals through modern JavaScript, backend APIs, and databases, culminating in a capstone project you can showcase to employers. Delivered by industry practitioners with a strong focus on hands-on labs.",
    duration: "16 weeks (Part-time)",
    fee: 3800,
    status: "Open for Registration",
    mode: "Hybrid",
    intakes: ["January 2027", "April 2027"],
    objectives: [
      "Build responsive, accessible web interfaces using HTML5 and CSS3",
      "Develop dynamic client-side applications with modern JavaScript",
      "Design and consume REST APIs backed by a relational database",
      "Deploy a full-stack application to a cloud environment"
    ],
    whoShouldAttend: [
      "Career switchers with no prior coding background",
      "IT support staff looking to move into development roles",
      "Recent graduates seeking practical, portfolio-ready skills"
    ],
    prerequisites: [
      "Comfortable using a computer and the internet",
      "No prior programming experience required"
    ],
    additionalInfo: "Laptops are provided for in-class sessions. Participants are encouraged to bring their own device for take-home practice."
  },
  {
    id: "2",
    title: "Data Analytics with Python",
    category: "Information Technology",
    shortDescription: "Turn raw data into actionable insights using Python, pandas, and visualization tools.",
    description: "A practical introduction to data analytics for working professionals. Covers data cleaning, exploratory analysis, and visual storytelling, with emphasis on real business datasets rather than toy examples.",
    duration: "10 weeks (Part-time)",
    fee: 2600,
    status: "Open for Registration",
    mode: "Online",
    intakes: ["February 2027", "May 2027"],
    objectives: [
      "Manipulate and clean tabular data using Python and pandas",
      "Apply descriptive statistics to summarise business data",
      "Build clear charts and dashboards to communicate findings",
      "Automate recurring reporting tasks with scripts"
    ],
    whoShouldAttend: [
      "Business analysts and operations staff",
      "Excel power-users ready to move to code-based analysis",
      "Team leads who need to interpret data-driven reports"
    ],
    prerequisites: [
      "Basic spreadsheet experience (e.g. Excel or Google Sheets)",
      "No prior coding experience required"
    ],
    additionalInfo: "Live online sessions are recorded and made available for one intake cycle for revision."
  },
  {
    id: "3",
    title: "Cloud Computing Essentials (AWS & Azure)",
    category: "Information Technology",
    shortDescription: "Get hands-on with core cloud services across AWS and Azure to support modern infrastructure.",
    description: "Covers the core building blocks of public cloud platforms, including compute, storage, networking, and identity, with side-by-side labs on both AWS and Azure so participants can compare approaches.",
    duration: "8 weeks (Part-time)",
    fee: 2200,
    status: "Closing Soon",
    mode: "Hybrid",
    intakes: ["March 2027"],
    objectives: [
      "Explain core cloud computing concepts and service models",
      "Provision and manage compute and storage resources",
      "Configure basic networking and access control",
      "Compare cost and architecture trade-offs across providers"
    ],
    whoShouldAttend: [
      "System administrators moving into cloud operations",
      "Developers who need working cloud infrastructure knowledge",
      "IT managers evaluating cloud migration options"
    ],
    prerequisites: [
      "Basic understanding of networking concepts",
      "Familiarity with using a command line is helpful but not required"
    ],
    additionalInfo: "A free-tier cloud account is required for lab exercises; setup guidance is provided before the course starts."
  },
  {
    id: "4",
    title: "Digital Marketing & Social Media Strategy",
    category: "Business & Leadership",
    shortDescription: "Plan and execute data-informed marketing campaigns across digital and social channels.",
    description: "A hands-on course covering the full digital marketing funnel, from content strategy and social media planning to campaign analytics, designed for professionals managing brand presence online.",
    duration: "6 weeks (Part-time)",
    fee: 1500,
    status: "Open for Registration",
    mode: "Classroom",
    intakes: ["January 2027", "March 2027", "June 2027"],
    objectives: [
      "Develop a content calendar aligned to business goals",
      "Plan and run paid campaigns on major social platforms",
      "Interpret campaign analytics to optimise performance",
      "Build a brand voice consistent across channels"
    ],
    whoShouldAttend: [
      "Marketing executives and coordinators",
      "Small business owners managing their own marketing",
      "Communications staff expanding into digital channels"
    ],
    prerequisites: [
      "No prior marketing certification required",
      "Basic familiarity with social media platforms as a user"
    ],
    additionalInfo: "Participants will plan a mock campaign for a business of their choice as a final assignment."
  },
  {
    id: "5",
    title: "Project Management Professional Prep",
    category: "Business & Leadership",
    shortDescription: "Build strong project management fundamentals and prepare for professional certification.",
    description: "Covers project initiation, planning, execution, monitoring, and closure using globally recognised frameworks, with exam-style practice to prepare participants for professional certification.",
    duration: "12 weeks (Part-time)",
    fee: 3200,
    status: "Open for Registration",
    mode: "Hybrid",
    intakes: ["February 2027", "June 2027"],
    objectives: [
      "Apply structured planning techniques to real projects",
      "Manage scope, schedule, budget, and risk",
      "Lead cross-functional project teams effectively",
      "Prepare for a professional project management certification exam"
    ],
    whoShouldAttend: [
      "Team leads and project coordinators",
      "Professionals preparing for a PM certification",
      "Engineers and operations staff moving into project roles"
    ],
    prerequisites: [
      "At least 1 year of work experience recommended",
      "No formal project management background required"
    ],
    additionalInfo: "Includes a set of practice assessments modelled on professional certification exam formats."
  },
  {
    id: "6",
    title: "Workplace First Aid & CPR Certification",
    category: "Healthcare & Wellness",
    shortDescription: "Get certified in essential first aid and CPR skills for the workplace.",
    description: "A practical, hands-on certification course covering first aid, CPR, and use of an automated external defibrillator (AED), suitable for designated workplace first-aiders.",
    duration: "2 days (Full-time)",
    fee: 180,
    status: "Open for Registration",
    mode: "Classroom",
    intakes: ["Weekly"],
    objectives: [
      "Perform basic life support and CPR confidently",
      "Respond appropriately to common workplace injuries",
      "Operate an AED safely during an emergency",
      "Meet workplace first-aider certification requirements"
    ],
    whoShouldAttend: [
      "Designated workplace first-aiders",
      "Human resources and safety officers",
      "Any employee seeking a personal safety certification"
    ],
    prerequisites: [
      "No prior medical training required",
      "Participants should be able to kneel and perform physical CPR practice"
    ],
    additionalInfo: "Certification is valid for 2 years from the date of completion, in line with standard practice."
  },
  {
    id: "7",
    title: "Mental Health First Responder Training",
    category: "Healthcare & Wellness",
    shortDescription: "Learn to recognise, respond to, and support colleagues experiencing mental health challenges.",
    description: "Equips participants with practical skills to identify early signs of mental distress, provide initial support, and connect colleagues to appropriate professional resources.",
    duration: "3 weeks (Part-time)",
    fee: 950,
    status: "Full",
    mode: "Classroom",
    intakes: ["April 2027"],
    objectives: [
      "Recognise early signs of common mental health conditions",
      "Apply a structured approach to initial support conversations",
      "Understand referral pathways to professional help",
      "Practice self-care strategies as a first responder"
    ],
    whoShouldAttend: [
      "HR and people managers",
      "Workplace wellness champions",
      "Team leads supporting frontline staff"
    ],
    prerequisites: [
      "No clinical background required",
      "Willingness to participate in role-play exercises"
    ],
    additionalInfo: "This intake is currently full. Join the next scheduled intake by registering interest."
  },
  {
    id: "8",
    title: "Industrial Automation & PLC Programming",
    category: "Engineering & Technical Skills",
    shortDescription: "Develop practical skills in programmable logic controllers for industrial automation.",
    description: "Covers PLC fundamentals, ladder logic programming, and integration with sensors and actuators, using industrial-grade training rigs to simulate real production environments.",
    duration: "14 weeks (Part-time)",
    fee: 3600,
    status: "Open for Registration",
    mode: "Classroom",
    intakes: ["January 2027", "May 2027"],
    objectives: [
      "Write and troubleshoot ladder logic programs",
      "Integrate sensors and actuators with PLC systems",
      "Diagnose and resolve common automation faults",
      "Apply safety standards for industrial control systems"
    ],
    whoShouldAttend: [
      "Maintenance technicians and electricians",
      "Manufacturing engineers",
      "Technical staff supporting automated production lines"
    ],
    prerequisites: [
      "Basic understanding of electrical circuits",
      "Prior technical or trade background recommended"
    ],
    additionalInfo: "Closed-toe shoes and appropriate workwear are required for all practical lab sessions."
  },
  {
    id: "9",
    title: "UI/UX Design Fundamentals",
    category: "Design & Media",
    shortDescription: "Learn user-centred design thinking, wireframing, and prototyping for digital products.",
    description: "An introduction to user experience and interface design, covering research methods, wireframing, prototyping, and usability testing, with a portfolio project as the final deliverable.",
    duration: "8 weeks (Part-time)",
    fee: 2100,
    status: "Open for Registration",
    mode: "Online",
    intakes: ["February 2027", "June 2027"],
    objectives: [
      "Conduct basic user research and synthesise findings",
      "Create wireframes and interactive prototypes",
      "Apply visual design and accessibility principles",
      "Run simple usability tests and iterate on designs"
    ],
    whoShouldAttend: [
      "Graphic designers moving into UX/UI",
      "Product managers who work closely with design teams",
      "Developers who want to design their own interfaces"
    ],
    prerequisites: [
      "No prior design software experience required",
      "Access to a computer for prototyping tools"
    ],
    additionalInfo: "Participants will complete the course with a polished case study suitable for a design portfolio."
  },
  {
    id: "10",
    title: "Business English & Professional Communication",
    category: "Languages & Communication",
    shortDescription: "Strengthen written and spoken English for the modern professional workplace.",
    description: "Focuses on practical workplace communication: emails, presentations, meetings, and reports, helping participants communicate more clearly and confidently in an English-speaking work environment.",
    duration: "6 weeks (Part-time)",
    fee: 900,
    status: "Open for Registration",
    mode: "Hybrid",
    intakes: ["Ongoing (Monthly)"],
    objectives: [
      "Write clear, professional emails and reports",
      "Deliver structured, confident presentations",
      "Participate effectively in meetings and discussions",
      "Adapt tone and register for different professional contexts"
    ],
    whoShouldAttend: [
      "Working professionals using English as a second language",
      "Staff preparing for client-facing or leadership roles",
      "Anyone seeking to communicate more confidently at work"
    ],
    prerequisites: [
      "Intermediate spoken and written English",
      "No formal English qualification required"
    ],
    additionalInfo: "Small class sizes ensure regular speaking practice and individual feedback."
  }
];

function getCourses() {
  return COURSES;
}

function getCourseById(id) {
  return COURSES.find((course) => String(course.id) === String(id));
}

function searchCourses(query, list) {
  const source = list || COURSES;
  const term = (query || "").trim().toLowerCase();
  if (!term) return source;
  return source.filter((course) =>
    [course.title, course.shortDescription, course.category]
      .join(" ")
      .toLowerCase()
      .includes(term)
  );
}

function filterCourses(filters, list) {
  const source = list || COURSES;
  const { category, status, mode } = filters || {};
  return source.filter((course) => {
    if (category && course.category !== category) return false;
    if (status && course.status !== status) return false;
    if (mode && course.mode !== mode) return false;
    return true;
  });
}

function getFilteredCourses({ query, category, status, mode } = {}) {
  let result = filterCourses({ category, status, mode });
  result = searchCourses(query, result);
  return result;
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}

function formatCurrency(amount) {
  return "S$" + Number(amount).toLocaleString("en-SG");
}

function formatDateTime(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return date.toLocaleString("en-SG", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function debounce(fn, delay) {
  let timer = null;
  return function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function statusClass(status) {
  if (status === "Open for Registration") return "status-open";
  if (status === "Closing Soon") return "status-closing";
  if (status === "Full") return "status-full";
  return "";
}

function courseCardTemplate(course) {
  return `
    <article class="course-card">
      <div class="course-card-top">
        <span class="badge badge-category">${escapeHtml(course.category)}</span>
        <span class="badge badge-status ${statusClass(course.status)}">${escapeHtml(course.status)}</span>
      </div>
      <h3 class="course-card-title">${escapeHtml(course.title)}</h3>
      <p class="course-card-desc">${escapeHtml(course.shortDescription)}</p>
      <ul class="course-card-meta">
        <li><strong>Duration:</strong> ${escapeHtml(course.duration)}</li>
        <li><strong>Fee:</strong> ${formatCurrency(course.fee)}</li>
        <li><strong>Mode:</strong> ${escapeHtml(course.mode)}</li>
        <li><strong>Intake:</strong> ${escapeHtml(course.intakes.join(", "))}</li>
      </ul>
      <a href="course-detail.html?id=${encodeURIComponent(course.id)}" class="btn btn-outline">View Details</a>
    </article>
  `;
}

function initNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-list a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

function renderFeaturedCourses() {
  const grid = document.getElementById("featuredCoursesGrid");
  if (!grid) return;
  const featured = getCourses().slice(0, 3);
  grid.innerHTML = featured.map(courseCardTemplate).join("");
}

function renderCategoryPreview() {
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;
  const counts = {};
  getCourses().forEach((course) => {
    counts[course.category] = (counts[course.category] || 0) + 1;
  });
  grid.innerHTML = Object.keys(counts)
    .map(
      (category) => `
        <a href="courses.html?category=${encodeURIComponent(category)}" class="category-card">
          <span class="category-icon">${escapeHtml(category.charAt(0))}</span>
          <h3>${escapeHtml(category)}</h3>
          <span>${counts[category]} course${counts[category] > 1 ? "s" : ""}</span>
        </a>
      `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  renderFeaturedCourses();
  renderCategoryPreview();
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
