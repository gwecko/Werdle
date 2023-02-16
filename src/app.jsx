import { useState } from 'preact/hooks';

import { sixLetterWords, wordsArrayLength } from './assets/words';
// import PocketBase from 'pocketbase';
import { render } from 'preact';
const cl = (thing) => { console.log(thing) }


// async function getWord() {
//   const pb = new PocketBase('http://127.0.0.1:8090');
//   const randomIdValue = Math.floor(Math.random() * wordsArrayLength);
//   const res = await pb.collection('words').getFirstListItem(`word_number = ${randomIdValue}`);
//   return res.word;
// }
// const tempWord = await getWord();

const randomIdValue = Math.floor(Math.random() * wordsArrayLength);
const tempWord = sixLetterWords[randomIdValue]
const correctWord = tempWord.split('')
cl(correctWord)

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const NUM_OF_BOXES = 36;
const rowStartIndexes = ['0', '6', '12', '18', '24', '30'];
const rowEndIndexes = ['5', '11', '17', '23', '29', '35'];


function setCursorToStart(boxElements) {
  let startingBox = boxElements[0].props.children;
  startingBox.props.disabled = false;
  startingBox.props.autoFocus = true;
}

function toggleDisable(boxInput) {
  return (boxInput.disabled = !boxInput.disabled);
}


const LetterBoxGrid = () => {
  
  // There are 2 stateful attributes of each box: the letters, and the styling
  const [boxValues, setBoxValues] = useState(Array(NUM_OF_BOXES).fill(""));
  const [boxStyling, setBoxStyling] = useState(Array(NUM_OF_BOXES).fill(""))
  const boxElements = Array.from({ length: NUM_OF_BOXES }, (element, index) => {
    return (
      <div className="box">
        <input
          type="text"
          maxLength={1}
          value={boxValues[index]}
          onKeyDown={(e) => handleBox(e, index)}
          key={index}
          boxIndex={index}
          disabled={true}
          autoFocus={false}
          className={boxStyling[index]}
          style={`--column-delay: ${index % 6}`}
          delay={800}
        />
      </div>
    );
  });
  
  
  // keypress event handler function
  const handleBox = (e, boxIndex) => {
    
    e.preventDefault();
    const { key } = e;
    const tempValues = [...boxValues];
    const currentBox = document.activeElement;
   
    if (alphabet.includes(key)) {
      // if active box has value: put value in next box & shift focus there,
      // else: put value in active box.
      // a check to prevent encroaching on the next row
      if (boxValues[boxIndex]) {
        const nextBox =
          document.activeElement.parentElement.nextSibling?.firstChild;
        if (nextBox) {
          if (!rowStartIndexes.includes(nextBox.getAttribute("boxIndex"))) {
            toggleDisable(currentBox);
            tempValues.splice(boxIndex + 1, 1, key);
            toggleDisable(nextBox);
            nextBox.focus();
          }
        }
      } else {
        tempValues.splice(boxIndex, 1, key);
      }
    } else if (key === "Backspace" || key === "ArrowLeft") {
      // if focused box has value: delete its value,
      // else: delete previous box value & shift focus there;
      if (boxValues[boxIndex]) {
        tempValues.splice(boxIndex, 1, "");
      } else {
        // A check to make sure we aren't going back a row
        const previousBox =
          document.activeElement.parentElement.previousSibling.firstChild;
        if (!rowEndIndexes.includes(previousBox.getAttribute("boxIndex"))) {
          toggleDisable(previousBox);
          previousBox.focus();
          toggleDisable(currentBox);
          tempValues.splice(boxIndex - 1, 1, "");
        }
      }
    // "if enter key is pressed at the end of a row with a letter in it"
    } else if (key === "Enter" && rowEndIndexes.includes(currentBox.getAttribute("boxIndex")) && boxValues[boxIndex]) {
      processEnter(currentBox.getAttribute('boxIndex'))
    }

    setBoxValues(tempValues);
  };

  
  function processEnter(index) {
    
    // get the index values of the boxes in the row
    const startingIndex = (index - 5);
    const rowIndexes = Array.from(Array(6), (x, i) => i + startingIndex);
    
    const remainingLetters = [] 
    const correctIndexes = []
    const partialCorrectIndexes = []
    const incorrectIndexes = []
    
    rowIndexes.forEach((gridIndex, letterIndex) => {
      if (boxValues.at(gridIndex) == correctWord.at(letterIndex)) {
        correctIndexes.push(gridIndex)
      } else {
        remainingLetters.push(correctWord.at(letterIndex))
      }
    })
    
    // setup to check for partial-correct letters
    const remainingRowIndexes = rowIndexes.filter((gridIndex) => {
      return !correctIndexes.includes(gridIndex)
    })
    
    remainingRowIndexes.forEach((gridIndex) => {
      if (remainingLetters.includes(boxValues.at(gridIndex))) {
        partialCorrectIndexes.push(gridIndex)
        remainingLetters.splice(remainingLetters.indexOf(boxValues.at(gridIndex)), 1)
      } else {
        incorrectIndexes.push(gridIndex)
      }
    })
    
    
    correctIndexes.map((i) => {
      return boxStyling[i] = 'correct';
    })  
    partialCorrectIndexes.map((i) => {
      return boxStyling[i] = 'partial-correct';
    })  
    incorrectIndexes.map((i) => {
      return boxStyling[i] = 'incorrect';
    })  
    
    // setBoxStyling(boxStyling)
    
    
    if (correctIndexes.length === 6) {
      const currentBox = document.activeElement;
      toggleDisable(currentBox)
      cl('winner alert')
    } else {
      // move the cursor
      const nextBox =
        document.activeElement.parentElement.nextSibling?.firstChild;
      if (nextBox) {
        toggleDisable(nextBox);
        nextBox.focus();
      }
    }
  }
  

  return (
    <>
      <div className="grid">{boxElements}</div>
      {setCursorToStart(boxElements)}
    </>
  );
}


export function App() {
  return (
    <>
      <h1>Werdle!</h1>
      <LetterBoxGrid />
    </>
  );
}