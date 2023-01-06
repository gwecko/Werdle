import { useEffect, useState } from 'preact/hooks';
import { wordsArrayLength } from '../populateDatabase/words';
import PocketBase from 'pocketbase';
import { render } from 'preact';
import { watchOptions } from 'nodemon/lib/config/defaults';
const cl = (thing) => {console.log(thing)}

// async function getWord() {
//   const pb = new PocketBase('http://127.0.0.1:8090');
//   const randomIdValue = Math.floor(Math.random() * wordsArrayLength);
//   const res = await pb.collection('words').getFirstListItem(`word_number = ${randomIdValue}`);
//   return res.word;
// }
// const word = await getWord();

const word = 'clever'
cl(word)

// const word = 'winner';
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const rowEndIndexes = ['5', '11', '17', '23', '29'];

function toggleDisable(boxInput) {
  return (boxInput.disabled = !boxInput.disabled);
}

function toggleAutoFocus(boxInput) {
  return (boxInput.autoFocus = !boxInput.autoFocus);
}


const LetterBoxGrid = () => {
  const [boxValues, setBoxValues] = useState(Array(30).fill(''));

  // Event handler function
  const handleBox = (e, boxIndex) => {
    e.preventDefault();
    const { key } = e;
    const temp = [...boxValues];
    const currentBox = document.activeElement;

    if (key === 'Enter' && rowEndIndexes.includes(currentBox.getAttribute('boxIndex')) && boxValues[boxIndex]) {
      switch (currentBox.getAttribute('boxIndex')){
        case '5':
          processRowCheck(1);
          break;
        case '11':
          processRowCheck(2);
          break;
        case '17':
          processRowCheck(3);
          break;
        case '23':
          processRowCheck(4);
          break;
        case '29':
          processRowCheck(5);
          break;
      }
    }
    
    else if (key === "Backspace" || key === "ArrowLeft") {
      const previousBox = document.activeElement.parentElement.previousSibling.firstChild;
      // if focused box has value: delete its value,
      // else: delete previous box value and shift focus to previous box;
      if (boxValues[boxIndex]) {
        currentBox.focus();
        temp.splice(boxIndex, 1, '');
      } else {
        toggleDisable(previousBox);
        previousBox.focus();
        toggleDisable(currentBox);
        temp.splice(boxIndex - 1, 1, '');
      }
    }
      
    else if (alphabet.includes(key)) {
      const nextBox = document.activeElement.parentElement.nextSibling.firstChild;
      // if focused box has value: put value in next box and shift focus there,
      // else: put value in focused box;
      if (boxValues[boxIndex]) {
        toggleDisable(currentBox);
        temp.splice(boxIndex + 1, 1, key);
        toggleDisable(nextBox);
        nextBox.focus();
      } else {
        currentBox.focus();
        temp.splice(boxIndex, 1, key);
      }
    }
    
    setBoxValues(temp);
  };

  // create elements
  function createBoxes() {
    const boxes = Array.from({ length: 30 }, (element, index) => {
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
          />
        </div>
      );
    });
    
    let startingBox = boxes[0].props.children;
    startingBox.props.disabled = false;
    startingBox.props.autoFocus = true;
    
    return boxes;
  }
  
  function processRowCheck(row) {
    // set the range of letter boxes
    let startingIndex = (row - 1) * 6;
    let endingIndex = (6 * row) - 1;

    // get the values in the range
    let rowWord = boxValues.slice(startingIndex, endingIndex + 1).join('');
    if (rowWord === word) {
      alert('winner');
    }
    
    // 1. scratch the above
    // 2. map over each row letter, changing color (by adding class) as necessary
    // 3. set focus to next row
    // ** will need to revisit handleBox() and update keyboard conditions
    
  }
  

  return (
    <>
      <div className="grid">{createBoxes()}</div>
    </>
  );
}


export function App() {
  const wordArray = word.split("");
  return (
    <>
      <h1>Werdle!</h1>
      <LetterBoxGrid />
    </>
  );
}