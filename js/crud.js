var person = [];
var displayPerson = [];
var sId = document.getElementById('selected-id');
var select = document.getElementById('staticEmail');
var inEmail = document.getElementById('inputEmail');
var inPassword = document.getElementById('inputPassword');
var submit = document.querySelector('#submit');
var tbody = document.getElementById('tbody');
var perPage = 3;
var page = 0;

submit.addEventListener('click', function (event) {
  event.preventDefault();
  var email = inEmail.value;
  var password = inPassword.value;
  if (email.length == 0 || password.length == 0)
    return false;
  if (this.value == 'Update') {
    id = sId.value - 1;
    updatePerson(person, id, email, password);
  } else {
    addPerson(person, (person.length)+1, email, password);
  }
  updateDisplayPerson();
  emptyFields();
  updateTable(displayPerson);
});

function addPerson(arr, serial,email,password) {
  var obj       = {};
  obj.serial    = serial;
  obj.email     = email;
  obj.password  = password;
  arr.push(obj);
}

function updatePerson(arr, index, email, password) {
  arr[index].email = email;
  arr[index].password = password;
}

function updateDisplayPerson() {
  page = (person.length > (page * perPage)) ? page : --page;
  page = (page >= 0) ? page : 0;
  var start = page * perPage;
  if (person.length < start) {
    return false;
  }
  displayPerson.splice(0);
  
  for (var index = start; index < (start + perPage); index++) {
    if (index < person.length) {
      addPerson(displayPerson, person[index].serial, person[index].email, person[index].password);
    }
  }
  if (displayPerson.length < person.length) {
    document.getElementById('pagination').removeAttribute('class');
  } else {
    document.getElementById('pagination').setAttribute('class','d-none');
  }
}

function edit(id) {
  sId.value = id;
  --id;
  select.value  = person[id].email;
  inEmail.value = person[id].email;
  inPassword.value  = person[id].password;
  submit.value  = 'Update';
  createDeleteBtn();
};

function updateTable(arr) {
  tbody.innerHTML = '';
  var start = (page * perPage) + 1;
  arr.forEach(function (val, index) {
    if (arr[index].serial > 0) {
      var tableRow = createRow(start+index, val.email, val.password);
      tbody.appendChild(tableRow);
    }
  });
}

function createRow(serial, email, password) {
  var tr = document.createElement('tr');
  var serialtd = document.createElement('td');
  var emailtd = document.createElement('td');
  var passwordtd = document.createElement('td');
  var optiontd = document.createElement('td');
  serialtd.innerHTML = serial;
  emailtd.innerHTML = email;
  passwordtd.innerHTML = password;
  var fa_edit = document.createElement('i');
  fa_edit.setAttribute('class', 'fa fa-edit');
  var editBtn = createButton('edit',serial,'btn-outline-info',fa_edit);
  optiontd.appendChild(editBtn);
  tr.appendChild(serialtd);
  tr.appendChild(emailtd);
  tr.appendChild(passwordtd);
  tr.appendChild(optiontd);
  return tr;
}

function createButton(fun,serial,cls,icon) {
  var btn = document.createElement('button');
  btn.setAttribute('class', 'btn '+cls+' btn-sm edit');
  btn.setAttribute('value', serial);
  btn.setAttribute('onclick', ''+fun+'(' + serial + ')');
  //var txt = document.createTextNode(text);
  btn.appendChild(icon);
  return btn;
}

function createDeleteBtn(){
  id = sId.value;

  var btn = document.createElement('button');
  btn.setAttribute('class', 'btn btn-danger');
  btn.setAttribute('onclick', 'deletePerson('+id+')');
  var txt = document.createTextNode('Delete');
  btn.appendChild(txt);
  document.getElementById('submit-div').appendChild(btn);
}

function deletePerson (id) {
  index = id-1;
  if (index > -1) {
    person.splice(index, 1);
  }
  person.forEach(function(val,index){
    person[index].serial = index+1;
  });

  emptyFields();
  updateDisplayPerson();
  updateTable(displayPerson);
}

function emptyFields() {
  inEmail.value = "";
  inPassword.value = "";
  sId.value = '';
  select.value = '';
  document.getElementById('submit-div').innerHTML = '';
  submit.value = 'Add';
}

// document.querySelector('#console').addEventListener('click', function (event) {
//   console.log(displayPerson);
//   console.log(person);
//   console.log(perPage);
// });

var previous = document.querySelector('#previous');
var next = document.querySelector('#next');
document.querySelector('#per-page').addEventListener('change', function (event) {
  perPage = parseInt(this.value, 10);
  page = 0;
  updateDisplayPerson();
  emptyFields();
  updateTable(displayPerson);
});
next.addEventListener('click', function (event) {
  event.preventDefault();
  ++page;
  emptyFields();
  updateDisplayPerson();
  updateTable(displayPerson);
  if (((page * perPage) + perPage) >= person.length) {
    this.setAttribute('style', 'display:none;');
    previous.removeAttribute('style');
  } else {
    previous.removeAttribute('style');
    console.log('previous button add');
  }
});

previous.addEventListener('click', function (event) {
  event.preventDefault();
  --page;
  emptyFields();
  updateDisplayPerson();
  updateTable(displayPerson);
  if (page == 0) {
    this.setAttribute('style', 'display:none;');
    next.removeAttribute('style');
  } else {
    next.removeAttribute('style');
    console.log('next button add');
  }
});
