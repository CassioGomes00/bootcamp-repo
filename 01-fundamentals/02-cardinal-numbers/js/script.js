let inputRange = null;
let inputNumber = null;
let inputFullNumber = null;

window.addEventListener('load', (event) => {
  try {
    mapElements();
    handleInputRange();

    render(inputRange.value);
  } catch (error) {
    console.log(error);
  }
});

function mapElements() {
  try {
    inputRange = document.querySelector('#input-range');
    inputNumber = document.querySelector('#input-number');
    inputFullNumber = document.querySelector('#input-full-number');
  } catch (error) {
    throw error;
  }
}

function handleInputRange() {
  try {
    inputRange.addEventListener('input', (event) => {
      const { value } = event.target;

      render(value);
    });
  } catch (error) {
    throw error;
  }
}

function render(value) {
  try {
    const getFullNumber = (value) => {
      const getUnits = (number) => {
        switch (number) {
          case 0:
            return 'Zero';
          case 1:
            return 'One';
          case 2:
            return 'Two';
          case 3:
            return 'Three';
          case 4:
            return 'Four';
          case 5:
            return 'Five';
          case 6:
            return 'Six';
          case 7:
            return 'Seven';
          case 8:
            return 'Eight';
          case 9:
            return 'Nine';
        }
      };

      const getTens = (number) => {
        switch (number) {
          case 1:
            return 'Ten';
          case 2:
            return 'Twenty';
          case 3:
            return 'Thirty';
          case 4:
            return 'Fourty';
          case 5:
            return 'Fifty';
          case 6:
            return 'Sixty';
          case 7:
            return 'Seventy';
          case 8:
            return 'Eighty';
          case 9:
            return 'Ninety';
          default:
            return '';
        }
      };

      const getHundreds = (number) => {
        switch (number) {
          case 0:
            return '';
          default:
            return `${getUnits(number)} hundred`;
        }
      };

      const handleExcessions = (value) => {
        const number = parseInt(value);

        const valueFinal =
          value.charAt(value.length - 2) + value.charAt(value.length - 1);
        const numberFinal = parseInt(valueFinal);

        if (number % 10 === 0 && 10 <= number) {
          units = '';
        }

        if (10 < numberFinal && numberFinal < 20) {
          units = '';

          switch (numberFinal) {
            case 11:
              tens = 'Eleven ';
              break;
            case 12:
              tens = 'Twelve ';
              break;
            case 13:
              tens = 'Thirteen';
              break;
            case 14:
              tens = 'Fourteen';
              break;
            case 15:
              tens = 'Fifteen';
              break;
            case 16:
              tens = 'Sixteen';
              break;
            case 17:
              tens = 'Seventeen';
              break;
            case 18:
              tens = 'Eighteen';
              break;
            case 19:
              tens = 'Nineteen';
              break;
          }
        }
      };

      const addSpace = (string) => {
        if (string !== '') {
          return `${string} `;
        }

        return string;
      };

      let units = '';
      let tens = '';
      let hundreds = '';

      for (let i = 0; i < value.length; i++) {
        const currentNumber = parseInt(value.charAt(i));

        if (i === value.length - 1) {
          units = getUnits(currentNumber);
        }

        if (i === value.length - 2) {
          tens = getTens(currentNumber);
          tens = addSpace(tens);
        }

        if (i === value.length - 3) {
          hundreds = getHundreds(currentNumber);
          hundreds = addSpace(hundreds);
        }
      }

      handleExcessions(value);

      return `${hundreds}${tens}${units}`;
    };

    inputNumber.value = value;
    inputFullNumber.value = getFullNumber(value);
  } catch (error) {
    throw error;
  }
}
