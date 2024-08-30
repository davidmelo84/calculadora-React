import Input from './components/Input';
import Button from './components/Button';
import { Container, Content, Row } from "./styles";
import { useState, useEffect, useCallback } from 'react';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);

  // Função para limpar a calculadora
  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber(null);
    setOperation(null);
  };

  // Função para adicionar números
  const handleAddNumber = (number) => {
    setCurrentNumber(prev => `${prev === '0' ? '' : prev}${number}`);
  };

  // Funções para operações matemáticas
  const handleSumNumbers = () => {
    if (firstNumber === null) {
      setFirstNumber(currentNumber);
      setOperation('+');
      setCurrentNumber(currentNumber + ' + ');
    } else {
      const sum = Number(firstNumber) + Number(currentNumber.split(' ').pop());
      setCurrentNumber(String(sum));
      setFirstNumber(null); // Reset para operações subsequentes
      setOperation(null);
    }
  };

  const handleSubNumbers = () => {
    if (firstNumber === null) {
      setFirstNumber(currentNumber);
      setOperation('-');
      setCurrentNumber(currentNumber + ' - ');
    } else {
      const sub = Number(firstNumber) - Number(currentNumber.split(' ').pop());
      setCurrentNumber(String(sub));
      setFirstNumber(null); // Reset para operações subsequentes
      setOperation(null);
    }
  };

  const handleMultiplication = () => {
    if (firstNumber === null) {
      setFirstNumber(currentNumber);
      setOperation('*');
      setCurrentNumber(currentNumber + ' * ');
    } else {
      const mult = Number(firstNumber) * Number(currentNumber.split(' ').pop());
      setCurrentNumber(String(mult));
      setFirstNumber(null); // Reset para operações subsequentes
      setOperation(null);
    }
  };

  const handleDivision = () => {
    if (firstNumber === null) {
      setFirstNumber(currentNumber);
      setOperation('/');
      setCurrentNumber(currentNumber + ' / ');
    } else {
      const div = Number(firstNumber) / Number(currentNumber.split(' ').pop());
      setCurrentNumber(String(div));
      setFirstNumber(null); // Reset para operações subsequentes
      setOperation(null);
    }
  };

  const handleEquals = () => {
    if (operation && firstNumber !== null) {
      const current = currentNumber.split(' ').pop(); // Pega o último número
      let result;

      switch (operation) {
        case '+':
          result = Number(firstNumber) + Number(current);
          break;
        case '-':
          result = Number(firstNumber) - Number(current);
          break;
        case '*':
          result = Number(firstNumber) * Number(current);
          break;
        case '/':
          result = Number(firstNumber) / Number(current);
          break;
        default:
          return;
      }

      setCurrentNumber(String(result));
      setFirstNumber(null); // Reset para próxima operação
      setOperation(null);
    }
  };

  // Função para capturar eventos de teclado
  const handleKeyPress = useCallback((event) => {
    const key = event.key;

    // Mapeando teclas para números e operações
    const keyMapping = {
      '1': '1', '!': '1',
      '2': '2', '@': '2',
      '3': '3', '#': '3',
      '4': '4', '$': '4',
      '5': '5', '%': '5',
      '6': '6', '^': '6',
      '7': '7', '&': '7',
      '8': '8', '*': '8',
      '9': '9', '(': '9',
      '0': '0', ')': '0',
      '+': '+',
      '-': '-',
      '*': '*', // Remover duplicação
      '/': '/',
      '=': '=',
      'Enter': '=',
      'c': 'C',
      'C': 'C',
      'Backspace': 'Backspace'
    };

    if (keyMapping[key]) {
      const mappedValue = keyMapping[key];
      if (/[0-9]/.test(mappedValue)) {
        handleAddNumber(mappedValue);
      } else if (mappedValue === '+') {
        handleSumNumbers();
      } else if (mappedValue === '-') {
        handleSubNumbers();
      } else if (mappedValue === '*') {
        handleMultiplication();
      } else if (mappedValue === '/') {
        handleDivision();
      } else if (mappedValue === '=' || mappedValue === 'Enter') {
        handleEquals();
      } else if (mappedValue === 'C') {
        handleOnClear();
      } else if (mappedValue === 'Backspace') {
        handleBackspace();
      }
    }
  }, [currentNumber, firstNumber, operation]); // Adicione dependências necessárias

  // Função para lidar com Backspace
  const handleBackspace = () => {
    setCurrentNumber(prev => {
      if (prev.length === 1) return '0';
      return prev.slice(0, -1);
    });
  };

  useEffect(() => {
    // Adiciona o event listener quando o componente monta
    window.addEventListener('keydown', handleKeyPress);

    // Remove o event listener quando o componente desmonta
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]); // Inclua handleKeyPress como dependência

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label="C" onClick={handleOnClear} />
          <Button label="/" onClick={handleDivision} />
          <Button label="*" onClick={handleMultiplication} />
          <Button label="-" onClick={handleSubNumbers} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="+" onClick={handleSumNumbers} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="=" onClick={handleEquals} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="0" onClick={() => handleAddNumber('0')} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;