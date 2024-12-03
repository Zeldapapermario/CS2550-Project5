/*    
 
Project:  Project 5
Name: Kyle Allred
Submitted: 12/2/24
 
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.
 
Reflection (1-2 paragraphs):  I learned more about Javascript than I did before. There was a moment where I kept getting an error message at a certain point in the code. 
In the checkRequired function I kept a null value when I used document.getElementById(id). I thought it was some issue with that function but I eventually discovered it
was an issue with how I added the error message in the setElementValidity function.
 
*/

document.addEventListener("DOMContentLoaded", function(event) {    
  Validation("myForm");
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
  modalImg.style.float = "none";
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}