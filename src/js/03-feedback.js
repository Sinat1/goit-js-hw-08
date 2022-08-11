import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('[name="email"]'),
  textarea: document.querySelector('[name="message"]'),
};

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

refs.form.addEventListener('input', throttle(onFormInput, 500));

const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));

function onPageLoad() {
  if (storageData) {
    formData = storageData ?? {};
  }
}

onPageLoad();

function onFormSumbit(e) {
  e.preventDefault();
  const filteredInputs = Array.from(refs.form.elements).filter(tag =>
    ['textarea', 'input'].includes(tag.tagName.toLowerCase())
  );

  if (filteredInputs.some(i => !i.value)) {
    alert('Fill in all the fields');
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  console.log(formData);
  formData = {};
}

refs.form.addEventListener('submit', onFormSumbit);
