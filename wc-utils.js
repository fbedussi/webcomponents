export function wireUpWc(clazz, tagName, attributes) {

    Object.defineProperty(clazz, 'observedAttributes', { get: function() { return attributes; } });
    attributes.forEach((attribute) => {
        Object.defineProperty(clazz.prototype, attribute, { get: function() { return this.getAttribute(attribute)}, set: function(newValue) { return this.setAttribute(attribute, newValue); } });
        
    });
        
    window.customElements.define(tagName, clazz);
}