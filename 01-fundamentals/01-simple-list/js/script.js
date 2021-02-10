let inputText = null;
let divList = null;

let globalNames = [];

// Main function
window.addEventListener('load', () => {
  try {
    mapElements();
    handleInputText();

    render();
  } catch (error) {
    console.log(error);
  }
});

// Services and handlers

function mapElements() {
  try {
    inputText = document.querySelector('#input-text');
    divList = document.querySelector('#div-list');
  } catch (error) {
    throw error;
  }
}

function handleNameList(operation = '', index = 0, content = '') {
  try {
    const insertName = (content) => {
      globalNames.push(content);
    };

    const deleteName = (index) => {
      globalNames.splice(index, 1);
    };

    const editName = (index, content) => {
      globalNames[index] = content;
    };

    switch (operation) {
      case 'I':
        insertName(content);
        break;

      case 'D':
        deleteName(index);
        break;

      case 'E':
        editName(index, content);
        break;

      default:
        new Error('Invalid operation!');
        break;
    }

    render();
  } catch (error) {
    throw error;
  }
}

function handleInputText() {
  try {
    inputText.addEventListener('keyup', (event) => {
      const { key, target } = event;
      const { value } = target;

      if (key === 'Enter' && value !== '') {
        handleNameList('I', null, value);
      }
    });
  } catch (error) {
    throw error;
  }
}

function initializeInput(input, value) {
  try {
    input.value = value;
    input.focus();
  } catch (error) {
    throw error;
  }
}

// Renders

function render(editedIndex = -1) {
  try {
    const createButtonDelete = (id) => {
      const buttonDelete = document.createElement('button');

      buttonDelete.id = id;
      buttonDelete.classList.add('btn', 'red', 'button-delete');
      buttonDelete.textContent = 'X';

      buttonDelete.addEventListener('click', (event) => {
        const { id } = event.target;

        handleNameList('D', parseInt(id));
      });

      return buttonDelete;
    };

    const createSpanName = (id, name) => {
      const spanName = document.createElement('span');

      spanName.id = id;
      spanName.classList.add('span-name');
      spanName.textContent = name;

      spanName.addEventListener('click', (event) => {
        const { id } = event.target;

        render(parseInt(id));
      });

      return spanName;
    };

    const createInputEdit = (id, initialValue) => {
      const inputEdit = document.createElement('input');

      inputEdit.id = id;
      inputEdit.type = 'text';
      inputEdit.value = initialValue;

      inputEdit.addEventListener('keyup', (event) => {
        const { key, target } = event;
        const { value, id } = target;

        if (key === 'Enter') {
          if (value === '') {
            handleNameList('D', parseInt(id));
          } else {
            handleNameList('E', parseInt(id), value);
          }
        }

        if (key === 'Escape') {
          render(-1);
        }
      });

      return inputEdit;
    };

    const createLi = (name, index, editedIndex) => {
      const li = document.createElement('li');

      li.classList.add('left-align');

      if (index === editedIndex) {
        const inputEdit = createInputEdit(index, name);

        li.appendChild(inputEdit);
        initializeInput(inputEdit, inputEdit.value); // Does not work
      } else {
        const buttonDelete = createButtonDelete(index);
        const spanName = createSpanName(index, name);

        li.appendChild(buttonDelete);
        li.appendChild(spanName);
      }

      return li;
    };

    const createUl = (editedIndex) => {
      const ul = document.createElement('ul');

      globalNames.map((name, index) => {
        const li = createLi(name, index, editedIndex);

        ul.appendChild(li);
      });

      return ul;
    };

    initializeInput(inputText, '');
    divList.textContent = '';

    const ul = createUl(editedIndex);

    divList.appendChild(ul);
  } catch (error) {
    throw error;
  }
}
