var space_checkout = document.getElementsByClassName("space-checkout")[0]
var run_butn = document.getElementById("run")
var display_answer = document.getElementById("display-btn-area")
var op_box = document.getElementById("op-display")
var sub_menu = document.getElementById("sub-menu")


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


//logo hover-effect

var gh_logo = document.getElementById("gh-img")

gh_logo.addEventListener("mouseover",() => {

	gh_logo.setAttribute("src","img\\gh_t.png")

})

gh_logo.addEventListener("mouseout",() => {

	gh_logo.setAttribute("src","img\\gh.png")

})



var null_logo = document.getElementById("null-img")

null_logo.addEventListener("mouseover",() => {

	null_logo.setAttribute("src","img\\null.png")

})

null_logo.addEventListener("mouseout",() => {

	null_logo.setAttribute("src","img\\null_t.png")

})





// slide
var sub_menu_class = document.getElementsByClassName("option")
var space_op1 = document.getElementById("Space-option1")
var space_op2 = document.getElementById("Space-option2")
var space_op3 = document.getElementById("Space-option3")
var options = document.getElementsByClassName("option")

options[0].style.borderBottom = "solid 1px green"
space_op2.style.display = "none"
space_op3.style.display = "none"
// var space_op1 = document.getElementById("Space-option1")

sub_menu.addEventListener('click',(e) => {
  // var classNameOp = 
	var clicked_id = e.target.id

  	switch(clicked_id){
		case "option1":
			space_op3.style.display = "none"
			space_op2.style.display = "none"
			space_op1.style.display = "block"

			options[1].style.borderBottom = ""
			options[2].style.borderBottom = ""
			options[0].style.borderBottom = "solid 1px green"
		
		break

		case "option2":
			space_op3.style.display = "none"
			space_op1.style.display = "none"
			space_op2.style.display = "block"

			options[0].style.borderBottom = ""
			options[2].style.borderBottom = ""
			options[1].style.borderBottom = "solid 1px green"
			
			break

		case "option3":
			space_op1.style.display = "none"
			space_op2.style.display = "none"
			space_op3.style.display = "block"

			options[0].style.borderBottom = ""
			options[1].style.borderBottom = ""
			options[2].style.borderBottom = "solid 1px green"
		
		break

  }


})







// //canvas 

// var w = c.width = window.innerWidth,
//     h = c.height = window.innerHeight,
//     ctx = c.getContext( '2d' ),
    
//     minDist = 10,
//     maxDist = 30,
//     initialWidth = 2,
//     maxLines = 9,
//     initialLines = 9,
//     speed = 3,
    
//     lines = [],
//     frame = 0,
//     timeSinceLast = 0,
    
//     dirs = [
//    // straight x, y velocity
//       [ 0, 1 ],
//       [ 1, 0 ],
//       [ 0, -1 ],
//     	[ -1, 0 ],
//    // diagonals, 0.7 = sin(PI/4) = cos(PI/4)
//       [ .7, .7 ],
//       [ .7, -.7 ],
//       [ -.7, .7 ],
//       [ -.7, -.7]
//     ],
//     starter = { // starting parent line, just a pseudo line
      
//       x: w / 2,
//       y: h / 2,
//       vx: 0,
//       vy: 0,
//       width: initialWidth
//     };

// function init() {
  
//   lines.length = 0;
  
//   for( var i = 0; i < initialLines; ++i )
//     lines.push( new Line( starter ) );
  
//   ctx.fillStyle = '#0000';
//   ctx.fillRect( 0, 0, w, h );
  
//   // if you want a cookie ;)
//   // ctx.lineCap = 'round';
// }
// function getColor( x ) {
  
//   return 'hsl( hue, 80%, 50% )'.replace(
//   	'hue', x / w * 360 + frame
//   );
// }
// function anim() {
  
//   window.requestAnimationFrame( anim );
  
//   ++frame;
  
//   ctx.shadowBlur = 0;
//   ctx.fillStyle = 'rgba(0,0,0,.02)';
//   ctx.fillRect( 0, 0, w, h );
//   ctx.shadowBlur = .5;
  
//   for( var i = 0; i < lines.length; ++i ) 
    
//     if( lines[ i ].step() ) { // if true it's dead
      
//       lines.splice( i, 1 );
//       --i;
      
//     }
  
//   // spawn new
  
//   ++timeSinceLast
  
//   if( lines.length < maxLines && timeSinceLast > 10 && Math.random() < .5 ) {
    
//     timeSinceLast = 0;
    
//     lines.push( new Line( starter ) );
    
//     // cover the middle;
//     ctx.fillStyle = ctx.shadowColor = getColor( starter.x );
//     ctx.beginPath();
//     ctx.arc( starter.x, starter.y, initialWidth, 0, Math.PI * 2 );
//     ctx.fill();
//   }
// }

// function Line( parent ) {
  
//   this.x = parent.x | 0;
//   this.y = parent.y | 0;
//   this.width = parent.width / 1.25;
  
//   do {
    
//     var dir = dirs[ ( Math.random() * dirs.length ) |0 ];
//     this.vx = dir[ 0 ];
//     this.vy = dir[ 1 ];
    
//   } while ( 
//     ( this.vx === -parent.vx && this.vy === -parent.vy ) || ( this.vx === parent.vx && this.vy === parent.vy) );
  
//   this.vx *= speed;
//   this.vy *= speed;
  
//   this.dist = ( Math.random() * ( maxDist - minDist ) + minDist );
  
// }
// Line.prototype.step = function() {
  
//   var dead = false;
  
//   var prevX = this.x,
//       prevY = this.y;
  
//   this.x += this.vx;
//   this.y += this.vy;
  
//   --this.dist;
  
//   // kill if out of screen
//   if( this.x < 0 || this.x > w || this.y < 0 || this.y > h )
//     dead = true;
  
//   // make children :D
//   if( this.dist <= 0 && this.width > 1 ) {
    
//     // keep yo self, sometimes
//     this.dist = Math.random() * ( maxDist - minDist ) + minDist;
    
//     // add 2 children
//     if( lines.length < maxLines ) lines.push( new Line( this ) );
//     if( lines.length < maxLines && Math.random() < .5 ) lines.push( new Line( this ) );
    
//     // kill the poor thing
//     if( Math.random() < .2 ) dead = true;
//   }
  
//   ctx.strokeStyle = ctx.shadowColor = getColor( this.x );
//   ctx.beginPath();
//   ctx.lineWidth = this.width;
//   ctx.moveTo( this.x, this.y );
//   ctx.lineTo( prevX, prevY );
//   ctx.stroke();
  
//   if( dead ) return true
// }

// init();
// anim();

// window.addEventListener( 'resize', function() {
  
//   w = c.width = window.innerWidth;
//   h = c.height = window.innerHeight;
//   starter.x = w / 2;
//   starter.y = h / 2;
  
//   init();
// } )









/////////////////////////////////



particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 290,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "triangle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 10
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": true,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 100,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 100,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});


var play_ground = document.getElementById("pground")
var space_transition = document.getElementById("space-trans")

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
if (isMobile) {
      play_ground.setAttribute("href", "#")
      space_transition.setAttribute("href","#")
} else {
  play_ground.setAttribute("href", "textEditor.html")
  space_transition.setAttribute("href","textEditor.html")
}
