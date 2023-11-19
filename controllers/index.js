import {Person} from "../models/Person.js";
import { ListPerson } from "../models/ListPerson.js";

// khoi tao listPerson
const listPerson = new ListPerson();

// Them Person vao ListPerson
const themPerson = () => {
  const arrFiled = document.querySelectorAll(
    "#inputId input, #inputId select, #inputId textarea"
  );
  const person = new Person();
  for (let filed of arrFiled) {
    let { id, value } = filed;
    person[id] = value;
  }
  listPerson.themPerson(person);
  hienThiPerson();
};

document.getElementById("btnThemPerson").onclick = themPerson;

// hien thi listPerson len display
const hienThiPerson = (arr = listPerson.arrListPerson) => {
  let content = "";
  for (let person of arr) {
    const { nhapMaId, nhapTenId, nhapDiaChiId, nhapEmailId, chonDTId } = person;
    content += `
    <tr style="vertical-align: middle;">
    <th class="text-center">${nhapMaId}</th>
    <th>${nhapTenId}</th>
    <th>${nhapDiaChiId}</th>
    <th>${nhapEmailId}</th>
    <th>${chonDTId}</th>
    <th></th>
    <th class="text-center" style="display: flex; justify-content: space-evenly;">
      <button class="px-3 py-2 fs-4 border-0" style="border-radius: 10px; background-color: greenyellow;"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="px-3 py-2 fs-4 border-0" style="border-radius: 10px; background-color: red;"><i class="fa-solid fa-trash-can"></i></button>
    </th>
  </tr>
    `;
  }
  document.getElementById("renderListStudent").innerHTML = content;
};
hienThiPerson();
