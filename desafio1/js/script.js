let inputName = null;
let isEditing = false;
let peopleFiltered = null;

window.addEventListener('load', () => {});
peopleFiltered = cleanPeople();
console.log(peopleFiltered);
inputName = document.querySelector('#inputName');
button = document.querySelector('#button');

var div1Text = document.querySelector('#names');
var div2Text = document.querySelector('#estatisticas');
var estatisticaslabel = document.querySelector('#estatisticaslabel');
let numberResults = document.querySelector('#numberResults');
let dataResults = document.querySelector('#dataResults');
let womanResult = document.querySelector('#resultadoFeminino');
let manResult = document.querySelector('#resultadoMasculino');
let somaIdade = document.querySelector('#somaIdade');
let mediaIdade = document.querySelector('#mediaIdade');

function cleanPeople() {
  /*1. Após executar a requisição à API, obtenha somente os dados necessários ao app.
  Esses são: name (first + last), picture, dob.age e gender.
  */

  const nameEmailArray = people.results.map((person) => {
    return {
      name: person.name.first + ' ' + person.name.last,
      picture: person.picture.thumbnail,
      age: person.dob.age,
      gender: person.gender,
    };
  });
  return nameEmailArray;
}
console.log(inputName.textContent);
button.addEventListener('click', filterPerName(inputName.textContent));
inputName.addEventListener('keyup', handleTyping);
/*2. Monitore o input com o evento "keyup".*/
inputName.focus();

function handleTyping(event) {
  var hasText = !!event.target.value && event.target.value.trim() !== '';

  if (!hasText) {
    clearInput();
    return;
  }

  const resultFromFilter = filterPerName(event.target.value);
  calcularSexF(resultFromFilter);
  calcularSexM(resultFromFilter);
  calcularMediaIdade(resultFromFilter);
  calcularSomaIdade(resultFromFilter);
  renderProfiles(resultFromFilter);
  countPeople(resultFromFilter);
  if (event.key === 'Enter') {
    clearInput();
  }
}

function countPeople(filterOfPeople) {
  numberResults.textContent =
    filterOfPeople.length + ' usuário(s) encontrado(s)';
  estatisticaslabel.textContent = 'Estatísticas';
  return filterOfPeople.length;
}

function filterPerName(searchWord) {
  const resultfiltered = peopleFiltered.filter((person) => {
    return person.name.toLowerCase().indexOf(searchWord.toLowerCase()) > -1;
  });
  return resultfiltered;
}

function calcularSexM(peopleFiltered) {
  let numberSexM = 0;
  for (i = 0; i < peopleFiltered.length; i++) {
    if (peopleFiltered[i].gender === 'male') {
      numberSexM++;
    }
  }
  manResult.textContent = 'Sexo masculino: ' + numberSexM;
  return numberSexM;
}
function calcularSexF(peopleFiltered) {
  let numberSexF = 0;
  for (i = 0; i < peopleFiltered.length; i++) {
    if (peopleFiltered[i].gender === 'female') {
      numberSexF++;
    }
  }
  womanResult.textContent = 'Sexo Feminino: ' + numberSexF;
  return numberSexF;
}
function calcularSomaIdade(peopleFiltered) {
  const totalAges = peopleFiltered.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);
  somaIdade.textContent = 'Soma das idades: ' + totalAges;
  return totalAges;
}
function calcularMediaIdade(peopleFiltered) {
  const mediaAges = peopleFiltered.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);
  if (mediaAges > 0) {
    mediaIdade.textContent =
      'Média das idades: ' + Math.round(mediaAges / peopleFiltered.length);
    return mediaAges / peopleFiltered.length;
  } else {
    mediaIdade.textContent = 'Média das idades: 0';
    return 0;
  }
}

function renderProfiles(resultfiltered) {
  //Atualizar as div que imprime a galera que tá atualizada
  dataResults.innerHTML = '';
  for (i = 0; i < resultfiltered.length; i++) {
    var labelResult = document.createElement('label');
    var imageResult = document.createElement('img');

    imageResult.src = resultfiltered[i].picture;
    labelResult.textContent =
      resultfiltered[i].name + ', ' + resultfiltered[i].age + ' anos.';

    dataResults.appendChild(imageResult);
    dataResults.appendChild(labelResult);
    dataResults.appendChild(document.createElement('br'));
    //console.log(labelResult, resultfiltered[i].name);
  }
}

const clearInput = () => {
  inputName.value = '';
  inputName.focus();
};
