import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { changeOperation, selectOperation } from "./redux/userSlice";
import anaImage from './assets/ana.png';


function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [result, setResult] = useState("");
  const [conta, setConta] = useState("");
  const [ana, setAna] = useState(false);

  const dispatch = useDispatch();
  const { operation } = useSelector(selectOperation);

  useEffect(() => {
    changeResult();
    // Outras ações não dependentes do valor atualizado de 'result'
  }, [firstNumber, secondNumber, operation]);

  useEffect(() => {

    console.log("firstNumber: "+ firstNumber);
    console.log("secondNumber: "+ secondNumber);
    console.log("operation: "+ operation);
    console.log("result: "+ result);
    const signal = signalCount(operation);
    if (firstNumber === "" || secondNumber === "" || result === "") {
      setConta("");
    } else {
      setConta(
        firstNumber + " " + signal + " " + secondNumber + " = " + result
      );
    }
  }, [result]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const signalCount = (operation) => {
    switch (operation) {
      case "Somar":
        return "+";
      case "Subtrair":
        return "-";
      case "Multiplicar":
        return "*";
      case "Dividir":
        return "/";
      default:
        return " ";
    }
  };

  const changeResult = () => {
    switch (operation) {
      case "Somar":
        setResult(firstNumber + secondNumber);
        break;
      case "Subtrair":
        setResult(firstNumber - secondNumber);
        break;
      case "Multiplicar":
        setResult(firstNumber * secondNumber);
        break;
      case "Dividir":
        setResult(firstNumber / secondNumber);
        break;
      default:
        setResult("");
    }
  };

  const changeFirstNumber = (number) => {
    setFirstNumber(parseFloat(number));
    console.log("operation: " + operation);
    changeResult();
  };
  const changeSecondNumber = (number) => {
    setSecondNumber(parseFloat(number));
    console.log("operation: " + operation);
    changeResult();
  };
  const buttonClicked = (newOperation) => {
    dispatch(changeOperation(newOperation));
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <label>Primeiro número</label>
        <input
          type="number"
          value={firstNumber}
          onChange={(e) => setFirstNumber(parseFloat(e.target.value))}
        />
        <label>Segundo número</label>
        <input
          type="number"
          value={secondNumber}
          onChange={(e) => changeSecondNumber(parseFloat(e.target.value))}
        />
        <label>Escolha a operação</label>
        <button onClick={(e) => buttonClicked(e.target.innerHTML)}>
          Somar
        </button>
        <button onClick={(e) => buttonClicked(e.target.innerHTML)}>
          Subtrair
        </button>
        <button onClick={(e) => buttonClicked(e.target.innerHTML)}>
          Multiplicar
        </button>
        <button onClick={(e) => buttonClicked(e.target.innerHTML)}>
          Dividir
        </button>
      </form>
      <h1>Conta: {conta}</h1>
      <label>Você é a Ana?</label>
      <button onClick={() => setAna(true)}>Sim</button>
      <button onClick={() => setAna(false)}>Não</button>
      { ana ? <img src={anaImage} alt="ana"></img> :
      <div></div>
      }
    </div>
  );
}

export default App;
