import TabsManager from './tabs';
import MobileTabsManager from './mobileTabs';

const tabsElem = document.getElementsByClassName('bikes_navigaion')[0];
new TabsManager(tabsElem);
new MobileTabsManager();

const tabItems = document.querySelectorAll('.bikes-menu_item');
const mobileTabItems = document.querySelectorAll('.mobile__bikes-menu_link');

for (let elment of tabItems) {
  elment.addEventListener('click', addNewFeature);
}

for (let elment of mobileTabItems) {
  elment.addEventListener('click', addNewFeature);
}

function addNewFeature() {
  const actualItem = document.querySelector('.bike.active');
  const featuresList = actualItem.querySelector('.features');
  const addFeatures = actualItem.querySelectorAll('.features_input');
  const addFeaturesBtn = actualItem.querySelector('.features_btn');

  addFeaturesBtn.addEventListener('click', fieldValidation);

  function fieldValidation() {
    for (let input of addFeatures) {
      if (input.value) {
        input.classList.remove('red');
        const newFeature = document.createElement('li');
        newFeature.classList.add('features_item');
        newFeature.classList.add('text');
        const firstLetter = input.value.charAt(0).toUpperCase();
        const remainingLetters = input.value.slice(1).toLowerCase();
        newFeature.textContent = firstLetter + remainingLetters;
        featuresList.appendChild(newFeature);
        input.value = '';
      } else {
        input.classList.add('red');
      }
    }
  }
}

addNewFeature();
