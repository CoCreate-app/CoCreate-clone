const CoCreateClone = {
	__cloneBtnClass: 'cloneBtn',
	__deleteBtnClass: 'deleteBtn',
	
	init: function() {
		this.__initButtonEvent();
	},
	
	__initButtonEvent: function() {
		// const self = this;
		// document.addEventListener('click', function(e) {
		// 	for (let i=0; i < e.path.length; i++) {
		// 		let tag = e.path[i];
				
		// 		if (tag.classList && tag.classList.contains(self.__cloneBtnClass)) {
		// 			self.__cloneElement(tag)
		// 		}
				
		// 		if (tag.classList && tag.classList.contains(self.__deleteBtnClass)) {
		// 			self.__deleteElement(tag)
		// 		}
		// 	}
		// }) 
	},
	
	cloneElement: function(cloneBtn) {
		const cloneId = cloneBtn.getAttribute("data-clone_id");
		const clone_name_id = cloneBtn.getAttribute('data-clone_name');
		const clone_position = cloneBtn.getAttribute('data-clone_position') || 'before';
		if (!cloneId) return;
		
		let clone_name;
		
		let input = document.getElementById(clone_name_id);
		
		if (input) {
			clone_name = input.value ? input.value : '';
		}

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
		
		tags.forEach((tag) => {
			tag.removeAttribute('data-pass_value_id');
		})

		let prefix = this.__getNewPrefix(clone_name);
		
		// clonedItem.setAttribute('prefix', prefix);
		this.__createDynamicCloneId(clonedItem, prefix);
		
		//. create data-element_id for dnd
		this.__createDnDElementId(clonedItem);
		
		if (clone_position === "after") {
			if (template.nextSibling) {
				template.parentNode.insertBefore(clonedItem, template.nextSibling);
			} else {
				template.parentNode.appendChild(clonedItem);
			}
		} else {
			template.parentNode.insertBefore(clonedItem, template);
		}
		
		const domEditorEl = CoCreate.htmlTags.findElementByChild(clonedItem);
		if (domEditorEl) {
			this.__sendMessageOfClone(domEditorEl, clonedItem, cloneId, clone_position);
		}
		
		//. cloned event
		document.dispatchEvent(new CustomEvent('change-content', {
			detail: {
				element: clonedItem,
				type: 'clone-create'
			}
		}))
		template.parentNode.dispatchEvent(new CustomEvent('CoCreate-clone', {
			detail: {
				type: 'create'
			}
		}));
		document.dispatchEvent(new CustomEvent('clone-cloned', {
			detail: {element: clonedItem}
		}))
	},
	
	deleteElement: function(deleteBtn) {

		let id = deleteBtn.getAttribute('data-clone_id');
	
		let item = document.getElementById(id);
	
		if (item) {
			const parentNode = item.parentNode;
			item.remove();

			this.__sendMessageOfDelete(id);

			//. cloned event
			if (parentNode) {
				document.dispatchEvent(new CustomEvent('change-content', {
					detail: {
						element: parentNode,
						type: 'clone-delete'
					}
				}))
				parentNode.dispatchEvent(new CustomEvent('CoCreate-clone', {
					detail: {
						type: 'delete'
					}
				}));
			}
			document.dispatchEvent(new CustomEvent('clone-deleted', {
				detail: {}
			}))
		}
	},
	
	__createDynamicCloneId: function(clonedItem, prefix) {
		const self = this;
		let tags = clonedItem.querySelectorAll("*");
		let cloneBtns = clonedItem.querySelectorAll('.' + this.__cloneBtnClass);
		let deleteBtns = clonedItem.querySelectorAll('.' + this.__deleteBtnClass);
		
		tags = Array.from(tags);
		tags.push(clonedItem);
		// tags.forEach((tag) => {
		// 	let name = tag.getAttribute('name');
		// 	if (name) self.__setAttribute(tag, 'name', name, prefix);
		// })
		
		// self.__setAttribute(clonedItem, 'id', clonedItem.id, prefix)
		clonedItem.setAttribute('id', prefix);

		/** set data-xxxx="[prefix][any]" **/
		tags.forEach((el) => {
			let tag = el.tagName.toLowerCase();
			for (var i = 0; i < el.attributes.length; i++) {
				const {name, value} = el.attributes[i];
				// const changedValue = value.replace(/\[prefix\]/g, prefix);
				const changedValue = value.replace(/{{\s*clone-name\s*}}/g, prefix);
				if (/{{\s*clone-name\s*}}/g.test(value) && name == "value") {
					switch(tag) {
						case 'input':
							el.setAttribute("value", changedValue);
						break;
						case 'textarea':
							el.setAttribute("value", changedValue);
							el.textContent = changedValue;
						break;
						default:
							el.innerHTML =  changedValue;
					}
				}
				el.setAttribute(name, changedValue)
			}
		})
		
		cloneBtns.forEach((btn) => {
			let clone_id = btn.getAttribute('data-clone_id');
			let clone_name_id = btn.getAttribute('data-clone_name');

			if (clone_id) {
				let clonableItem = clonedItem.querySelector(`#${clone_id}`);
				let newId = self.__setAttribute(btn, 'data-clone_id', clone_id, prefix)
				if (clonableItem) clonableItem.id = newId;
			}
			
			if (clone_name_id) {
				let clone_name_input = clonedItem.querySelector(`#${clone_name_id}`)
				let newName = self.__setAttribute(btn, 'data-clone_name', clone_name_id, prefix)
				if (clone_name_input) clone_name_input.id = newName;
			}
		})
		
		deleteBtns.forEach((btn) => {
			let clone_id = btn.getAttribute('data-clone_id');
			if (clone_id) btn.setAttribute('data-clone_id', prefix)
		})
	},
	
	__getOriginal: function(str) {
		let original = str;
		let index = str.indexOf('_');
		if (index > -1) original = str.substring(index + 1);
		return original;
	},
	
	__setAttribute: function(element, attrName, value, prefix) {
		let orgValue = this.__getOriginal(value)
		let newValue = prefix == '' ? orgValue : `${prefix}_${orgValue}`;
		element.setAttribute(attrName, newValue)
		return newValue;
	},
	
	__createDnDElementId: function(clonedItem) {
		let dnd_elements = document.querySelectorAll('[data-draggable="true"], [data-droppable="true"]')
			
		dnd_elements.forEach((el) => {
			el.setAttribute('data-element_id', CoCreate.utils.generateUUID());
		})
		
		if (clonedItem.getAttribute('data-draggable') == "true" || clonedItem.getAttribute('data-droppable') == "true") {
			clonedItem.setAttribute('data-element_id', CoCreate.utils.generateUUID());
		}
	},
	
	__getNewPrefix: function(clone_name) {
		let clonedItems = document.querySelectorAll('.clonedItem');
		let exist = false;
		
		clonedItems.forEach((el) => {
			let prefix = el.getAttribute('prefix');
			if (clone_name == prefix) {
				exist = true; 
				return;  
			}
		})
		
		if (exist || !clone_name) {
			return CoCreate.utils.generateUUID(12);
		} else {
			return clone_name;  
		}
	},
	
	__sendMessageOfClone: function(parent, item, id, position) {
		const document_id = parent.getAttribute('data-document_id') || "";
		const name = parent.getAttribute('name') || "";
		
		let addtionSelector = ""
		if (document_id) {
			addtionSelector = `[data-document_id='${document_id}']`;
		} else {
			return ;
		}
		
		if (name) {
			addtionSelector += `[name='${name}']`;
		}
		
		let value = {}
		if (position == 'after') {
			value = {'afterend': item.outerHTML}
		} else {
			value = { 'beforebegin': item.outerHTML}
		}
		
		const message = {
			selector_type: 'querySelector',
			selector: `div.domEditor${addtionSelector} #${id}.template`,
			method: 'insertAdjacentHTML',
			value: value
		}
		
		CoCreate.message.send({
			rooms: [],
			emit: {
				message: 'domEditor',
				data: message
			},
		})
	},
	
	__sendMessageOfDelete: function(element_id) {
		const message = {
			selector_type: 'getElementById',
			selector: element_id,
			method: 'remove',
		}
		
		CoCreate.message.send({
			rooms: [],
			emit: {
				message: 'domEditor',
				data: message
			}
		})
	}
}

CoCreateClone.init();
CoCreate.actions.add({
	action: "cloneAction",
	endEvent: "clone-cloned",
	callback: (btn, data) => {
		CoCreateClone.cloneElement(btn)
	},
})
CoCreate.actions.add({
	action: "createClone",
	endEvent: "clone-cloned",
	callback: (btn, data) => {
		CoCreateClone.cloneElement(btn)
	},
})
CoCreate.actions.add({
	action: "deleteClone",
	endEvent: "clone-deleted",
	callback: (btn, data) => {
		CoCreateClone.deleteElement(btn)
	},
})

export default CoCreateClone;