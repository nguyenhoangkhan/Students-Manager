const studentsList = document.querySelector("#students");
const studentsAPI = "http://localhost:3000/students";

const getSudent = (callback) => {
  fetch(studentsAPI)
    .then((res) => res.json())
    .then(callback);
};
const renderStudents = (data) => {
  const htmls = data.map(
    (student) =>
      `<li class='item-student item-student-${student.id}'><p>Tên: ${student.name}</p> <p>Lớp: ${student.class}</p> <p>Số điện thoại phụ huynh: ${student.numberPhoneParent}</p> 
      <button class="remove-btn" onclick="handleRemoveStudent(${student.id})">Xóa</button>
      <button class="edit-btn" onclick="handleEditStudent(${student.id})" >Sửa</button>
      </li>`
  );
  studentsList.innerHTML = htmls.join("");
};
const createStudent = (data, callback) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(studentsAPI, options)
    .then((res) => res.json())
    .then(callback);
};
const handleAddStudents = () => {
  const btnAdd = document.querySelector(".add-btn");
  const input = document.querySelector(".form-input-element");
  btnAdd.onclick = () => {
    if (input.value) {
      const nameStudent = document
        .querySelector("input[name='name']")
        .value.trim();
      const classStudent = document
        .querySelector("input[name='class']")
        .value.trim();
      const numberPhoneParent = document
        .querySelector("input[name='numberPhoneParent']")
        .value.trim();
      const dataForm = {
        name: nameStudent,
        class: classStudent,
        numberPhoneParent,
      };
      createStudent(dataForm, () => {
        renderStudents(getSudent);
      });
    } else {
      handleRequired();
    }
  };
};
const handleRequired = () => {
  const inputs = document.querySelectorAll(".form-input-element");
  inputs.forEach((input) => {
    if (!input.value) {
      input.parentElement.querySelector("span").innerText =
        "Vui lòng nhập trường này";
      input.classList.add("warning");
    } else {
      input.parentElement.querySelector("span").innerText = "";
      input.classList.remove("warning");
    }
  });
};
const handleRemoveStudent = (id) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(studentsAPI + "/" + id, options)
    .then((res) => res.json())
    .then(() => {
      const itemDeleted = document.querySelector(`"item-student-${id}"`);
      itemDeleted.remove();
    });
};
const handleEditStudent = (id) => {
  const editBtns = document.querySelectorAll(".edit-btn");
  const applyBtn = document.querySelector(".apply-btn");
  const input = document.querySelector(".form-input-element");
  const handleRemoveActive = () => {
    const editBtns = document.querySelectorAll(".edit-btn.active");
    editBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
  };
  editBtns.forEach((btn) => {
    btn.onclick = () => {
      handleRemoveActive();
      btn.classList.add("active");
    };
  });
  applyBtn.onclick = () => {
    if (input.value) {
      const nameStudent = document
        .querySelector("input[name='name']")
        .value.trim();
      const classStudent = document
        .querySelector("input[name='class']")
        .value.trim();
      const numberPhoneParent = document
        .querySelector("input[name='numberPhoneParent']")
        .value.trim();
      const dataForm = {
        name: nameStudent,
        class: classStudent,
        numberPhoneParent,
      };
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      };
      fetch(studentsAPI + "/" + id, options)
        .then((res) => res.json())
        .then(() => {
          renderStudents(getSudent);
        });
    } else {
      handleRequired();
    }
  };
};

const start = () => {
  getSudent(renderStudents);
  handleAddStudents();
  handleEditStudent();
};

start();
