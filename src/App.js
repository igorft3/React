import React from "react";
import { Block } from "./Block";
import "./style.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("USD");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((res) => res.json())
      .then((json) => {
        const currencyValute = Object.keys(json.Valute).reduce((acc, key) => {
          acc[key] = json.Valute[key].Value;
          return acc;
        }, {});
        currencyValute["RUB"] = 1;
        ratesRef.current = currencyValute;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value * ratesRef.current[fromCurrency];
    const result = price / ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const price = value * ratesRef.current[toCurrency];
    const result = price / ratesRef.current[fromCurrency];
    setToPrice(value);
    setFromPrice(result.toFixed(3));
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
