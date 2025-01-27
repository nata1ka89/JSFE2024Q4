export default function createElement(options) {
  const {
    tag = '', text = '', parent, classes = [], id = '', value = '',
  } = options;

  const element = document.createElement(tag);
  element.textContent = text;

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  if (id !== '') {
    element.id = id;
  }
  if (value !== '') {
    element.value = value;
  }

  if (parent != null) {
    parent.appendChild(element);
  }

  return element;
}
