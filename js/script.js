/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//assigning variables
const pageDiv = document.querySelector('.page');
const originalList = document.getElementsByClassName('student-item cf');
const originalListLength = originalList.length;
const headerDiv = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
const searchBar = document.createElement('input');
const searchButton = document.createElement('button');
const noResults = document.createElement('h3');
const body = document.querySelector('body');
let studentList = document.getElementsByClassName('student-item cf');
let studentListLength = studentList.length;

//adding h3 to the page to notify when there were no search results
  body.appendChild(noResults);
//adding searchbar to the page.
  searchDiv.className = 'student-search';
  searchBar.placeholder = "Search for students...";
  searchButton.textContent = 'Search';
  searchDiv.appendChild(searchBar);
  searchDiv.appendChild(searchButton);
  headerDiv.appendChild(searchDiv);




// function that will display a given number of students per page.
function filterStudents (num, num2, listLength, list) {
  for (let i = 0; i < listLength; i++) {
    const student = list[i];
    if(i >= num && i < num2) {
      student.style.display = '';
    } else {
      student.style.display = 'none';
    }
  }
}
//Calling function so 10 students will be shown on the first page.
filterStudents(0, 10, originalListLength, originalList);


// creating a function to place numbered buttons at the bottom of the page.
//each button will display a maximum of 10 students when clicked.
function createPaginationLink (num) {
  const buttonDiv = document.createElement('div')
  buttonDiv.className = 'buttonDiv';
  pageDiv.appendChild(buttonDiv);
  for(let i = 0; i < (num/10);i ++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = (i + 1);
    pageButton.className = 'pagination';
    pageButton.id = i;
    buttonDiv.appendChild(pageButton);
  }
  return num;
}
//calling fuction to assign button when the page loads.
createPaginationLink(originalListLength);
//fuction to remove buttons from the page
function removeButtonDiv() {
  const buttonDiv = document.querySelector('.buttonDiv') ;
  pageDiv.removeChild(buttonDiv);
}
//search function to compare searchBar value to list of students and return matches.
//also displays number of matches or a message if there are none
function search () {

  let counter = 0;
  for (let i = 0; i < originalListLength; i++) {
    if(originalList[i].textContent.indexOf(searchBar.value) !== -1) {
      originalList[i].style.display = '';
      counter += 1;
    } else {
      originalList[i].style.display = 'none';
  }
    noResults.textContent = 'There are ' + counter + ' students matching your search';
}
if( counter === 0){
  noResults.textContent = 'There are no students matching your search.';
  }
}
//creates a new array of students based on the searchbar value
function createNewList() {
  let newList = [];
  for (let i = 0; i < originalListLength; i++) {
    if(originalList[i].textContent.indexOf(searchBar.value) !== -1) {
      newList.push(originalList[i]);
    }
}
return newList;
}

//Adding click listener to the search and page buttons.
pageDiv.addEventListener('click', (e) => {
    const button = e.target;
//function that assigns a new list of students for each button depending on searchbar value
  function buttonFilter(num, list) {
      for (let i = 0; i < (num/10); i++) {
        if(button.id == i) {
       filterStudents((i*10), ((i+1)*10), num, list);
     }
    }
    }
  if(button.tagName === 'BUTTON') {
    /*if the search button is clicked a new list of students is created based on searchbar value
    and then new buttons a placed.*/
    if (button.textContent === 'Search') {
      studentList = createNewList();
      studentListLength = studentList.length;
      search();
      removeButtonDiv();
      createPaginationLink(studentListLength);
      buttonFilter(studentListLength, studentList);
      //if the page buttons are clicked they will display 10 students per page 
    } else if(button.className === "pagination") {
        buttonFilter(studentListLength, studentList);
      }
    }
});
