var game_field = document.getElementById("game_field");
var cells;
var cross_move = true;
var cross = document.getElementById("cross").outerHTML;
var circle = document.getElementById("circle").outerHTML;
var num;
var smbd_win = false;
var win_message = document.getElementById("win_message");


function cell_draw(input){
	num = Number(input.value);
	redraw();
	if(num>=3){
		for(let i = 0; i<num**2; i++){
			game_field.innerHTML+='<div class="cell" onclick="move(this)"></div>';
			game_field.style=`grid-template-columns: repeat(${num}, 1fr);`;
		}
		cells = document.getElementsByClassName("cell");
	}
};

function redraw(){
	game_field.innerHTML='';
};

function move(cell){
	if(cell.innerHTML==""&&!smbd_win){
		if(cross_move){
			cell.innerHTML=cross;
		}
		else{
			cell.innerHTML=circle;
		}
		if(checkWin()) {
			smbd_win = true;
			win_message.innerHTML="Победили " + (cross_move ? "крестики!" : "нолики!");
		}
		cross_move=!cross_move;
	}
}

function checkWin(){
	var win = false;
	{ //строки
		for(var i = 0; i<num**2; i=i+num){
			if(cells[i].innerHTML!=""){
				win=true;
				for(var j = 1; j<num && win==true; j++){
					win = win && (cells[i].innerHTML==cells[i+j].innerHTML)
				}
			}
			if(win){
				for(var k = 0; k<num; k++){
					cells[i+k].style="background-color: #7bff8e;"
				}
				return true;
			} 
		}
	}

	{ //столбцы
		for(var i =0; i<num; i++){
			if(cells[i].innerHTML!=""){
				win=true;
				for(var j = 1; j<num && win==true; j++){
					win = win && (cells[i].innerHTML==cells[i+j*num].innerHTML)
				}
			}
			if(win){
				for(var k = 0; k<num; k++)
				{
					cells[i+num*k].style="background-color: #7bff8e;"
				}
				return true;
			}
		}
	}

	{ //диагонали
		if(cells[0].innerHTML!=""){ 
			win=true;
			for(var j = 1; j<num && win==true; j++){
				win = win && (cells[0].innerHTML==cells[j+j*num].innerHTML)
			}
		}
		if(win){
			for(var k = 0; k<num; k++)
			{
				cells[k*(num+1)].style="background-color: #7bff8e;"
			}
			return true;
		} 

		if(cells[num-1].innerHTML!=""){ 
			win=true;
			for(var j = 2; j<=num && win==true; j++){
				win = win && (cells[num-1].innerHTML==cells[j*num-j].innerHTML)
			}
		}
		if(win){
			for(var k = 1; k<=num; k++)
			{
				cells[k*(num-1)].style="background-color: #7bff8e;"
			}
			return true;
		} 
		return win;
	}
}

function reset(){
	for(let i = 0; i<num**2; i++){
		cells[i].innerHTML='';
		cells[i].style=""
	}
	smbd_win=false;
	cross_move = true;
	win_message.innerHTML="";
}




