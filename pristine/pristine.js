!function(e,r){
  'object' === typeof exports && 'undefined' !== typeof module ? module.exports = r() : 'function' === typeof define && define.amd ? define(r) : (e = 'undefined' !== typeof globalThis ? globalThis : e || self).Pristine = r();
}(this,(() =>{
  const e = {en:{required:'This field is required',email:'This field requires a valid e-mail address',number:'This field requires a number',integer:'This field requires an integer value',url:'This field requires a valid website URL',tel:'This field requires a valid telephone number',maxlength:'This fields length must be < ${1}',minlength:'This fields length must be > ${1}',min:'Minimum value for this field is ${1}',max:'Maximum value for this field is ${1}',pattern:'Please match the requested format',equals:'The two fields do not match'}};function r(e){
    const r = arguments;return this.replace(/\${([^{}]*)}/g,((e,t) =>r[t]));
  }function t(e){
    return e.pristine.self.form.querySelectorAll(`input[name="${e.getAttribute('name')}"]:checked`).length;
  }let n = {classTo:'form-group',errorClass:'has-danger',successClass:'has-success',errorTextParent:'form-group',errorTextTag:'div',errorTextClass:'text-help'},i = ['required','min','max','minlength','maxlength','pattern'],s = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,a = /-message(?:-([a-z]{2}(?:_[A-Z]{2})?))?/,o = 'en',l = {},u = function(e,r){
    r.name = e,void 0 === r.priority && (r.priority = 1),l[e] = r;
  };function f(t,s,u){
    const f = this;function c(e,r,t,n){
      const i = l[t];if(i && (e.push(i),n)){
        const s = 'pattern' === t ? [n] : n.split(',');s.unshift(null),r[t] = s;
      }
    }function p(t){
      for(var n = [],i = !0,s = 0;t.validators[s];s++){
        const a = t.validators[s],l = t.params[a.name] ? t.params[a.name] : [];if(l[0] = t.input.value,!a.fn.apply(t.input,l) && (i = !1,'function' === typeof a.msg ? n.push(a.msg(t.input.value,l)) : 'string' === typeof a.msg ? n.push(r.apply(a.msg,l)) : a.msg === Object(a.msg) && a.msg[o] ? n.push(r.apply(a.msg[o],l)) : t.messages[o] && t.messages[o][a.name] ? n.push(r.apply(t.messages[o][a.name],l)) : e[o] && e[o][a.name] && n.push(r.apply(e[o][a.name],l)),!0 === a.halt)){
          break;
        }
      }return t.errors = n,i;
    }function m(e){
      if(e.errorElements){
        return e.errorElements;
      }let r = function(e,r){
          for(;(e = e.parentElement) && !e.classList.contains(r);){}return e;
        }(e.input,f.config.classTo),t = null,n = null;return(t = f.config.classTo === f.config.errorTextParent ? r : r.querySelector(`.${f.config.errorTextParent}`)) && ((n = t.querySelector('.pristine-error')) || ((n = document.createElement(f.config.errorTextTag)).className = `pristine-error ${ f.config.errorTextClass}`,t.appendChild(n),n.pristineDisplay = n.style.display)),e.errorElements = [r,n];
    }function d(e){
      const r = m(e),t = r[0],n = r[1];t && (t.classList.remove(f.config.successClass),t.classList.add(f.config.errorClass)),n && (n.innerHTML = e.errors.join('<br/>'),n.style.display = n.pristineDisplay || '');
    }function h(e){
      const r = function(e){
        const r = m(e),t = r[0],n = r[1];return t && (t.classList.remove(f.config.errorClass),t.classList.remove(f.config.successClass)),n && (n.innerHTML = '',n.style.display = 'none'),r;
      }(e)[0];r && r.classList.add(f.config.successClass);
    }return function(e,r,t){
      e.setAttribute('novalidate','true'),f.form = e,f.config = function(e,r){
        for(const t in r){
          t in e || (e[t] = r[t]);
        }return e;
      }(r || {},n),f.live = !(!1 === t),f.fields = Array.from(e.querySelectorAll('input:not([type^=hidden]):not([type^=submit]), select, textarea')).map(((e) =>{
        const r = [],t = {},n = {};return[].forEach.call(e.attributes,((e) =>{
          if(/^data-pristine-/.test(e.name)){
            let s = e.name.substr(14),o = s.match(a);if(null !== o){
              const l = void 0 === o[1] ? 'en' : o[1];return n.hasOwnProperty(l) || (n[l] = {}),void(n[l][s.slice(0,s.length - o[0].length)] = e.value);
            }'type' === s && (s = e.value),c(r,t,s,e.value);
          }else{
            ~i.indexOf(e.name) ? c(r,t,e.name,e.value) : 'type' === e.name && c(r,t,e.value);
          }
        })),r.sort(((e,r) =>r.priority - e.priority)),f.live && e.addEventListener(~['radio','checkbox'].indexOf(e.getAttribute('type')) ? 'change' : 'input',((e) =>{
          f.validate(e.target);
        }).bind(f)),e.pristine = {input:e,validators:r,params:t,messages:n,self:f};
      }).bind(f));
    }(t,s,u),f.validate = function(e,r){
      r = e && !0 === r || !0 === e;let t = f.fields;!0 !== e && !1 !== e && (e instanceof HTMLElement ? t = [e.pristine] : (e instanceof NodeList || e instanceof (window.$ || Array) || e instanceof Array) && (t = Array.from(e).map(((e) =>e.pristine))));for(var n = !0,i = 0;t[i];i++){
        const s = t[i];p(s) ? !r && h(s) : (n = !1,!r && d(s));
      }return n;
    },f.getErrors = function(e){
      if(!e){
        for(var r = [],t = 0;t < f.fields.length;t++){
          const n = f.fields[t];n.errors.length && r.push({input:n.input,errors:n.errors});
        }return r;
      }return e.tagName && 'select' === e.tagName.toLowerCase() ? e.pristine.errors : e.length ? e[0].pristine.errors : e.pristine.errors;
    },f.addValidator = function(e,r,t,n,i){
      e instanceof HTMLElement ? (e.pristine.validators.push({fn:r,msg:t,priority:n,halt:i}),e.pristine.validators.sort(((e,r) =>r.priority - e.priority))) : console.warn('The parameter elem must be a dom element');
    },f.addError = function(e,r){
      (e = e.length ? e[0] : e).pristine.errors.push(r),d(e.pristine);
    },f.reset = function(){
      for(let e = 0;f.fields[e];e++){
        f.fields[e].errorElements = null;
      }Array.from(f.form.querySelectorAll('.pristine-error')).map(((e) =>{
        e.parentNode.removeChild(e);
      })),Array.from(f.form.querySelectorAll(`.${f.config.classTo}`)).map(((e) =>{
        e.classList.remove(f.config.successClass),e.classList.remove(f.config.errorClass);
      }));
    },f.destroy = function(){
      f.reset(),f.fields.forEach(((e) =>{
        delete e.input.pristine;
      })),f.fields = [];
    },f.setGlobalConfig = function(e){
      n = e;
    },f;
  }return u('text',{fn:function(e){
    return!0;
  },priority:0}),u('required',{fn:function(e){
    return'radio' === this.type || 'checkbox' === this.type ? t(this) : void 0 !== e && '' !== e;
  },priority:99,halt:!0}),u('email',{fn:function(e){
    return!e || s.test(e);
  }}),u('number',{fn:function(e){
    return!e || !isNaN(parseFloat(e));
  },priority:2}),u('integer',{fn:function(e){
    return!e || /^\d+$/.test(e);
  }}),u('minlength',{fn:function(e,r){
    return!e || e.length >= parseInt(r);
  }}),u('maxlength',{fn:function(e,r){
    return!e || e.length <= parseInt(r);
  }}),u('min',{fn:function(e,r){
    return!e || ('checkbox' === this.type ? t(this) >= parseInt(r) : parseFloat(e) >= parseFloat(r));
  }}),u('max',{fn:function(e,r){
    return!e || ('checkbox' === this.type ? t(this) <= parseInt(r) : parseFloat(e) <= parseFloat(r));
  }}),u('pattern',{fn:function(e,r){
    const t = r.match(new RegExp('^/(.*?)/([gimy]*)$'));return!e || new RegExp(t[1],t[2]).test(e);
  }}),u('equals',{fn:function(e,r){
    const t = document.querySelector(r);return t && (!e && !t.value || t.value === e);
  }}),f.addValidator = function(e,r,t,n,i){
    u(e,{fn:r,msg:t,priority:n,halt:i});
  },f.addMessages = function(r,t){
    const n = e.hasOwnProperty(r) ? e[r] : e[r] = {};Object.keys(t).forEach(((e,r) =>{
      n[e] = t[e];
    }));
  },f.setLocale = function(e){
    o = e;
  },f;
}));
