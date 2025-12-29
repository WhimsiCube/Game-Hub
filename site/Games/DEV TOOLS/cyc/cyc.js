'use strict';

/* =====================================================
   CATEGORY DESCRIPTIONS (BEGINNER FRIENDLY)
===================================================== */

const CATEGORY_DESCRIPTIONS = {
  structure: "These tags define the basic structure of an HTML document. Every webpage uses these.",
  text: "These tags are used to write and format text, like headings and paragraphs.",
  semantic: "Semantic tags describe what content means, not just how it looks.",
  media: "These tags allow you to show images, audio, and video on a webpage.",
  forms: "Form tags allow users to type, click, and send information.",
  search: "Search results from all HTML categories."
};

/* =====================================================
   HTML TAG DATA (SAFE TEXT ONLY)
===================================================== */

const HTML = {
  structure: [
    {
      name: "<!DOCTYPE html>",
      works: "Tells the browser this is an HTML5 document.",
      use: "Always the first line of an HTML file.",
      example: "<!DOCTYPE html>"
    },
    {
      name: "<html>",
      works: "The root element of the page.",
      use: "Wraps all HTML content.",
      example: "<html>...</html>"
    },
    {
      name: "<head>",
      works: "Contains page information and settings.",
      use: "Used for title, styles, and metadata.",
      example: "<head>...</head>"
    },
    {
      name: "<body>",
      works: "Contains everything visible on the page.",
      use: "All text, images, and buttons go here.",
      example: "<body>...</body>"
    }
  ],

  text: [
    {
      name: "<h1> – <h6>",
      works: "Headings from largest to smallest.",
      use: "Used for titles and section headings.",
      example: "<h1>Main Title</h1>"
    },
    {
      name: "<p>",
      works: "Defines a paragraph of text.",
      use: "Used for normal text content.",
      example: "<p>Hello world</p>"
    },
    {
      name: "<span>",
      works: "Inline container for text.",
      use: "Used to style or group text.",
      example: "<span>Inline text</span>"
    },
    {
      name: "<br>",
      works: "Creates a line break.",
      use: "Moves text to the next line.",
      example: "Line one<br>Line two"
    }
  ],

  semantic: [
    {
      name: "<header>",
      works: "Represents the top section of a page or section.",
      use: "Often contains titles or navigation.",
      example: "<header>Header</header>"
    },
    {
      name: "<main>",
      works: "Main content of the page.",
      use: "Used once per page.",
      example: "<main>Main content</main>"
    },
    {
      name: "<section>",
      works: "Groups related content.",
      use: "Used to divide content into sections.",
      example: "<section>Section content</section>"
    },
    {
      name: "<footer>",
      works: "Bottom section of a page or section.",
      use: "Often contains copyright or links.",
      example: "<footer>Footer</footer>"
    }
  ],

  media: [
    {
      name: "<img>",
      works: "Displays an image.",
      use: "Used to show pictures.",
      example: "<img src=\"image.png\" alt=\"Example image\">"
    },
    {
      name: "<audio>",
      works: "Plays audio files.",
      use: "Used for music or sound effects.",
      example: "<audio controls></audio>"
    },
    {
      name: "<video>",
      works: "Plays video files.",
      use: "Used for videos.",
      example: "<video controls></video>"
    }
  ],

  forms: [
    {
      name: "<form>",
      works: "Wraps input fields.",
      use: "Used to send user data.",
      example: "<form>...</form>"
    },
    {
      name: "<input>",
      works: "Allows user input.",
      use: "Text, checkbox, password, etc.",
      example: "<input type=\"text\">"
    },
    {
      name: "<button>",
      works: "Clickable button.",
      use: "Submits forms or triggers actions.",
      example: "<button>Click me</button>"
    }
  ]
};

/* =====================================================
   FOOTER (SAFE TEXT — NO PARSING)
===================================================== */

document.getElementById("html-start").textContent =
`HTML files usually begin with:

<!DOCTYPE html>
<html>
<head>
<body>`;

/* =====================================================
   RENDERING FUNCTIONS
===================================================== */

function showCategory(category) {
  renderEntries(HTML[category]);

  document.getElementById("category-title").textContent =
    category.toUpperCase();

  document.getElementById("category-desc").textContent =
    CATEGORY_DESCRIPTIONS[category];
}

function renderEntries(list) {
  const container = document.getElementById("entries");
  container.innerHTML = "";

  list.forEach(item => {
    const entry = document.createElement("div");
    entry.className = "entry";

    const code = document.createElement("pre");
    code.textContent = item.example;

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "📋 Copy example";
    copyBtn.className = "copy";
    copyBtn.onclick = () => navigator.clipboard.writeText(item.example);

    entry.innerHTML = `
      <h3>${item.name}</h3>
      <p><strong>How it works:</strong> ${item.works}</p>
      <p><strong>How to use it:</strong> ${item.use}</p>
    `;

    entry.appendChild(code);
    entry.appendChild(copyBtn);
    container.appendChild(entry);
  });
}

function searchHTML() {
  const query = document.getElementById("search").value.toLowerCase();
  const allEntries = Object.values(HTML).flat();
  const results = allEntries.filter(item =>
    item.name.toLowerCase().includes(query)
  );

  renderEntries(results);

  document.getElementById("category-title").textContent = "SEARCH";
  document.getElementById("category-desc").textContent =
    CATEGORY_DESCRIPTIONS.search;
}
