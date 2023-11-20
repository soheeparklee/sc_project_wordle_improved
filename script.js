
let attempts= 0;
let index= 0;
let interval

const answer= "PARIS"

function appStart(){
    const startTime= new Date();
    const timer= () =>{
        const timer= document.querySelector(".time");
        const currentTime= new Date();
        const passedTime= new Date(currentTime -startTime);
        const minutes= passedTime.getMinutes().toString().padStart(2, "0");
        const seconds= passedTime.getSeconds().toString().padStart(2, "0");
        timer.innerHTML= `${minutes}:${seconds}`
    }
    interval = setInterval(timer, 1000);

    const handleDelete= () =>{
        if (index>0) {
        const preBox= document.querySelector(`.box_block[data-index= "${attempts}${index-1}"]`);
        preBox.innerHTML = "";
        index -= 1;
        } else return;
        
    }

    const gameLost= () =>{
        const failDiv = document.createElement("div");
        document.body.appendChild(failDiv);
        failDiv.innerText= "You Lost";
        failDiv.style= "display:flex; justify-content:center; align-items:center; position:absolute; top:50vh; width:50vw;"
    }
    const gameWin= () =>{
        const winDiv = document.createElement("div");
        document.body.appendChild(winDiv);
        winDiv.innerText= "You Won";
        winDiv.style= "display:flex; justify-content:center; align-items:center; position:absolute; top: 50vh; left: 50vw;";
    }

    const gameOver= () =>{
        window.removeEventListener("keydown", handleKeyDown);
        clearInterval(interval);
        return;
    }

    const nextLine= () =>{
        attempts += 1;
        index =0;
        if(attempts === 6){ 
            gameLost(); gameOver();
        }
    }
    const handleEnter = () =>{
        let rightAnswer= 0;
        for(let i=0; i<5; i++){
            //워들의 정답과 client의 정답이 일치하는지 한 글자씩 확인해야 함. 
            //client가 입력한 답 한 글자씩 가져오는 방법
            const thisBox= document.querySelector(`.box_block[data-index= "${attempts}${i}"]`)
            const clientAnswer= thisBox.innerText;
            
            if (answer[i] === clientAnswer){
                thisBox.style.background= "rgb(106,169,100)";
                rightAnswer += 1;
                console.log(rightAnswer);
            }else if (answer.includes(clientAnswer) ){
                thisBox.style.background= "rgb(201,180,88)";
            } else{
                thisBox.style.background= "rgb(120,124,126)";
            }

            thisBox.style.color= "white";

        
        }
        if (rightAnswer === 5) {
            gameWin(); gameOver();
        } else nextLine();
        };
        
    

    const handleKeyDown= (event) =>{
        
        const key= event.key.toUpperCase();
        const keyCode= event.keyCode;

        const thisBox= document.querySelector(`.box_block[data-index= "${attempts}${index}"]`);
        
        if(index === 5 ){
            if (event.key === "Enter") {
                handleEnter();
            } else if(event.key === "Backspace") {
                handleDelete();
            } else return;
        } else if (65<= keyCode && keyCode <= 90){
            thisBox.innerHTML= key;
            index = index +1;
        } 
        else if(event.key === "Backspace") {
            handleDelete();
        }
        

    }
    window.addEventListener("keydown", handleKeyDown);
    };



appStart()