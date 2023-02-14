import PocketBase from 'pocketbase';
import { sixLetterWords } from '../src/assets/words.js';

const pb = new PocketBase('http://127.0.0.1:8090');
pb.autoCancellation(false);

sixLetterWords.forEach(async(word, index) => {
    await pb.collection("words").create(
        {
            "word": word,
            "word_number": index,
        });
});