console.log("hey yo");

var space_checkout = document.getElementsByClassName("space-checkout")[0];
var run_butn = document.getElementById("run");

function space_interpreter(text){
    console.log(text[0])
}

run_butn.addEventListener("click", () => {
    console.log("insie")
    space_interpreter(space_checkout.value)
})

