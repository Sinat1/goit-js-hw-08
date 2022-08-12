import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));

let formData = storageData ?? {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

refs.form.addEventListener('input', throttle(onFormInput, 500));

function onPageLoad() {
  if (storageData) {
    refs.form.elements.email.value = storageData.email;
    refs.form.elements.message.value = storageData.message;
  }
}

onPageLoad();

function onFormSumbit(e) {
  e.preventDefault();
  const filteredInputs = Array.from(e.target.elements).filter(tag =>
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
