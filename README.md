# SkillPath Academy — Course Listing & Registration Website

A responsive course listing and registration demo site built with plain HTML5, CSS3, and vanilla JavaScript (ES6+). No frameworks, build tools, or backend are required.

The UI/UX flow (course listing → course detail → register interest → form → confirmation → registration management) is inspired by public polytechnic course-catalogue and registration websites, but all code, content, branding, and sample data in this project are original.

## Getting Started

No build step or server is required.

1. Open `index.html` directly in a modern browser, or
2. Serve the folder with any static file server, for example:
   ```
   npx serve .
   ```

## Project Structure

```
project/
├── index.html                 Home page with hero, categories, featured courses
├── courses.html                Full course listing with search & filters
├── course-detail.html          Single course detail page (course-detail.html?id=1)
├── register-interest.html      Registration form (register-interest.html?courseId=1)
├── registration-success.html   Confirmation page (registration-success.html?id=REG-...)
├── registrations.html          Registration management / admin demo page
│
├── css/
│   ├── style.css                Global styles, layout, nav, cards, footer
│   ├── courses.css              Course listing toolbar/filter styles
│   ├── course-detail.css        Course detail layout styles
│   └── registration.css         Registration form, success, and admin table styles
│
└── js/
    ├── common.js                 Course data, shared utilities, nav behaviour
    ├── storage.js                localStorage persistence for registrations
    ├── courses.js                Course listing search/filter logic
    ├── course-detail.js          Course detail rendering
    ├── registration.js           Registration form + success page logic
    └── admin.js                  Registration management page logic
```

## Functional Flow

```
Course Listing → Search/Filter → Select Course → Course Detail →
Register Interest → Fill Form → Client-side Validation → Submit →
Save to Local Storage → Registration ID Generated → Success Page →
View in Registration Management
```

## Key Features

- Client-side search and filtering by keyword, category, status, and mode on the course listing page.
- Course details driven entirely by a JavaScript data structure (`COURSES` in `js/common.js`) — adding a course only requires adding an object to that array.
- Registration form with HTML5 + JavaScript validation (required fields, email format, mobile number format, postal code format, and input length limits), with inline error messages and no page reloads.
- Registrations are saved to `localStorage` under the key `courseRegistrations`, with a generated ID such as `REG-20260924-001`. Multiple submissions are appended, not overwritten.
- Registration management page (`registrations.html`) with search, course filter, individual delete (with confirmation), clear-all (with confirmation), and CSV export.
- Responsive layout for desktop, tablet, and mobile, with keyboard-accessible navigation and visible focus states.

## Data Persistence & Limitations

This project uses the browser's `localStorage` API for all registration data. This means:

- Data persists across page refreshes, but only in the browser and device where it was submitted.
- Clearing browser data, using a different browser, or using private/incognito mode will result in different or empty registration data.
- **Local storage is not encrypted and is not suitable for storing sensitive personal information (such as NRIC/passport numbers) in a production system.** A real deployment should replace `js/storage.js` with calls to a secured backend API and database.

## Notes on References

No source code, images, or branding were copied from any reference website. Layout patterns and general user flows (course cards, filters, a course detail page, and a registration form) are common, non-proprietary UX conventions used broadly across course-catalogue websites; all HTML, CSS, JavaScript, copy, and sample course data here are original to this project.
