import { Person } from "../models/Person.js";
import { ListPerson } from "../models/ListPerson.js";

document.getElementById("chonDTId").onchange = (event) => {
  const { value } = event.target;
  if (value == "Student") {
    document.getElementById("renderStudent").style.display = "flex";
    document.getElementById("renderCustomer").style.display = "none";
    document.getElementById("renderEmployee").style.display = "none";
    document.getElementById("renderDanhGia").style.display = "none";
  }
  if (value == "Employee") {
    document.getElementById("renderEmployee").style.display = "flex";
    document.getElementById("renderCustomer").style.display = "none";
    document.getElementById("renderStudent").style.display = "none";
    document.getElementById("renderDanhGia").style.display = "none";
  }
  if (value == "Customer") {
    document.getElementById("renderCustomer").style.display = "flex";
    document.getElementById("renderEmployee").style.display = "none";
    document.getElementById("renderStudent").style.display = "none";
    document.getElementById("renderDanhGia").style.display = "block";
  }
  if (value == "") {
    document.getElementById("renderCustomer").style.display = "none";
    document.getElementById("renderEmployee").style.display = "none";
    document.getElementById("renderStudent").style.display = "none";
    document.getElementById("renderDanhGia").style.display = "none";
  }
};

const layoutThemPerson = () => {
  document.getElementById("btnCapNhatPerson").style.display = "none";
  document.getElementById("btnThemPerson").style.display = "block";
  document.getElementById("inputForm").reset();
  document.getElementById("nhapMaId").readOnly = false;
};

document.getElementById("btnThemNguoiDung").onclick = layoutThemPerson;

// khoi tao listPerson
const listPerson = new ListPerson();

// lay du lieu Person tu form
const layDuLieuPerson = () => {
  const arrFiled = document.querySelectorAll(
    "#inputId input, #inputId select, #inputId textarea"
  );
  const person = new Person();
  for (let filed of arrFiled) {
    let { id, value } = filed;
    person[id] = value;
  }
  return person;
};

// tat modal va clear du lieu trong form
const tatVaClearDulieu = () => {
  $("#exampleModal").modal("hide");
  document.getElementById("inputForm").reset();
};

// Them Person vao ListPerson
const themPerson = () => {
  const person = layDuLieuPerson();
  listPerson.themPerson(person);
  hienThiPerson();
  luuLocalStorage();
  tatVaClearDulieu();
};

document.getElementById("btnThemPerson").onclick = themPerson;

// hien thi listPerson len display
const hienThiPerson = (arr = listPerson.arrListPerson) => {
  let content = "";
  for (let person of arr) {
    let personNew = new Person();
    Object.assign(personNew, person);
    // làm sao để truyền tinhDiemTrungBinh và tinhLuong vào hàm đoạn này anh
    const { nhapMaId, nhapTenId, nhapDiaChiId, nhapEmailId, chonDTId} =
      personNew;
    content += `
    <tr style="vertical-align: middle;">
    <th class="text-center">${nhapMaId}</th>
    <th>${nhapTenId}</th>
    <th>${nhapDiaChiId}</th>
    <th>${nhapEmailId}</th>
    <th>${chonDTId}</th>
    <th></th>
    <th class="text-center" style="display: flex; justify-content: space-evenly;">
      <button onclick="layThongTinPerson('${nhapMaId}')" class="px-3 py-2 fs-4 border-0" style="border-radius: 10px; background-color: greenyellow;"><i class="fa-solid fa-pen-to-square"></i></button>
      <button onclick="xoaPerson('${nhapMaId}')" class="px-3 py-2 fs-4 border-0" style="border-radius: 10px; background-color: red;"><i class="fa-solid fa-trash-can"></i></button>
    </th>
  </tr>
    `;
  }
  document.getElementById("renderListStudent").innerHTML = content;
};

// luu localStorage
const luuLocalStorage = (
  arr = listPerson.arrListPerson,
  key = "arrListPerson"
) => {
  let jsonArr = JSON.stringify(arr);
  localStorage.setItem(key, jsonArr);
};

// lay du lieu tu localStorage
const layDuLieuLocalStorage = (key) => {
  let dataLocal = JSON.parse(localStorage.getItem(key));
  if (dataLocal) {
    listPerson.arrListPerson = dataLocal;
    hienThiPerson();
  }
};
layDuLieuLocalStorage("arrListPerson");

// xoa Person khoi ListPerson
const xoaPerson = (id) => {
  listPerson.xoaPerson(id);
  hienThiPerson();
  luuLocalStorage();
};
window.xoaPerson = xoaPerson;

// cap nhat du lieu Person
const layThongTinPerson = (id) => {
  document.getElementById("btnCapNhatPerson").style.display = "block";
  document.getElementById("btnThemPerson").style.display = "none";
  const person = listPerson.layThongTinPerson(id);
  const arrField = document.querySelectorAll(
    "#inputId input, #inputId select, #inputId textarea"
  );
  for (let field of arrField) {
    field.value = person[field.id];
    if (field.id == "nhapMaId") {
      field.readOnly = true;
    }
  }
  // document.getElementById("btnThemNguoiDung").click();
  $("#exampleModal").modal("show");
};

window.layThongTinPerson = layThongTinPerson;

const capNhatPerson = () => {
  const person = layDuLieuPerson();
  listPerson.updatePerson(person);
  document.getElementById("nhapMaId").readOnly = false;
  hienThiPerson();
  luuLocalStorage();
  tatVaClearDulieu();
};

document.getElementById("btnCapNhatPerson").onclick = capNhatPerson;

document.getElementById("renderFilter").onchange = (event) => {
  const { value } = event.target;
  const arrFilter = listPerson.arrListPerson.filter((item, index) => {
    return item.chonDTId == value;
  });
  if (arrFilter.length > 0) {
    hienThiPerson(arrFilter);
  } else {
    hienThiPerson();
  }
};
