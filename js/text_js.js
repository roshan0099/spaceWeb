console.log("what yu looking at ?")
var container = document.getElementById("container");
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
if (isMobile) {
      container.style.display = "none"
} else {
    container.style.display = "block"
}


//dragging element style

var isMouseDown,initX,initY,height = draggable.offsetHeight,width = draggable.offsetWidth;

draggable.addEventListener('mousedown', function(e) {
  isMouseDown = true;
  document.body.classList.add('no-select');
  initX = e.offsetX;
  initY = e.offsetY;
})

document.addEventListener('mousemove', function(e) {
  if (isMouseDown) {
    var cx = e.clientX - initX,
        cy = e.clientY - initY;
    if (cx < 0) {
      cx = 0;
    }
    if (cy < 0) {
      cy = 0;
    }
    if (window.innerWidth - e.clientX + initX < width) {
      cx = window.innerWidth - width;
    }
    if (e.clientY > window.innerHeight - height+ initY) {
      cy = window.innerHeight - height;
    }
    draggable.style.left = cx + 'px';
    draggable.style.top = cy + 'px';
  }
})

draggable.addEventListener('mouseup', function() {
  isMouseDown = false;
  document.body.classList.remove('no-select');
})



//touch

// draggable.addEventListener('touchstart', function(e) {
//     isMouseDown = true;
//     document.body.classList.add('no-select');
//     initX = e.offsetX;
//     initY = e.offsetY;
//   })


// document.addEventListener('touchmove', function(e) {
//     if (isMouseDown) {
//       var cx = e.clientX - initX,
//           cy = e.clientY - initY;
//       if (cx < 0) {
//         cx = 0;
//       }
//       if (cy < 0) {
//         cy = 0;
//       }
//       if (window.innerWidth - e.clientX + initX < width) {
//         cx = window.innerWidth - width;
//       }
//       if (e.clientY > window.innerHeight - height+ initY) {
//         cy = window.innerHeight - height;
//       }
//       draggable.style.left = cx + 'px';
//       draggable.style.top = cy + 'px';
//     }
//   })
  
//   draggable.addEventListener('touchend', function() {
//     isMouseDown = false;
//     document.body.classList.remove('no-select');
//   })
  
  


//drag calculator
var isMouseDownC,initXC,initYC,heightC = dragg.offsetHeight,widthC = dragg.offsetWidth;

dragg.addEventListener('mousedown', function(e) {
  isMouseDownC = true;
  document.body.classList.add('no-sel');
  initXC = e.offsetX;
  initYC = e.offsetY;
})

document.addEventListener('mousemove', function(e) {
  if (isMouseDownC) {
    var cx = e.clientX - initXC,
        cy = e.clientY - initYC;
    if (cx < 0) {
      cx = 0;
    }
    if (cy < 0) {
      cy = 0;
    }
    if (window.innerWidth - e.clientX + initXC < widthC) {
      cx = window.innerWidth - widthC;
    }
    if (e.clientY > window.innerHeight - heightC+ initYC) {
      cy = window.innerHeight - heightC;
    }
    dragg.style.left = cx + 'px';
    dragg.style.top = cy + 'px';
  }
})

dragg.addEventListener('mouseup', function() {
  isMouseDownC = false;
  document.body.classList.remove('no-sel');
})





//interpreter logic

function code_check(symbol){
    var symbols = [" ","^","/","\\","}","{","_"]

    if(symbols.indexOf(symbol) > -1 ) return true
    
    return false    
}

function code_cleanup(code){

    var filtered_code =''
    for( var i = 0; i < code.length; i++){

        if(code_check(code[i]))
            filtered_code += code[i]
    }

    return filtered_code
}


function pointing_the_brackets(text){

    var loop_position = []
    var mapping = {}

    var start_point 
    var enum_var = 0;

    for (var i = 0; i < text.length; i++){
            if (text[i] == "/") loop_position.push(enum_var)
            if (text[i] == "\\"){
            
                start_point = loop_position.pop()
                mapping[start_point] = enum_var
                mapping[enum_var] = start_point

            }
                        
            enum_var++
    }

    return mapping
}

function space_interpreter(text){
    var mapping = pointing_the_brackets(text)
    var storage_space = [0]
    var pointer = 0, point_to_cell = 0
    var code_word =''
    var interpreted_code =''
  while(pointer < text.length){

        code_word = text[pointer]

        if(code_word == "}"){
            point_to_cell++

            if(point_to_cell == storage_space.length) storage_space.push(0)
        }

        if(code_word == "{") (point_to_cell <= 0) ? point_to_cell = 0 : point_to_cell --

        if(code_word == " ")
        storage_space[point_to_cell] = (storage_space[point_to_cell] < 255) ? storage_space[point_to_cell] + 1 : 0 
        
        
        if(code_word == "^")
        storage_space[point_to_cell] = (storage_space[point_to_cell] > 0) ? storage_space[point_to_cell] - 1 : 255
        
        
        if(code_word == "/" && storage_space[point_to_cell] == 0 ) pointer = mapping[pointer]
        
        if(code_word == "\\" && storage_space[point_to_cell] != 0) pointer = mapping[pointer]
        
        if(code_word == "_")  interpreted_code += String.fromCharCode(storage_space[point_to_cell])
        pointer++
    }

    return interpreted_code
}





var draggable_elm = document.getElementById("draggable")  
var run_button = document.getElementById("run_btn")
var text_area_box = document.getElementById("terminal")
var ascii_inp = document.getElementById("ascii_inp")
var result_disp = document.getElementById("result_disp")
var calc_box = document.getElementById("dragg")
var ascii_btn = document.getElementById("ascii_btn")

draggable_elm.style.display = "none"

run_button.addEventListener("click",() => {

    
    var cleaned_code = code_cleanup(text_area_box.value)
    if(cleaned_code !== ""){

        draggable_elm.style.display = "block"
        draggable_elm.innerText = space_interpreter(cleaned_code)
    }
})

ascii_btn.addEventListener("click",() => {

    calc_box.style.display = "block"

})

ascii_inp.addEventListener("keyup",() => {

 if(ascii_inp.value !== ""){

    result_disp.style.display = "block"
    result_disp.innerText = ascii_inp.value.charCodeAt(0)

 }else{
     result_disp.innerText = ""
 }
})