var cloneBtnClass="cloneBtn";
var deleteBtnClass = "deleteBtn";

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
    let clone_position = btn.getAttribute('data-clone_position') || 'before';


    if (!cloneId) return;
    
    let clone_name;
    
    let input = document.getElementById(clone_name_id);
    
    if (input) {
      clone_name = input.value ? input.value : '';
    }

    // let template = document.querySelector('#' + cloneId + '.template');
    let template = document.getElementById(cloneId);
    
    
    if (!template) return;
  
    let clonedItem = template.cloneNode(true);
    
    if (clonedItem.classList.contains('template')) {
      clonedItem.classList.remove('template');
    }
    
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
    
    if (clone_position === "after") {
      if (template.nextSibling) {
        template.parentNode.insertBefore(clonedItem, template.nextSibling);
      } else {
        template.parentNode.appendChild(clonedItem);
      }
    } else {
      template.parentNode.insertBefore(clonedItem, template);
    }
    
    const domEditorEl = CoCreateHtmlTags.findElementByChild(clonedItem);
    if (domEditorEl) {
      sendMessageOfClone(domEditorEl, clonedItem, cloneId, clone_position);
      CoCreateHtmlTags.saveHtml(domEditorEl);
    }

    // createSortableForSaveFetch(clonedItem);
}

function sendMessageOfClone(parent, item, id, position) {
  const document_id = parent.getAttribute('data-document_id');
  const name = parent.getAttribute('name')
  
  let value = {}
  if (position == 'after') {
    value = {'afterend': item.outerHTML}
  } else {
    value = { 'beforebegin': item.outerHTML}
  }
  
  const message = {
    selector_type: 'querySelector',
    selector: `div.domEditor[data-document_id='${document_id}'][name='${name}'] #${id}.template`,
    method: 'insertAdjacentHTML',
    value: value
  }
  
  CoCreate.sendMessage({
    rooms: [],
    emit: {
      message: 'domEditor',
      data: message
    },
  })
  console.log(message);
}

function sendMessageOfDelete(element_id) {
  const message = {
    selector_type: 'getElementById',
    selector: element_id,
    method: 'remove',
  }
  
  CoCreate.sendMessage({
    rooms: [],
    emit: {
      message: 'domEditor',
      data: message
    }
  })
  console.log(message)
  
}

function clickedDeleteBtn(btn) {

  let id = btn.getAttribute('data-clone_id');

  let item = document.getElementById(id);

  if (item) {
    const domEditorEl = CoCreateHtmlTags.findElementByChild(item);
    item.remove();
    
    sendMessageOfDelete(id);
    if (domEditorEl) {
      CoCreateHtmlTags.saveHtml(domEditorEl);
    }
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
    return CoCreateUtils.generateUUID(12);
  } else {
    if (!clone_name) return CoCreateUtils.generateUUID(12);
    return clone_name;  
  }
}

