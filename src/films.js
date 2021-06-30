// Exercise 1: Get the array of all directors.
function getAllDirectors(array) {
  const result = array.map((movie)=>movie.director);
  console.log("EXERCICE 1 ->", result);
  return result;
}


// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(array, director) {
  const result = array.filter((movie)=> movie.director === director);
  console.log("EXERCICE 2 ->", result);
  return result;
}

// Exercise 3: Calculate the average of the films of a given director.
function calcAverageScore(array){
  let result;
  // calculate sum of the scores
  const scoreSum = array.reduce((previousScores, score)=> previousScores + score);
  if (!array.length){
    // avoid zero division error
    result = 0;
  } else {
    // calculate the average score
    result = parseFloat((scoreSum/array.length).toFixed(2));
  }
  return result;
}

function moviesAverageOfDirector(array, director) {
  const moviesSelected = getMoviesFromDirector(array, director);
  const scores = moviesSelected.map((movie)=>movie.score);
  const result = calcAverageScore(scores);
  console.log("EXERCICE 3 ->", result);
  return result
}


// Exercise 4:  Alphabetic order by title 
function orderAscendingFunc(item1, item2){
  if (item1 < item2) {
    return -1
  } else if (item1 > item2) {
    return 1
  }
  return 0
}

function orderAlphabetically(array) {
  sortedArray= [...array].sort((movie1, movie2)=>{
    let movieTitle1;
    let movieTitle2;
    if (typeof(array[0])==="object"){
      movieTitle1 = movie1.title.toLowerCase();
      movieTitle2 = movie2.title.toLowerCase();
    } else if (typeof(array[0])==="string"){
      movieTitle1 = movie1.toLowerCase();
      movieTitle2 = movie2.toLowerCase();
    }
    return orderAscendingFunc(movieTitle1, movieTitle2);
  });
  // show only top 20 if there're more than 20
  const result = sortedArray.map((movie)=>movie.title).slice(0,20);
  console.log("EXERCICE 4 ->", result);
  return result;
}

// Exercise 5: Order by year, ascending
function orderByYear(array) {
  const result = [...array].sort((movie1, movie2)=>{
    if (movie1.year < movie2.year) {
      return -1
    } else if (movie1.year > movie2.year) {
      return 1
    }
    return orderAscendingFunc(movie1.title, movie2.title);
    })
  console.log("EXERCICE 5 ->", result);
  return result;
}

// // Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(array, category="") {
  let scores;
  let newArray = [...array];
  if(category){
    newArray = newArray.filter((movie)=> movie.genre.includes(category));
  } 
  scores = newArray.map((movie)=>movie.score);
  // exclude what do not have scores
  scores = scores.filter((score)=>score);
  // calculate the average score
  const result = calcAverageScore(scores);
  console.log("EXERCICE 6 ->", result);
  return result;
}

// Exercise 7: Modify the duration of movies to minutes

function calculateToMinutes(timeHours){
  let timeArray=[];
  const isHours = timeHours.indexOf("h");
  const isMins = timeHours.indexOf("m");
  // Convert the string to time array e.g. '2h 20min' to ['2', '20'] 
  if(isHours!==-1 && isMins!==-1){
    timeHours = timeHours.slice(0, isMins);
    timeArray = timeHours.split('h ');
  } else if (isHours!==-1){
    // In case of no having minutes. e.g. '2h' to ["2", "0"] 
    timeArray = [timeHours.slice(0, isHours)];
    timeArray.push('0');
  } else {
    // In case of no having hours. e.g. '45min' to ["0", "45"]
    timeArray = ["0"];
    timeArray.push(timeHours.slice(0, isMins)); 
  }
  // calculate minutes
  let totalMinutes = parseInt(timeArray[0])*60 + parseInt(timeArray[1]);
  return totalMinutes;
}

function hoursToMinutes(array) {
  const newArray = array.map((movie)=>Object.assign({}, movie));
  const result = newArray.map((movie)=>{
    if(movie.duration){
    // execute the convertToMinutes func, and assign to the movie duration
    let timeHours = movie.duration;
    movie.duration = calculateToMinutes(timeHours);
  }
    // returning the object
    return movie;
  })
  console.log("EXERCICE 7 ->", result);
  return result;
}

// // Exercise 8: Get the best film of a year
function getMoviesFromYear(array, year) {
  const result = array.filter((movie)=> movie.year === year);
  return result;
}

function bestFilmOfYear(array, year) {
  // extract the movies only the indicated year
  const arrayYear = getMoviesFromYear(array, year);
  // sort the array according to scores (low to high)
  const sortedArray = arrayYear.sort((movie1, movie2)=>{
    return orderAscendingFunc(movie1.score, movie2.score);
    })
  // the best movie is the last movie of the array sorted
  const result = sortedArray.slice(-1);
  console.log("EXERCICE 8 ->", result);
  return result
}


// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear,
  };
}
