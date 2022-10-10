const container = document.querySelector('.container');
const contents = Array.from(document.querySelectorAll('.content'));
const loadMore = document.querySelector('#loadMore');
const backToTopBtn = document.querySelector('a[href="#top"]');
let intervalId = 0;
let maxContentItems = 4;
let loadContentItems = 4;

contents.forEach((content, index) => {
  if (index > maxContentItems - 1) {
    content.classList.add('contentHide');
  }
});

loadMore.addEventListener('click', (e) => {
  e.preventDefault();
  [].forEach.call(document.querySelectorAll('.contentHide'), (content, index) => {

    if (index < loadContentItems) {
      content.classList.remove('contentHide');
    }

    if (document.querySelectorAll(".contentHide").length === 0) {
      loadMore.style.display = "none";
    };

    loadMore.scrollIntoView({
      behavior: "smooth",
    });
    
  });
});

window.addEventListener('scroll', () => {
  const scrollTopBtn = document.querySelector('.totop a');
  if (window.scrollY > 50) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('.container').scrollIntoView({
    behavior: 'smooth'
  });
});

