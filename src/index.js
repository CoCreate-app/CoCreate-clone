import action from '@cocreate/actions';
import render from '@cocreate/render';
import uuid from '@cocreate/uuid';
import { cssPath, queryElements } from '@cocreate/utils';

const CoCreateClone = {
    init: function () {

        // CoCreate.socket.listen('CoCreateClone-insert', function(data) {
        // 	let {selector, element_str, position} = data;
        // 	if (!selector) return

        // 	let container = document.querySelector(selector)

        // 	if (container) {
        // 		if (position == "after") position = "afterend";
        // 		else position = "beforebegin";

        // 		container.insertAdjacentHTML(position, element_str)
        // 	}
        // })

        // CoCreate.socket.listen('CoCreateClone-remove', function(data) {
        // 	let {clone_id} = data;
        // 	if (!clone_id) return

        // 	let selected_el = document.getElementById(clone_id)
        // 	if (selected_el) {
        // 		selected_el.remove();
        // 	}
        // })
    },

    cloneElement: function (cloneBtn) {
        let template = queryElements({ element: cloneBtn, prefix: 'clone' })

        // TODO: support array?
        template = template[0]
        if (!template)
            return;

        let clonedItem = template.cloneNode(true);
        let templateId = clonedItem.getAttribute('template_id') || clonedItem.getAttribute('template')
        if (templateId)
            clonedItem.setAttribute('templateId', templateId);
        clonedItem.removeAttribute('template');

        let cloneData = cloneBtn.getAttribute('clone-data');
        if (cloneData) {
            cloneData = JSON.parse(cloneData)
            console.log('cloneData', cloneData)
            render.data({
                elements: [clonedItem],
                data: cloneData,
            });
        }
        //// remove pass-value_id from clonedItem
        // clonedItem.removeAttribute('pass-value_id');
        // let tags = clonedItem.querySelectorAll("*");

        // tags.forEach((tag) => {
        // 	tag.removeAttribute('pass-value_id');
        // })
        const clonePosition = cloneBtn.getAttribute('clone-position') || 'before';
        if (clonePosition === "after") {
            if (template.nextSibling) {
                template.parentNode.insertBefore(clonedItem, template.nextSibling);
            } else {
                template.parentNode.appendChild(clonedItem);
            }
        } else {
            template.parentNode.insertBefore(clonedItem, template);
        }

        const domEditorEl = clonedItem.parentElement.closest('.domEditor');
        if (domEditorEl) {
            this.__sendMessageOfClone(domEditorEl, clonedItem, cloneId, clonePosition);
        }

        document.dispatchEvent(new CustomEvent('cloned', {
            detail: { element: clonedItem }
        }))
    },



    __sendMessageOfClone: function (parent, item, id, position) {
        const document_id = parent.getAttribute('document_id') || "";
        const name = parent.getAttribute('name') || "";

        let addtionSelector = ""
        if (document_id) {
            addtionSelector = `[document_id='${document_id}']`;
        } else {
            return;
        }

        if (name) {
            addtionSelector += `[name='${name}']`;
        }

        CoCreate.message.send({
            rooms: [],
            emit: {
                message: 'CoCreateClone-insert',
                data: {
                    selector: `div.domEditor${addtionSelector} #${id}.template`,
                    element_str: item.outerHTML,
                    position: position
                }
            },
        })
    }

}

action.init({
    name: "clone",
    endEvent: "cloned",
    callback: (data) => {
        CoCreateClone.cloneElement(data.element);
    }
});

CoCreateClone.init();

export default CoCreateClone;