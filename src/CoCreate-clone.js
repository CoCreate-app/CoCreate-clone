var cloneBtnClass="cloneBtn";
var deleteBtnClass = "deleteBtn";

initSocketsForClone();
initSaveFetchEls();
initBtns();


function initBtns() {
  document.addEventListener('click', function(e) {
    
    for (let i=0; i<e.path.length; i++) {
      let tag = e.path[i];
      
      if (tag.classList && tag.classList.contains(cloneBtnClass)) {
        clickedCloneBtn(tag);
      }
      
      if (tag.classList && tag.classList.contains(deleteBtnClass)) {
        clickedDeleteBtn(tag);
      }
    }
  })
}

function clickedCloneBtn(btn) {

    let cloneId = btn.getAttribute("data-clone_id");
    let clone_name_id = btn.getAttribute('data-clone_name');
    

    if (!cloneId) return;
    
    let clone_name;
    
    let input = document.getElementById(clone_name_id);
    
    if (input) {
      clone_name = input.value ? input.value : '';
    }

    let template = document.querySelector('#' + cloneId + '.template');
    
    
    if (!template) return;
  
    let clonedItem = template.cloneNode(true);
    
    clonedItem.classList.remove('template');
    clonedItem.classList.add('clonedItem');
    
    //// remove data-pass_value_id from clonedItem
    clonedItem.removeAttribute('data-pass_value_id');
    let tags = clonedItem.querySelectorAll("*");
  
    for (let i=0; i < tags.length; i++) {
      let tag = tags[i];
      tag.removeAttribute('data-pass_value_id');
    }
    
    
    let prefix = getNewPrefix(clone_name);
    
    clonedItem.setAttribute('prefix', prefix);
    createDynamicCloneId(clonedItem, prefix);
    
    template.parentNode.insertBefore(clonedItem, template);
    
    // initFloatingLabelForClone(clonedItem);
    
    initCrudForClone(clonedItem);
    
    let saveFetchEl = findSaveFetchElByChild(clonedItem);
    
    if (saveFetchEl) saveHtml(saveFetchEl);
    
    createSortableForSaveFetch(clonedItem);
}

function clickedDeleteBtn(btn) {
  console.log(btn);
  
  let id = btn.getAttribute('data-clone_id');
  console.log(id);
  
  let item = document.getElementById(id);
  
  console.log(item);
  
  if (item) {
    let saveFetchEl = findSaveFetchElByChild(item);  
    item.remove();
    if (saveFetchEl) saveHtml(saveFetchEl);
  }
}

function createDynamicCloneId(clonedItem, prefix) {
  
  //// change names for child tags
  let tags = clonedItem.querySelectorAll("*");
  
  for (let i=0; i < tags.length; i++) {
    let tag = tags[i];
    
    let name = tag.getAttribute('name');
    if (!name) continue;
    
    let originalName = getOriginal(name);
    name = prefix == '' ? originalName : prefix + '_' + originalName;
   
    tag.setAttribute('name', name);
  }
  
  //// change name and id of clonedItem
  let name = clonedItem.getAttribute('name');
  if (name) {
   let originalName = getOriginal(name);
   name = prefix == '' ? originalName : prefix + '_' + originalName;
    
    clonedItem.setAttribute('name', name);
  }
  
  
  let id = clonedItem.id;
  let originalId = getOriginal(id);
  let newId = prefix == '' ? originalId : prefix + '_' + originalId;
  
  clonedItem.setAttribute('id', newId);
  
  //// change ids
  let cloneBtns = clonedItem.querySelectorAll('.' + cloneBtnClass);
  let deleteBtns = clonedItem.querySelectorAll('.' + deleteBtnClass);
  
  //. set data-xxxx="[prefix][any]"
  let children_el = clonedItem.querySelectorAll('*')
  children_el.forEach((el) => {
    for (var attr_key in el.dataset) {
      el.setAttribute('data-' + attr_key, el.dataset[attr_key].replace(/\[prefix\]/g, prefix))
    }
  })
  
  
  for (let i=0; i < cloneBtns.length; i++) {
    let cloneBtn = cloneBtns[i];
    let clonableItem, clone_name_input;
    let clone_id = cloneBtn.getAttribute('data-clone_id');
    let clone_name_id = cloneBtn.getAttribute('data-clone_name');
    
    if (clone_name_id) clone_name_input = clonedItem.querySelector('#' + clone_name_id);
    
    clonableItem = clonedItem.querySelector('#' + clone_id);
    
    let originalId = getOriginal(clone_id);
    let newId = prefix == '' ? originalId : prefix + '_' + originalId;
    
    
    cloneBtn.setAttribute('data-clone_id', newId);
    if (clonableItem) clonableItem.id = newId;
    
    if (clone_name_input) {
      let originalCloneName = getOriginal(clone_name_id);
      let newName = prefix == '' ? originalCloneName : prefix + '_' + originalCloneName;
      
      cloneBtn.setAttribute('data-clone_name', newName);
      clone_name_input.id = newName;
    }
  }
  
  for (let i=0; i < deleteBtns.length; i++) {
    let deleteBtn = deleteBtns[i];
    
    let clone_id = deleteBtn.getAttribute('data-clone_id');
    
    let originalId = getOriginal(clone_id)
    let newId = prefix == '' ? originalId : prefix + '_' + originalId;
    
    deleteBtn.setAttribute('data-clone_id', newId);
  }
}

function getOriginal(string) {
  let original = string;
  let index = string.indexOf('_');
  if (index > -1) original = string.substring(index + 1);
  
  return original;
}

function getNewPrefix(clone_name) {
  
  let clonedItems = document.getElementsByClassName('clonedItem');
  let exist = false;
  
  for (let i=0; i < clonedItems.length; i++) {
    let clonedItem = clonedItems[i];
    let prefix = clonedItem.getAttribute('prefix');
    
    if (clone_name == prefix) {
      exist = true; continue;  
    }
    
  }
  
  if (exist) {
    return getRandomStringForDynamic();
  } else {
    if (clone_name == undefined) return getRandomStringForDynamic();
    return clone_name;  
  }
}

// located in utils. Utilis should have one good random generator that we can use for requesting sting legnth
function getRandomStringForDynamic(length = 8) {
  let result           = '';
  let stringCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  let stringCharactersLength = stringCharacters.length;
  let charactersLength = characters.length;
  
  result += stringCharacters.charAt(Math.floor(Math.random() * stringCharactersLength));
  
  for ( let i = 0; i < length - 1; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}

// data-module_activity_id on line 241?
function createdDocumentForClone(data) {
  console.log(data);
  
  let eId = data['element'];
  if (eId) {
    let saveFetchEl = document.getElementById(eId);
    
    if (saveFetchEl) {
      let collection = data['collection'];
      
      if (collection == 'module_activity') {
        saveFetchEl.setAttribute('data-module_activity_id', data['document_id']);
      }
    }
  }
}

// function initFloatingLabelForClone(clonedItem) {
//   if (clonedItem.classList.contains('floating-label')) {
//     initFloatLabelEle(clonedItem);
//   }
  
//   let nodes = clonedItem.querySelectorAll('.floating-label');
  
//   for (let i=0; i < nodes.length; i++) {
//     initFloatLabelEle(nodes[i]);
//   }
// }

// Can be removed forms are self init now?
function initCrudForClone(clonedItem) {
  
  if (clonedItem.tagName == 'FORM') CoCreateForm.initForm(clonedItem);
  
  let forms = clonedItem.querySelectorAll('form');
  
  for (let i=0; i < forms.length; i++) {
    CoCreateForm.initForm(forms[i]);
  }
}




