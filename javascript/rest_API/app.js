const coursesApi = "http://localhost:3000/courses";
const listCoursesBlock = document.querySelector("#list-courses");
const postForm = document.querySelector("#post-form");
const editForm = document.querySelector("#edit-form");
const modal = document.querySelector(".modal-overlay");
let htmls = "";

function start() {
  getCourses();
  handlePostCourses();
  handleDeleteAndEditCourse();
  handleModal();
}
start();

// Functions
function getCourses() {
  fetch(coursesApi)
    .then(response => response.json())
    .then(data => renderCourses(data));
}

function renderCourses(courses) {
  courses.forEach(course => {
    htmls += `
    <li id="course-item" data-id="${course.id}">
      <div id="image-wrap">
        <div id="course-image" style="background-image:url(${course.image})";></div>
      </div>
      <div id="course-body">
        <h4 id="course-name">${course.name}</h4>
        <p id="course-description">${course.description}</p>
      </div>
      <div id="course-btn" data-id="${course.id}">
        <a href="#" class="course-btn" id="edit-link">Edit</a>
        <a href="#" class="course-btn" id="delete-link">Delete</a>
      </div>
      <div>
      </div>
    </li>
    `;
  });
  listCoursesBlock.innerHTML = htmls;
}

function handlePostCourses() {
  const namePost = document.querySelector('input[name="post-name"]');
  const imagePost = document.querySelector('input[name="post-image"]');
  const descriptionPost = document.querySelector('textarea[name="post-description"]');

  postForm.addEventListener("submit", e => {
    e.preventDefault();
    fetch(coursesApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: namePost.value,
        image: `https://img.youtube.com/vi/${imagePost.value}/sddefault.jpg`,
        description: descriptionPost.value,
      }),
    })
      .then(response => response.json())
      .then(data => {
        const dataArray = [];
        dataArray.push(data);
        renderCourses(dataArray);
      });
  });
  namePost.value = "";
  imagePost.value = "";
  descriptionPost.value = "";
}

function handleDeleteAndEditCourse() {
  const nameEdit = document.querySelector('input[name="edit-name"]');
  const imageEdit = document.querySelector('input[name="edit-image"]');
  const descriptionEdit = document.querySelector('textarea[name="edit-description"]');

  listCoursesBlock.addEventListener("click", e => {
    e.preventDefault();
    let editLink = e.target.id == "edit-link";
    let deleteLink = e.target.id == "delete-link";
    let id = e.target.parentElement.dataset.id;

    // Handle delete course
    if (deleteLink) {
      fetch(`${coursesApi}/${id}`, {
        method: "DELETE",
      })
        .then(response => response.json())
        .then(() => location.reload());
    }

    // Handle edit course
    if (editLink) {
      modal.style.display = "block";
      editForm.style.display = "block";

      const parent = e.target.parentElement.closest("#course-item");
      let nameContent = parent.querySelector("#course-name").textContent;
      let descriptionContent = parent.querySelector("#course-description").textContent;
      let imageId = parent.querySelector("#course-image").style.backgroundImage.split("/")[4];

      nameEdit.value = nameContent;
      descriptionEdit.value = descriptionContent;
      imageEdit.value = imageId;
    }

    editForm.addEventListener("submit", e => {
      e.preventDefault();
      fetch(`${coursesApi}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameEdit.value,
          image: `https://img.youtube.com/vi/${imageEdit.value}/sddefault.jpg`,
          description: descriptionEdit.value,
        }),
      })
        .then(response => response.json())
        .then(() => location.reload());
    });
  });
}

function hideModalAndForm() {
  modal.style.display = "none";
  postForm.style.display = "none";
  editForm.style.display = "none";
}

function handleModal() {
  const postFormCloseIcon = document.querySelector(".post-form-close-icon");
  const editFormCloseIcon = document.querySelector(".edit-form-close-icon");
  const createBtn = document.querySelector("#create-link");
  const postBtn = document.querySelector(".post-btn");

  createBtn.addEventListener("click", () => {
    modal.style.display = "block";
    postForm.style.display = "block";
  });

  postBtn.addEventListener("click", () => {
    hideModalAndForm();
  });

  modal.addEventListener("click", () => {
    hideModalAndForm();
  });

  editFormCloseIcon.addEventListener("click", () => {
    hideModalAndForm();
  });

  postFormCloseIcon.addEventListener("click", () => {
    hideModalAndForm();
  });
}


