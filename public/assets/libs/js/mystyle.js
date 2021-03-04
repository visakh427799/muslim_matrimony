function openNav() {
    document.getElementById("mySidebar").style.transition = ".5s";
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("mySidebar").style.display = "block"; 
    
     
 } 

 function closeNav() {
     document.getElementById("mySidebar").style.width = "0";  
     
      
}


// uplod picture 
function previewFile() {
    const preview = document.getElementById('user-profile');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}
// uplod picture  by admin
function previewPic() {
    const preview = document.getElementById('user-profile');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}