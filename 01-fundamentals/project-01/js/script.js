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
    inputText = document.getElementById('input-text');
    divList = document.getElementById('div-list');
  } catch (error) {
    throw error;
  }
}

function handleNameList(operation = '', index = 0, content = 0) {
  try {
    const insertName = (content) => {
      if (content !== '') {
        globalNames.push(content);
      }
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

      if (key === 'Enter') {
        handleNameList('I', null, value);
      }
    });
  } catch (error) {
    throw error;
  }
}

function initializeInput(input, value) {
  input.value = value;
  input.focus();
}

// Renders

function render(editedIndex = -1) {
  try {
    const createButtonDelete = (id) => {
      const buttonDelete = document.createElement('button');

      buttonDelete.id = id;
      buttonDelete.className = 'btn red button-delete';
      buttonDelete.innerText = 'X';

      buttonDelete.addEventListener('click', (event) => {
        const { id } = event.target;

        handleNameList('D', parseInt(id));
      });

      return buttonDelete;
    };

    const createSpanName = (id, name) => {
      const spanName = document.createElement('span');

      spanName.id = id;
      spanName.className = 'span-name';
      spanName.innerText = name;

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
          handleNameList('E', parseInt(id), value);
        }
      });

      return inputEdit;
    };

    const createLi = (name, index, editedIndex) => {
      const li = document.createElement('li');

      li.className = 'left-align';

      if (index === editedIndex) {
        const inputEdit = createInputEdit(index, name);

        li.appendChild(inputEdit);
        initializeInput(inputEdit, inputEdit.value);
      } else {
        const buttonDelete = createButtonDelete(index);
        const spanName = createSpanName(index, name);

        li.appendChild(buttonDelete);
        li.appendChild(spanName);
      }

      return li;
    };

    initializeInput(inputText, '');

    const ul = document.createElement('ul');

    globalNames.map((name, index) => {
      const li = createLi(name, index, editedIndex);

      ul.appendChild(li);
    });
    divList.innerHTML = '';
    divList.appendChild(ul);
  } catch (error) {
    throw error;
  }
}
