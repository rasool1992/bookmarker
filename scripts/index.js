let bookmarkNameInput  = document.querySelector('.bookmark-name');
let bookmarkUrlInput = document.querySelector('.bookmark-url');
let tableContent = document.querySelector('.table-content');
let btnSubmit = document.querySelector('.btn-submit');
let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList')) || [];
displayContent();


// let deleteItem = document.querySelector('.delete');
// deleteItem.addEventListener('click',function(e){
//   if(e.target.classList.contains('delete') === true){
//     e.target.parentNode.closest('tr').remove();
//   }
// })

let bookmarkNameReg = /^[a-zA-Z]{3,}$/;
let bookmarkUrkReg = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;


btnSubmit.addEventListener('click',function(){
  if(valideInput(bookmarkNameReg,bookmarkNameInput)& valideInput(bookmarkUrkReg,bookmarkUrlInput))
  {
    let bookmarkObj = {
      name: bookmarkNameInput.value,
      url : bookmarkUrlInput.value
    }
    bookmarkList.push(bookmarkObj);
    localStorage.setItem('bookmarkList',JSON.stringify(bookmarkList));
    resetFields();
    displayContent();
  }else{
    alert('Invalid Input');
  }
});

bookmarkNameInput.addEventListener('input',function(){
  valideInput(bookmarkNameReg,bookmarkNameInput);
})

bookmarkUrlInput.addEventListener('input', function(){
  valideInput(bookmarkUrkReg,bookmarkUrlInput);
})

function displayContent(){
  let htmlContent = '';
  for(let i=0; i < bookmarkList.length; i++ ){
    htmlContent += `<tr>
    <td>${i+1}</td> 
      <td>${bookmarkList[i].name}</td>
      <td><a href="${bookmarkList[i].url}" target="_blank" class="text-dark">Visit</a></td>
      <td><a onclick='removeItem(${i})' href="#" class="text-dark delete">Delete</a></td>
    </tr>`
  }
  tableContent.innerHTML = htmlContent;
}


function valideInput(patern , input){
  let res = patern.test(input.value);
  if (res === true ) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    return true;
  }else{
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    return false;
  }
}
function resetFields(){
  bookmarkNameInput.value = null;
  bookmarkNameInput.classList.remove('is-valid','is-invalid');
  bookmarkUrlInput.value = null;
  bookmarkUrlInput.classList.remove('is-valid','is-invalid');
}

// AlterMethod for Delete
function removeItem(index){
  bookmarkList.splice(index,1);
  localStorage.setItem('bookmarkList',JSON.stringify(bookmarkList));
  displayContent();
}