const Chapters = [
  'Chapter 1 - The Calm',
  'Chapter 2 - Before',
  'Chapter 3 - The Storm',
  'Chapter 4 - After',
  'Chapter 5 - The Higurashi',
  'Chapter 6 - Beyond',
  'Chapter 7 - The Veil',
  'Chapter 8 - Within',
  'Chapter 9 - The God King',
  'Chapter 10 - Power Of',
  'Chapter 11 - The Question',
  'Chapter 12 - Q_',
  'Chapter 13 - A',
  'Finale - Inherited Fates',
  'The Epilogue - A Future We Desire',
];
const folderName = 'Q&A Full';
const chapterSelect = document.querySelector('select#chapterselect');
const subChapterSelect = document.querySelector('select#subchapterselect');
const iframe = document.querySelector('iframe');
let premables;

function ChapterSelect() {
  iframe.src = chapterSelect.value;
  iframe.onload = LoadSubChapters;
}
function SubChapterSelect() {
  premables[subChapterSelect.selectedIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}
function LoadChapters() {
  for (const chapter of Chapters) {
    const option = document.createElement('option');
    option.text = chapter;
    option.value = `${folderName}/${chapter}.html`;
    chapterSelect.appendChild(option);
  }
  chapterSelect.selectedIndex = 0;
}
function LoadSubChapters() {
  premables = iframe.contentWindow.document.body.querySelectorAll('div.preamble');
  while(subChapterSelect.firstChild) {
    subChapterSelect.removeChild(subChapterSelect.lastChild);
  }
  premables.forEach((_premable, index) => {
    const option = document.createElement('option');
    option.text = `Sub-Chapter ${index + 1}`;
    option.value = index;
    subChapterSelect.appendChild(option);
  });
  subChapterSelect.selectedIndex = 0;
}
function ScrollToggle() {
  const scrollClass = 'noscroll';
  iframe.classList.contains(scrollClass) ? iframe.classList.remove(scrollClass) : iframe.classList.add(scrollClass);
}
window.onload = () => {
  LoadChapters();
  ChapterSelect();
};
