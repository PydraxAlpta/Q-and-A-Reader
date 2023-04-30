"use strict";
const chapters = [
  "Chapter 1 - The Calm",
  "Chapter 2 - Before",
  "Chapter 3 - The Storm",
  "Chapter 4 - After",
  "Chapter 5 - The Higurashi",
  "Chapter 6 - Beyond",
  "Chapter 7 - The Veil",
  "Chapter 8 - Within",
  "Chapter 9 - The God King",
  "Chapter 10 - Power Of",
  "Chapter 11 - The Question",
  "Chapter 12 - Q&",
  "Chapter 13 - A",
  "Finale - Inherited Fates",
  "The Epilogue - A Future We Desire",
];
const folderName = "Q&A Full";
/** @type {HTMLSelectElement} */
const chapterSelect = document.querySelector("select#chapterselect");
/** @type {HTMLSelectElement} */
const subChapterSelect = document.querySelector("select#subchapterselect");
const iframe = document.querySelector("iframe");
/** @type {NodeListOf<HTMLDivElement>}*/
let premables;
/** @type {HTMLDivElement} */
const contents = document.querySelector("div#contents");
/** @type {HTMLDivElement} */
const loader = document.querySelector("div#loader");

function onChapterSelect() {
  iframe.src = chapterSelect.value;
  toggleLoader();
  iframe.onload = () => {
    loadSubChapters();
    toggleLoader();
    updateButtons();
  };
}
function onSubChapterSelect() {
  premables[subChapterSelect.selectedIndex].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
function loadChapters() {
  for (const chapter of chapters) {
    const option = document.createElement("option");
    option.text = chapter;
    option.value = `${folderName}/${chapter}.html`;
    chapterSelect.appendChild(option);
  }
  chapterSelect.selectedIndex = 0;
}
function loadSubChapters() {
  premables =
    iframe.contentWindow.document.body.querySelectorAll("div.preamble");
  while (subChapterSelect.firstChild) {
    subChapterSelect.removeChild(subChapterSelect.lastChild);
  }
  premables.forEach((_premable, index) => {
    const option = document.createElement("option");
    option.text = `Sub-Chapter ${index + 1}`;
    option.value = index;
    subChapterSelect.appendChild(option);
  });
  subChapterSelect.selectedIndex = 0;
}
function onButtonClick(event) {
  switch (event.target.name) {
    case "next-chapter":
      chapterSelect.selectedIndex++;
      break;
    case "prev-chapter":
      chapterSelect.selectedIndex--;
      break;
  }
  onChapterSelect();
}

function scrollToggle() {
  iframe.classList.toggle("noscroll");
}
window.onload = () => {
  loadChapters();
  onChapterSelect();
};

function toggleLoader() {
  iframe.classList.toggle("hidden");
  loader.classList.toggle("hidden");
  document.querySelector("div.selector").classList.toggle("hidden");
}

function updateButtons() {
  /** @type {HTMLButtonElement} */
  const prevButton = document.querySelector("button#prev-chapter");
  /** @type {HTMLButtonElement} */
  const nextButton = document.querySelector("button#next-chapter");
  prevButton.removeAttribute("disabled");
  nextButton.removeAttribute("disabled");
  if (chapterSelect.selectedIndex === 0) {
    prevButton.setAttribute("disabled", "true");
  } else if (chapterSelect.selectedIndex === chapters.length - 1) {
    nextButton.setAttribute("disabled", "true");
  }
}
