var space_checkout = document.getElementsByClassName("space-checkout")[0]
var run_butn = document.getElementById("run")
var display_answer = document.getElementById("display-btn-area")
var op_box = document.getElementById("op-box")

function code_check(symbol){
    var symbols = [" ","^","/","\\","}","{","_"]

    if(symbols.indexOf(symbol) > -1 ) return true
    
    return false    
}

console.log("what are you looking at ?");

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

//interpreter logic
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

var toggle = false
run_butn.addEventListener("click", () => {

    op_box.innerHTML = ''

    var i = 0
    var cleaned_code = code_cleanup(space_checkout.value)

    var answer = document.createElement("textarea")
    answer.setAttribute("id","op-box")
    answer.innerText = space_interpreter(cleaned_code)

    op_box.appendChild(answer)


})

