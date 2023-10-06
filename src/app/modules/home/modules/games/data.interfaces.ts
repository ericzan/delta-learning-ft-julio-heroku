export interface ResponseZan {

  userId: string;
  sentences: sentenceModel[];
  level: string;
}

export interface sentenceModel {
  sentence: string;
  wordstouser: wordstouserModel[];
  eletoshow: string;
  idSCat: string;
  word: string;
  exTarget: string;
  original_sentence: string;
}

export interface wordstouserModel {
  value: string;

}
