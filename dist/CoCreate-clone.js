(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CoCreateClone"] = factory();
	else
		root["CoCreateClone"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./CoCreate-components/CoCreate-clone/src/CoCreate-clone.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./CoCreate-components/CoCreate-clone/src/CoCreate-clone.js":
/*!******************************************************************!*\
  !*** ./CoCreate-components/CoCreate-clone/src/CoCreate-clone.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar CoCreateClone = {\n  __cloneBtnClass: 'cloneBtn',\n  __deleteBtnClass: 'deleteBtn',\n  init: function init() {\n    this.__initButtonEvent();\n  },\n  __initButtonEvent: function __initButtonEvent() {// const self = this;\n    // document.addEventListener('click', function(e) {\n    // \tfor (let i=0; i < e.path.length; i++) {\n    // \t\tlet tag = e.path[i];\n    // \t\tif (tag.classList && tag.classList.contains(self.__cloneBtnClass)) {\n    // \t\t\tself.__cloneElement(tag)\n    // \t\t}\n    // \t\tif (tag.classList && tag.classList.contains(self.__deleteBtnClass)) {\n    // \t\t\tself.__deleteElement(tag)\n    // \t\t}\n    // \t}\n    // }) \n  },\n  cloneElement: function cloneElement(cloneBtn) {\n    var cloneId = cloneBtn.getAttribute(\"data-clone_id\");\n    var clone_name_id = cloneBtn.getAttribute('data-clone_name');\n    var clone_position = cloneBtn.getAttribute('data-clone_position') || 'before';\n    if (!cloneId) return;\n    var clone_name;\n    var input = document.getElementById(clone_name_id);\n\n    if (input) {\n      clone_name = input.value ? input.value : '';\n    }\n\n    var template = document.getElementById(cloneId);\n    if (!template) return;\n    var clonedItem = template.cloneNode(true);\n\n    if (clonedItem.classList.contains('template')) {\n      clonedItem.classList.remove('template');\n    }\n\n    clonedItem.classList.add('clonedItem'); //// remove data-pass_value_id from clonedItem\n\n    clonedItem.removeAttribute('data-pass_value_id');\n    var tags = clonedItem.querySelectorAll(\"*\");\n    tags.forEach(function (tag) {\n      tag.removeAttribute('data-pass_value_id');\n    });\n\n    var prefix = this.__getNewPrefix(clone_name); // clonedItem.setAttribute('prefix', prefix);\n\n\n    this.__createDynamicCloneId(clonedItem, prefix); //. create data-element_id for dnd\n\n\n    this.__createDnDElementId(clonedItem);\n\n    if (clone_position === \"after\") {\n      if (template.nextSibling) {\n        template.parentNode.insertBefore(clonedItem, template.nextSibling);\n      } else {\n        template.parentNode.appendChild(clonedItem);\n      }\n    } else {\n      template.parentNode.insertBefore(clonedItem, template);\n    }\n\n    var domEditorEl = CoCreateHtmlTags.findElementByChild(clonedItem);\n\n    if (domEditorEl) {\n      this.__sendMessageOfClone(domEditorEl, clonedItem, cloneId, clone_position);\n    } //. cloned event\n\n\n    document.dispatchEvent(new CustomEvent('change-content', {\n      detail: {\n        element: clonedItem,\n        type: 'clone-create'\n      }\n    }));\n    template.parentNode.dispatchEvent(new CustomEvent('CoCreate-clone', {\n      detail: {\n        type: 'create'\n      }\n    }));\n    document.dispatchEvent(new CustomEvent('clone-cloned', {\n      detail: {\n        element: clonedItem\n      }\n    }));\n  },\n  deleteElement: function deleteElement(deleteBtn) {\n    var id = deleteBtn.getAttribute('data-clone_id');\n    var item = document.getElementById(id);\n\n    if (item) {\n      var parentNode = item.parentNode;\n      item.remove();\n\n      this.__sendMessageOfDelete(id); //. cloned event\n\n\n      if (parentNode) {\n        document.dispatchEvent(new CustomEvent('change-content', {\n          detail: {\n            element: parentNode,\n            type: 'clone-delete'\n          }\n        }));\n        parentNode.dispatchEvent(new CustomEvent('CoCreate-clone', {\n          detail: {\n            type: 'delete'\n          }\n        }));\n      }\n\n      document.dispatchEvent(new CustomEvent('clone-deleted', {\n        detail: {}\n      }));\n    }\n  },\n  __createDynamicCloneId: function __createDynamicCloneId(clonedItem, prefix) {\n    var self = this;\n    var tags = clonedItem.querySelectorAll(\"*\");\n    var cloneBtns = clonedItem.querySelectorAll('.' + this.__cloneBtnClass);\n    var deleteBtns = clonedItem.querySelectorAll('.' + this.__deleteBtnClass);\n    tags = Array.from(tags);\n    tags.push(clonedItem); // tags.forEach((tag) => {\n    // \tlet name = tag.getAttribute('name');\n    // \tif (name) self.__setAttribute(tag, 'name', name, prefix);\n    // })\n    // self.__setAttribute(clonedItem, 'id', clonedItem.id, prefix)\n\n    clonedItem.setAttribute('id', prefix);\n    /** set data-xxxx=\"[prefix][any]\" **/\n\n    tags.forEach(function (el) {\n      var tag = el.tagName.toLowerCase();\n\n      for (var i = 0; i < el.attributes.length; i++) {\n        var _el$attributes$i = el.attributes[i],\n            name = _el$attributes$i.name,\n            value = _el$attributes$i.value; // const changedValue = value.replace(/\\[prefix\\]/g, prefix);\n\n        var changedValue = value.replace(/{{\\s*clone-name\\s*}}/g, prefix);\n\n        if (/{{\\s*clone-name\\s*}}/g.test(value) && name == \"value\") {\n          switch (tag) {\n            case 'input':\n              el.setAttribute(\"value\", changedValue);\n              break;\n\n            case 'textarea':\n              el.setAttribute(\"value\", changedValue);\n              el.textContent = changedValue;\n              break;\n\n            default:\n              el.innerHTML = changedValue;\n          }\n        }\n\n        el.setAttribute(name, changedValue);\n      }\n    });\n    cloneBtns.forEach(function (btn) {\n      var clone_id = btn.getAttribute('data-clone_id');\n      var clone_name_id = btn.getAttribute('data-clone_name');\n\n      if (clone_id) {\n        var clonableItem = clonedItem.querySelector(\"#\".concat(clone_id));\n\n        var newId = self.__setAttribute(btn, 'data-clone_id', clone_id, prefix);\n\n        if (clonableItem) clonableItem.id = newId;\n      }\n\n      if (clone_name_id) {\n        var clone_name_input = clonedItem.querySelector(\"#\".concat(clone_name_id));\n\n        var newName = self.__setAttribute(btn, 'data-clone_name', clone_name_id, prefix);\n\n        if (clone_name_input) clone_name_input.id = newName;\n      }\n    });\n    deleteBtns.forEach(function (btn) {\n      var clone_id = btn.getAttribute('data-clone_id');\n      if (clone_id) btn.setAttribute('data-clone_id', prefix);\n    });\n  },\n  __getOriginal: function __getOriginal(str) {\n    var original = str;\n    var index = str.indexOf('_');\n    if (index > -1) original = str.substring(index + 1);\n    return original;\n  },\n  __setAttribute: function __setAttribute(element, attrName, value, prefix) {\n    var orgValue = this.__getOriginal(value);\n\n    var newValue = prefix == '' ? orgValue : \"\".concat(prefix, \"_\").concat(orgValue);\n    element.setAttribute(attrName, newValue);\n    return newValue;\n  },\n  __createDnDElementId: function __createDnDElementId(clonedItem) {\n    var dnd_elements = document.querySelectorAll('[data-draggable=\"true\"], [data-droppable=\"true\"]');\n    dnd_elements.forEach(function (el) {\n      el.setAttribute('data-element_id', CoCreateUtils.generateUUID());\n    });\n\n    if (clonedItem.getAttribute('data-draggable') == \"true\" || clonedItem.getAttribute('data-droppable') == \"true\") {\n      clonedItem.setAttribute('data-element_id', CoCreateUtils.generateUUID());\n    }\n  },\n  __getNewPrefix: function __getNewPrefix(clone_name) {\n    var clonedItems = document.querySelectorAll('.clonedItem');\n    var exist = false;\n    clonedItems.forEach(function (el) {\n      var prefix = el.getAttribute('prefix');\n\n      if (clone_name == prefix) {\n        exist = true;\n        return;\n      }\n    });\n\n    if (exist || !clone_name) {\n      return CoCreateUtils.generateUUID(12);\n    } else {\n      return clone_name;\n    }\n  },\n  __sendMessageOfClone: function __sendMessageOfClone(parent, item, id, position) {\n    var document_id = parent.getAttribute('data-document_id') || \"\";\n    var name = parent.getAttribute('name') || \"\";\n    var addtionSelector = \"\";\n\n    if (document_id) {\n      addtionSelector = \"[data-document_id='\".concat(document_id, \"']\");\n    } else {\n      return;\n    }\n\n    if (name) {\n      addtionSelector += \"[name='\".concat(name, \"']\");\n    }\n\n    var value = {};\n\n    if (position == 'after') {\n      value = {\n        'afterend': item.outerHTML\n      };\n    } else {\n      value = {\n        'beforebegin': item.outerHTML\n      };\n    }\n\n    var message = {\n      selector_type: 'querySelector',\n      selector: \"div.domEditor\".concat(addtionSelector, \" #\").concat(id, \".template\"),\n      method: 'insertAdjacentHTML',\n      value: value\n    };\n    CoCreate.sendMessage({\n      rooms: [],\n      emit: {\n        message: 'domEditor',\n        data: message\n      }\n    });\n  },\n  __sendMessageOfDelete: function __sendMessageOfDelete(element_id) {\n    var message = {\n      selector_type: 'getElementById',\n      selector: element_id,\n      method: 'remove'\n    };\n    CoCreate.sendMessage({\n      rooms: [],\n      emit: {\n        message: 'domEditor',\n        data: message\n      }\n    });\n  }\n};\nCoCreateClone.init();\nCoCreateAction.registerEvent(\"cloneAction\", CoCreateClone.cloneElement, CoCreateClone, \"clone-cloned\");\nCoCreateAction.registerEvent(\"createClone\", CoCreateClone.cloneElement, CoCreateClone, \"clone-cloned\");\nCoCreateAction.registerEvent(\"deleteClone\", CoCreateClone.deleteElement, CoCreateClone, \"clone-deleted\");\n/* harmony default export */ __webpack_exports__[\"default\"] = (CoCreateClone);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db0NyZWF0ZUNsb25lLy4vQ29DcmVhdGUtY29tcG9uZW50cy9Db0NyZWF0ZS1jbG9uZS9zcmMvQ29DcmVhdGUtY2xvbmUuanM/NDhjNiJdLCJuYW1lcyI6WyJDb0NyZWF0ZUNsb25lIiwiX19jbG9uZUJ0bkNsYXNzIiwiX19kZWxldGVCdG5DbGFzcyIsImluaXQiLCJfX2luaXRCdXR0b25FdmVudCIsImNsb25lRWxlbWVudCIsImNsb25lQnRuIiwiY2xvbmVJZCIsImdldEF0dHJpYnV0ZSIsImNsb25lX25hbWVfaWQiLCJjbG9uZV9wb3NpdGlvbiIsImNsb25lX25hbWUiLCJpbnB1dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsInRlbXBsYXRlIiwiY2xvbmVkSXRlbSIsImNsb25lTm9kZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicmVtb3ZlIiwiYWRkIiwicmVtb3ZlQXR0cmlidXRlIiwidGFncyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwidGFnIiwicHJlZml4IiwiX19nZXROZXdQcmVmaXgiLCJfX2NyZWF0ZUR5bmFtaWNDbG9uZUlkIiwiX19jcmVhdGVEbkRFbGVtZW50SWQiLCJuZXh0U2libGluZyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJhcHBlbmRDaGlsZCIsImRvbUVkaXRvckVsIiwiQ29DcmVhdGVIdG1sVGFncyIsImZpbmRFbGVtZW50QnlDaGlsZCIsIl9fc2VuZE1lc3NhZ2VPZkNsb25lIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiZWxlbWVudCIsInR5cGUiLCJkZWxldGVFbGVtZW50IiwiZGVsZXRlQnRuIiwiaWQiLCJpdGVtIiwiX19zZW5kTWVzc2FnZU9mRGVsZXRlIiwic2VsZiIsImNsb25lQnRucyIsImRlbGV0ZUJ0bnMiLCJBcnJheSIsImZyb20iLCJwdXNoIiwic2V0QXR0cmlidXRlIiwiZWwiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJpIiwiYXR0cmlidXRlcyIsImxlbmd0aCIsIm5hbWUiLCJjaGFuZ2VkVmFsdWUiLCJyZXBsYWNlIiwidGVzdCIsInRleHRDb250ZW50IiwiaW5uZXJIVE1MIiwiYnRuIiwiY2xvbmVfaWQiLCJjbG9uYWJsZUl0ZW0iLCJxdWVyeVNlbGVjdG9yIiwibmV3SWQiLCJfX3NldEF0dHJpYnV0ZSIsImNsb25lX25hbWVfaW5wdXQiLCJuZXdOYW1lIiwiX19nZXRPcmlnaW5hbCIsInN0ciIsIm9yaWdpbmFsIiwiaW5kZXgiLCJpbmRleE9mIiwic3Vic3RyaW5nIiwiYXR0ck5hbWUiLCJvcmdWYWx1ZSIsIm5ld1ZhbHVlIiwiZG5kX2VsZW1lbnRzIiwiQ29DcmVhdGVVdGlscyIsImdlbmVyYXRlVVVJRCIsImNsb25lZEl0ZW1zIiwiZXhpc3QiLCJwYXJlbnQiLCJwb3NpdGlvbiIsImRvY3VtZW50X2lkIiwiYWRkdGlvblNlbGVjdG9yIiwib3V0ZXJIVE1MIiwibWVzc2FnZSIsInNlbGVjdG9yX3R5cGUiLCJzZWxlY3RvciIsIm1ldGhvZCIsIkNvQ3JlYXRlIiwic2VuZE1lc3NhZ2UiLCJyb29tcyIsImVtaXQiLCJkYXRhIiwiZWxlbWVudF9pZCIsIkNvQ3JlYXRlQWN0aW9uIiwicmVnaXN0ZXJFdmVudCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxJQUFNQSxhQUFhLEdBQUc7QUFDckJDLGlCQUFlLEVBQUUsVUFESTtBQUVyQkMsa0JBQWdCLEVBQUUsV0FGRztBQUlyQkMsTUFBSSxFQUFFLGdCQUFXO0FBQ2hCLFNBQUtDLGlCQUFMO0FBQ0EsR0FOb0I7QUFRckJBLG1CQUFpQixFQUFFLDZCQUFXLENBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBdkJvQjtBQXlCckJDLGNBQVksRUFBRSxzQkFBU0MsUUFBVCxFQUFtQjtBQUNoQyxRQUFNQyxPQUFPLEdBQUdELFFBQVEsQ0FBQ0UsWUFBVCxDQUFzQixlQUF0QixDQUFoQjtBQUNBLFFB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SyxZQUExRCxFQUF3RUwsYUFBeEUsRUFBdUYsY0FBdkY7QUFDQTBHLGNBQWMsQ0FBQ0MsYUFBZixDQUE2QixhQUE3QixFQUE0QzNHLGFBQWEsQ0FBQ0ssWUFBMUQsRUFBd0VMLGFBQXhFLEVBQXVGLGNBQXZGO0FBQ0EwRyxjQUFjLENBQUNDLGFBQWYsQ0FBNkIsYUFBN0IsRUFBNEMzRyxhQUFhLENBQUM2QyxhQUExRCxFQUF5RTdDLGFBQXpFLEVBQXdGLGVBQXhGO0FBRWVBLDRFQUFmIiwiZmlsZSI6Ii4vQ29DcmVhdGUtY29tcG9uZW50cy9Db0NyZWF0ZS1jbG9uZS9zcmMvQ29DcmVhdGUtY2xvbmUuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDb0NyZWF0ZUNsb25lID0ge1xuXHRfX2Nsb25lQnRuQ2xhc3M6ICdjbG9uZUJ0bicsXG5cdF9fZGVsZXRlQnRuQ2xhc3M6ICdkZWxldGVCdG4nLFxuXHRcblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5fX2luaXRCdXR0b25FdmVudCgpO1xuXHR9LFxuXHRcblx0X19pbml0QnV0dG9uRXZlbnQ6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIGNvbnN0IHNlbGYgPSB0aGlzO1xuXHRcdC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdC8vIFx0Zm9yIChsZXQgaT0wOyBpIDwgZS5wYXRoLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gXHRcdGxldCB0YWcgPSBlLnBhdGhbaV07XG5cdFx0XHRcdFxuXHRcdC8vIFx0XHRpZiAodGFnLmNsYXNzTGlzdCAmJiB0YWcuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGYuX19jbG9uZUJ0bkNsYXNzKSkge1xuXHRcdC8vIFx0XHRcdHNlbGYuX19jbG9uZUVsZW1lbnQodGFnKVxuXHRcdC8vIFx0XHR9XG5cdFx0XHRcdFxuXHRcdC8vIFx0XHRpZiAodGFnLmNsYXNzTGlzdCAmJiB0YWcuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGYuX19kZWxldGVCdG5DbGFzcykpIHtcblx0XHQvLyBcdFx0XHRzZWxmLl9fZGVsZXRlRWxlbWVudCh0YWcpXG5cdFx0Ly8gXHRcdH1cblx0XHQvLyBcdH1cblx0XHQvLyB9KSBcblx0fSxcblx0XG5cdGNsb25lRWxlbWVudDogZnVuY3Rpb24oY2xvbmVCdG4pIHtcblx0XHRjb25zdCBjbG9uZUlkID0gY2xvbmVCdG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1jbG9uZV9pZFwiKTtcblx0XHRjb25zdCBjbG9uZV9uYW1lX2lkID0gY2xvbmVCdG4uZ2V0QXR0cmlidXRlKCdkYXRhLWNsb25lX25hbWUnKTtcblx0XHRjb25zdCBjbG9uZV9wb3NpdGlvbiA9IGNsb25lQnRuLmdldEF0dHJpYnV0ZSgnZGF0YS1jbG9uZV9wb3NpdGlvbicpIHx8ICdiZWZvcmUnO1xuXHRcdGlmICghY2xvbmVJZCkgcmV0dXJuO1xuXHRcdFxuXHRcdGxldCBjbG9uZV9uYW1lO1xuXHRcdFxuXHRcdGxldCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNsb25lX25hbWVfaWQpO1xuXHRcdFxuXHRcdGlmIChpbnB1dCkge1xuXHRcdFx0Y2xvbmVfbmFtZSA9IGlucHV0LnZhbHVlID8gaW5wdXQudmFsdWUgOiAnJztcblx0XHR9XG5cblx0XHRsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjbG9uZUlkKTtcblx0XHRpZiAoIXRlbXBsYXRlKSByZXR1cm47XG5cdFxuXHRcdGxldCBjbG9uZWRJdGVtID0gdGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xuXHRcdFxuXHRcdGlmIChjbG9uZWRJdGVtLmNsYXNzTGlzdC5jb250YWlucygndGVtcGxhdGUnKSkge1xuXHRcdFx0Y2xvbmVkSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCd0ZW1wbGF0ZScpO1xuXHRcdH1cblx0XHRcblx0XHRjbG9uZWRJdGVtLmNsYXNzTGlzdC5hZGQoJ2Nsb25lZEl0ZW0nKTtcblx0XHRcblx0XHQvLy8vIHJlbW92ZSBkYXRhLXBhc3NfdmFsdWVfaWQgZnJvbSBjbG9uZWRJdGVtXG5cdFx0Y2xvbmVkSXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtcGFzc192YWx1ZV9pZCcpO1xuXHRcdGxldCB0YWdzID0gY2xvbmVkSXRlbS5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKTtcblx0XHRcblx0XHR0YWdzLmZvckVhY2goKHRhZykgPT4ge1xuXHRcdFx0dGFnLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1wYXNzX3ZhbHVlX2lkJyk7XG5cdFx0fSlcblxuXHRcdGxldCBwcmVmaXggPSB0aGlzLl9fZ2V0TmV3UHJlZml4KGNsb25lX25hbWUpO1xuXHRcdFxuXHRcdC8vIGNsb25lZEl0ZW0uc2V0QXR0cmlidXRlKCdwcmVmaXgnLCBwcmVmaXgpO1xuXHRcdHRoaXMuX19jcmVhdGVEeW5hbWljQ2xvbmVJZChjbG9uZWRJdGVtLCBwcmVmaXgpO1xuXHRcdFxuXHRcdC8vLiBjcmVhdGUgZGF0YS1lbGVtZW50X2lkIGZvciBkbmRcblx0XHR0aGlzLl9fY3JlYXRlRG5ERWxlbWVudElkKGNsb25lZEl0ZW0pO1xuXHRcdFxuXHRcdGlmIChjbG9uZV9wb3NpdGlvbiA9PT0gXCJhZnRlclwiKSB7XG5cdFx0XHRpZiAodGVtcGxhdGUubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0dGVtcGxhdGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY2xvbmVkSXRlbSwgdGVtcGxhdGUubmV4dFNpYmxpbmcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGVtcGxhdGUucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjbG9uZWRJdGVtKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGVtcGxhdGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY2xvbmVkSXRlbSwgdGVtcGxhdGUpO1xuXHRcdH1cblx0XHRcblx0XHRjb25zdCBkb21FZGl0b3JFbCA9IENvQ3JlYXRlSHRtbFRhZ3MuZmluZEVsZW1lbnRCeUNoaWxkKGNsb25lZEl0ZW0pO1xuXHRcdGlmIChkb21FZGl0b3JFbCkge1xuXHRcdFx0dGhpcy5fX3NlbmRNZXNzYWdlT2ZDbG9uZShkb21FZGl0b3JFbCwgY2xvbmVkSXRlbSwgY2xvbmVJZCwgY2xvbmVfcG9zaXRpb24pO1xuXHRcdH1cblx0XHRcblx0XHQvLy4gY2xvbmVkIGV2ZW50XG5cdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZS1jb250ZW50Jywge1xuXHRcdFx0ZGV0YWlsOiB7XG5cdFx0XHRcdGVsZW1lbnQ6IGNsb25lZEl0ZW0sXG5cdFx0XHRcdHR5cGU6ICdjbG9uZS1jcmVhdGUnXG5cdFx0XHR9XG5cdFx0fSkpXG5cdFx0dGVtcGxhdGUucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnQ29DcmVhdGUtY2xvbmUnLCB7XG5cdFx0XHRkZXRhaWw6IHtcblx0XHRcdFx0dHlwZTogJ2NyZWF0ZSdcblx0XHRcdH1cblx0XHR9KSk7XG5cdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2Nsb25lLWNsb25lZCcsIHtcblx0XHRcdGRldGFpbDoge2VsZW1lbnQ6IGNsb25lZEl0ZW19XG5cdFx0fSkpXG5cdH0sXG5cdFxuXHRkZWxldGVFbGVtZW50OiBmdW5jdGlvbihkZWxldGVCdG4pIHtcblxuXHRcdGxldCBpZCA9IGRlbGV0ZUJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xvbmVfaWQnKTtcblx0XG5cdFx0bGV0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cdFxuXHRcdGlmIChpdGVtKSB7XG5cdFx0XHRjb25zdCBwYXJlbnROb2RlID0gaXRlbS5wYXJlbnROb2RlO1xuXHRcdFx0aXRlbS5yZW1vdmUoKTtcblxuXHRcdFx0dGhpcy5fX3NlbmRNZXNzYWdlT2ZEZWxldGUoaWQpO1xuXG5cdFx0XHQvLy4gY2xvbmVkIGV2ZW50XG5cdFx0XHRpZiAocGFyZW50Tm9kZSkge1xuXHRcdFx0XHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2hhbmdlLWNvbnRlbnQnLCB7XG5cdFx0XHRcdFx0ZGV0YWlsOiB7XG5cdFx0XHRcdFx0XHRlbGVtZW50OiBwYXJlbnROb2RlLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2Nsb25lLWRlbGV0ZSdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pKVxuXHRcdFx0XHRwYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdDb0NyZWF0ZS1jbG9uZScsIHtcblx0XHRcdFx0XHRkZXRhaWw6IHtcblx0XHRcdFx0XHRcdHR5cGU6ICdkZWxldGUnXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cdFx0XHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnY2xvbmUtZGVsZXRlZCcsIHtcblx0XHRcdFx0ZGV0YWlsOiB7fVxuXHRcdFx0fSkpXG5cdFx0fVxuXHR9LFxuXHRcblx0X19jcmVhdGVEeW5hbWljQ2xvbmVJZDogZnVuY3Rpb24oY2xvbmVkSXRlbSwgcHJlZml4KSB7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0bGV0IHRhZ3MgPSBjbG9uZWRJdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpO1xuXHRcdGxldCBjbG9uZUJ0bnMgPSBjbG9uZWRJdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgdGhpcy5fX2Nsb25lQnRuQ2xhc3MpO1xuXHRcdGxldCBkZWxldGVCdG5zID0gY2xvbmVkSXRlbS5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHRoaXMuX19kZWxldGVCdG5DbGFzcyk7XG5cdFx0XG5cdFx0dGFncyA9IEFycmF5LmZyb20odGFncyk7XG5cdFx0dGFncy5wdXNoKGNsb25lZEl0ZW0pO1xuXHRcdC8vIHRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG5cdFx0Ly8gXHRsZXQgbmFtZSA9IHRhZy5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblx0XHQvLyBcdGlmIChuYW1lKSBzZWxmLl9fc2V0QXR0cmlidXRlKHRhZywgJ25hbWUnLCBuYW1lLCBwcmVmaXgpO1xuXHRcdC8vIH0pXG5cdFx0XG5cdFx0Ly8gc2VsZi5fX3NldEF0dHJpYnV0ZShjbG9uZWRJdGVtLCAnaWQnLCBjbG9uZWRJdGVtLmlkLCBwcmVmaXgpXG5cdFx0Y2xvbmVkSXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgcHJlZml4KTtcblxuXHRcdC8qKiBzZXQgZGF0YS14eHh4PVwiW3ByZWZpeF1bYW55XVwiICoqL1xuXHRcdHRhZ3MuZm9yRWFjaCgoZWwpID0+IHtcblx0XHRcdGxldCB0YWcgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3Qge25hbWUsIHZhbHVlfSA9IGVsLmF0dHJpYnV0ZXNbaV07XG5cdFx0XHRcdC8vIGNvbnN0IGNoYW5nZWRWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcW3ByZWZpeFxcXS9nLCBwcmVmaXgpO1xuXHRcdFx0XHRjb25zdCBjaGFuZ2VkVmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC97e1xccypjbG9uZS1uYW1lXFxzKn19L2csIHByZWZpeCk7XG5cdFx0XHRcdGlmICgve3tcXHMqY2xvbmUtbmFtZVxccyp9fS9nLnRlc3QodmFsdWUpICYmIG5hbWUgPT0gXCJ2YWx1ZVwiKSB7XG5cdFx0XHRcdFx0c3dpdGNoKHRhZykge1xuXHRcdFx0XHRcdFx0Y2FzZSAnaW5wdXQnOlxuXHRcdFx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBjaGFuZ2VkVmFsdWUpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICd0ZXh0YXJlYSc6XG5cdFx0XHRcdFx0XHRcdGVsLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGNoYW5nZWRWYWx1ZSk7XG5cdFx0XHRcdFx0XHRcdGVsLnRleHRDb250ZW50ID0gY2hhbmdlZFZhbHVlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRlbC5pbm5lckhUTUwgPSAgY2hhbmdlZFZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUobmFtZSwgY2hhbmdlZFZhbHVlKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0XG5cdFx0Y2xvbmVCdG5zLmZvckVhY2goKGJ0bikgPT4ge1xuXHRcdFx0bGV0IGNsb25lX2lkID0gYnRuLmdldEF0dHJpYnV0ZSgnZGF0YS1jbG9uZV9pZCcpO1xuXHRcdFx0bGV0IGNsb25lX25hbWVfaWQgPSBidG4uZ2V0QXR0cmlidXRlKCdkYXRhLWNsb25lX25hbWUnKTtcblxuXHRcdFx0aWYgKGNsb25lX2lkKSB7XG5cdFx0XHRcdGxldCBjbG9uYWJsZUl0ZW0gPSBjbG9uZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoYCMke2Nsb25lX2lkfWApO1xuXHRcdFx0XHRsZXQgbmV3SWQgPSBzZWxmLl9fc2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtY2xvbmVfaWQnLCBjbG9uZV9pZCwgcHJlZml4KVxuXHRcdFx0XHRpZiAoY2xvbmFibGVJdGVtKSBjbG9uYWJsZUl0ZW0uaWQgPSBuZXdJZDtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKGNsb25lX25hbWVfaWQpIHtcblx0XHRcdFx0bGV0IGNsb25lX25hbWVfaW5wdXQgPSBjbG9uZWRJdGVtLnF1ZXJ5U2VsZWN0b3IoYCMke2Nsb25lX25hbWVfaWR9YClcblx0XHRcdFx0bGV0IG5ld05hbWUgPSBzZWxmLl9fc2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtY2xvbmVfbmFtZScsIGNsb25lX25hbWVfaWQsIHByZWZpeClcblx0XHRcdFx0aWYgKGNsb25lX25hbWVfaW5wdXQpIGNsb25lX25hbWVfaW5wdXQuaWQgPSBuZXdOYW1lO1xuXHRcdFx0fVxuXHRcdH0pXG5cdFx0XG5cdFx0ZGVsZXRlQnRucy5mb3JFYWNoKChidG4pID0+IHtcblx0XHRcdGxldCBjbG9uZV9pZCA9IGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xvbmVfaWQnKTtcblx0XHRcdGlmIChjbG9uZV9pZCkgYnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1jbG9uZV9pZCcsIHByZWZpeClcblx0XHR9KVxuXHR9LFxuXHRcblx0X19nZXRPcmlnaW5hbDogZnVuY3Rpb24oc3RyKSB7XG5cdFx0bGV0IG9yaWdpbmFsID0gc3RyO1xuXHRcdGxldCBpbmRleCA9IHN0ci5pbmRleE9mKCdfJyk7XG5cdFx0aWYgKGluZGV4ID4gLTEpIG9yaWdpbmFsID0gc3RyLnN1YnN0cmluZyhpbmRleCArIDEpO1xuXHRcdHJldHVybiBvcmlnaW5hbDtcblx0fSxcblx0XG5cdF9fc2V0QXR0cmlidXRlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUsIHByZWZpeCkge1xuXHRcdGxldCBvcmdWYWx1ZSA9IHRoaXMuX19nZXRPcmlnaW5hbCh2YWx1ZSlcblx0XHRsZXQgbmV3VmFsdWUgPSBwcmVmaXggPT0gJycgPyBvcmdWYWx1ZSA6IGAke3ByZWZpeH1fJHtvcmdWYWx1ZX1gO1xuXHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBuZXdWYWx1ZSlcblx0XHRyZXR1cm4gbmV3VmFsdWU7XG5cdH0sXG5cdFxuXHRfX2NyZWF0ZURuREVsZW1lbnRJZDogZnVuY3Rpb24oY2xvbmVkSXRlbSkge1xuXHRcdGxldCBkbmRfZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcmFnZ2FibGU9XCJ0cnVlXCJdLCBbZGF0YS1kcm9wcGFibGU9XCJ0cnVlXCJdJylcblx0XHRcdFxuXHRcdGRuZF9lbGVtZW50cy5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdkYXRhLWVsZW1lbnRfaWQnLCBDb0NyZWF0ZVV0aWxzLmdlbmVyYXRlVVVJRCgpKTtcblx0XHR9KVxuXHRcdFxuXHRcdGlmIChjbG9uZWRJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1kcmFnZ2FibGUnKSA9PSBcInRydWVcIiB8fCBjbG9uZWRJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1kcm9wcGFibGUnKSA9PSBcInRydWVcIikge1xuXHRcdFx0Y2xvbmVkSXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtZWxlbWVudF9pZCcsIENvQ3JlYXRlVXRpbHMuZ2VuZXJhdGVVVUlEKCkpO1xuXHRcdH1cblx0fSxcblx0XG5cdF9fZ2V0TmV3UHJlZml4OiBmdW5jdGlvbihjbG9uZV9uYW1lKSB7XG5cdFx0bGV0IGNsb25lZEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb25lZEl0ZW0nKTtcblx0XHRsZXQgZXhpc3QgPSBmYWxzZTtcblx0XHRcblx0XHRjbG9uZWRJdGVtcy5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdFx0bGV0IHByZWZpeCA9IGVsLmdldEF0dHJpYnV0ZSgncHJlZml4Jyk7XG5cdFx0XHRpZiAoY2xvbmVfbmFtZSA9PSBwcmVmaXgpIHtcblx0XHRcdFx0ZXhpc3QgPSB0cnVlOyBcblx0XHRcdFx0cmV0dXJuOyAgXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRcblx0XHRpZiAoZXhpc3QgfHwgIWNsb25lX25hbWUpIHtcblx0XHRcdHJldHVybiBDb0NyZWF0ZVV0aWxzLmdlbmVyYXRlVVVJRCgxMik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBjbG9uZV9uYW1lOyAgXG5cdFx0fVxuXHR9LFxuXHRcblx0X19zZW5kTWVzc2FnZU9mQ2xvbmU6IGZ1bmN0aW9uKHBhcmVudCwgaXRlbSwgaWQsIHBvc2l0aW9uKSB7XG5cdFx0Y29uc3QgZG9jdW1lbnRfaWQgPSBwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWRvY3VtZW50X2lkJykgfHwgXCJcIjtcblx0XHRjb25zdCBuYW1lID0gcGFyZW50LmdldEF0dHJpYnV0ZSgnbmFtZScpIHx8IFwiXCI7XG5cdFx0XG5cdFx0bGV0IGFkZHRpb25TZWxlY3RvciA9IFwiXCJcblx0XHRpZiAoZG9jdW1lbnRfaWQpIHtcblx0XHRcdGFkZHRpb25TZWxlY3RvciA9IGBbZGF0YS1kb2N1bWVudF9pZD0nJHtkb2N1bWVudF9pZH0nXWA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiA7XG5cdFx0fVxuXHRcdFxuXHRcdGlmIChuYW1lKSB7XG5cdFx0XHRhZGR0aW9uU2VsZWN0b3IgKz0gYFtuYW1lPScke25hbWV9J11gO1xuXHRcdH1cblx0XHRcblx0XHRsZXQgdmFsdWUgPSB7fVxuXHRcdGlmIChwb3NpdGlvbiA9PSAnYWZ0ZXInKSB7XG5cdFx0XHR2YWx1ZSA9IHsnYWZ0ZXJlbmQnOiBpdGVtLm91dGVySFRNTH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsdWUgPSB7ICdiZWZvcmViZWdpbic6IGl0ZW0ub3V0ZXJIVE1MfVxuXHRcdH1cblx0XHRcblx0XHRjb25zdCBtZXNzYWdlID0ge1xuXHRcdFx0c2VsZWN0b3JfdHlwZTogJ3F1ZXJ5U2VsZWN0b3InLFxuXHRcdFx0c2VsZWN0b3I6IGBkaXYuZG9tRWRpdG9yJHthZGR0aW9uU2VsZWN0b3J9ICMke2lkfS50ZW1wbGF0ZWAsXG5cdFx0XHRtZXRob2Q6ICdpbnNlcnRBZGphY2VudEhUTUwnLFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fVxuXHRcdFxuXHRcdENvQ3JlYXRlLnNlbmRNZXNzYWdlKHtcblx0XHRcdHJvb21zOiBbXSxcblx0XHRcdGVtaXQ6IHtcblx0XHRcdFx0bWVzc2FnZTogJ2RvbUVkaXRvcicsXG5cdFx0XHRcdGRhdGE6IG1lc3NhZ2Vcblx0XHRcdH0sXG5cdFx0fSlcblx0fSxcblx0XG5cdF9fc2VuZE1lc3NhZ2VPZkRlbGV0ZTogZnVuY3Rpb24oZWxlbWVudF9pZCkge1xuXHRcdGNvbnN0IG1lc3NhZ2UgPSB7XG5cdFx0XHRzZWxlY3Rvcl90eXBlOiAnZ2V0RWxlbWVudEJ5SWQnLFxuXHRcdFx0c2VsZWN0b3I6IGVsZW1lbnRfaWQsXG5cdFx0XHRtZXRob2Q6ICdyZW1vdmUnLFxuXHRcdH1cblx0XHRcblx0XHRDb0NyZWF0ZS5zZW5kTWVzc2FnZSh7XG5cdFx0XHRyb29tczogW10sXG5cdFx0XHRlbWl0OiB7XG5cdFx0XHRcdG1lc3NhZ2U6ICdkb21FZGl0b3InLFxuXHRcdFx0XHRkYXRhOiBtZXNzYWdlXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxufVxuXG5Db0NyZWF0ZUNsb25lLmluaXQoKTtcbkNvQ3JlYXRlQWN0aW9uLnJlZ2lzdGVyRXZlbnQoXCJjbG9uZUFjdGlvblwiLCBDb0NyZWF0ZUNsb25lLmNsb25lRWxlbWVudCwgQ29DcmVhdGVDbG9uZSwgXCJjbG9uZS1jbG9uZWRcIik7XG5Db0NyZWF0ZUFjdGlvbi5yZWdpc3RlckV2ZW50KFwiY3JlYXRlQ2xvbmVcIiwgQ29DcmVhdGVDbG9uZS5jbG9uZUVsZW1lbnQsIENvQ3JlYXRlQ2xvbmUsIFwiY2xvbmUtY2xvbmVkXCIpO1xuQ29DcmVhdGVBY3Rpb24ucmVnaXN0ZXJFdmVudChcImRlbGV0ZUNsb25lXCIsIENvQ3JlYXRlQ2xvbmUuZGVsZXRlRWxlbWVudCwgQ29DcmVhdGVDbG9uZSwgXCJjbG9uZS1kZWxldGVkXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBDb0NyZWF0ZUNsb25lOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./CoCreate-components/CoCreate-clone/src/CoCreate-clone.js\n");

/***/ })

/******/ })["default"];
});