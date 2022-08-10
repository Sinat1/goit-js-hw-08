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

function onPageLoad() {
  let currentData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (currentData) {
    refs.input.value = currentData.email;
    refs.textarea.value = currentData.message;
    formData = currentData;
  }
}

onPageLoad();

function onFormSumbit(e) {
  e.preventDefault();

  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  console.log(formData);
  formData = {};
}

refs.form.addEventListener('submit', onFormSumbit);
