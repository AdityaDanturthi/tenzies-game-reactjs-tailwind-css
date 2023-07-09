import { useEffect, useState } from "react";
import Confetti from 'react-confetti';

function Dice(props){
    return(
        <div onClick={props.holdDice}>
            <div className={props.isHeld ? 'bg-[#59E391] text-[#0B2434] text-5xl drop-shadow-lg px-4 py-2 rounded-lg font-bold text-center' : 'bg-white text-[#0B2434] text-5xl drop-shadow-lg px-4 py-2 rounded-lg font-bold text-center'} key={props.value}>{props.value}</div>
        </div>
    );
}

export default function NumberBoard(){
    let myRnId = () => parseInt(Date.now() * Math.random());

    function holdDice(id, value, heldValue){
        setNumbers(prevDice => prevDice.map(
            dice => {
                return dice.id === id ?
                {...dice, isHeld : !dice.isHeld} :
                dice
            })
        )
        // console.log(id, value, healdValue);
    }

    function getRandomNumber(){
        let diceData = [];
        let randomNumber;
        let isHeldValue = false;

        for(let i=0; i<10; i++){
            randomNumber = Math.floor(Math.random() * (6 - 1) + 1);
            // if (randomNumber === 2) {
            //     isHeldValue = true;
            // } else {
            //     isHeldValue = false;
            // }

            diceData.push(
                {
                    value: randomNumber, 
                    isHeld: isHeldValue,
                    id: myRnId()
                }
                    );
        }
        return diceData;
    }
    
    let numbersArray = getRandomNumber();
    const[numbers, setNumbers] = useState(numbersArray);
    const [tenzies, setTenzies] = useState(false);

    useEffect(() => {
        const allHeld = numbers.every(dice => dice.isHeld);
        const firstValue = numbers[0].value;
        const sameValue = numbers.every(dice => dice.value === firstValue);

        if (allHeld && sameValue) {
            setTenzies(true);
            console.log("You won!");
        }
        
    }, [numbers])

    function handleClick(){
        if (!tenzies){
            setNumbers(prevNumbersArray => prevNumbersArray.map(
                dice => {
                    return dice.isHeld ?
                    dice : 
                    {...dice, 
                        value: Math.floor(Math.random() * (6 - 1) + 1),
                        id: myRnId()
                    }
                }
            ))
        } else {
            setTenzies(false);
            setNumbers(getRandomNumber())
        }
    }

    return(
        <div className="flex  flex-col gap-4 items-center">
            <div className="py-10 text-white grid grid-rows-2 grid-cols-5 gap-9">
                {numbers.map((number) => <Dice value={number.value} isHeld = {number.isHeld} key={number.id} holdDice={() => holdDice(number.id, number.value, number.isHeld)}/>)}
            </div>
            <button className="bg-[#5035FF] text-4xl rounded-lg px-14 py-3 text-white font-normal drop-shadow-xl" onClick={handleClick}>{tenzies ? "New Game" : "Roll"}</button>
            {tenzies && (
                <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                  numberOfPieces={200}
                  recycle={false}
                  gravity={0.1}
                />
              )}
        </div>
    );
} 