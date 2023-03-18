import React from "react";
import { Fragment } from "react";
import math, { evaluate } from "mathjs";

import "./Calculator.css";

const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];
const operators = ["+", "-", "x", "/"];
const scientificOperators = ["sqrt", "log", "!", "^"];
const others = ["(", ")",".","<-"]

const equal = "=";
const clear = "C";

const lastChar = (s) => (s.length ? s[s.length - 1] : "");
const isNum = (s) => !isNaN(Number(s));

export const calculateExpression = (expression) => {
  if (!expression || expression.length === 0) return;

  if(expression.startsWith('sqrt')){
    const res = evaluate(expression);
    return res;
  }

  if(expression.startsWith('log')){
    // const lnregex = /ln/;
    // expression.replace("ln","log")
    // console.log(expression)
    const res = evaluate(expression);
    return res;
  }
  if(lastChar(expression) === "!"){
    expression = expression.slice(0,-1);
    const res = evaluate(`factorial(${expression})`)
    return res;
  }

  const multiplyregex = /x/g;
  const divByZero = /\/0/g;

  let evaluateExp = expression.replace(multiplyregex, "*");

  try {
    if (divByZero.test(evaluateExp)) {
      throw new Error("Division by zero not possible");
    }
    const lastCharNum = isNum(lastChar(evaluateExp));

    if (!lastCharNum) evaluateExp = evaluateExp.slice(0, -1);

    const res = evaluate(evaluateExp);
    return res;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
const Calculator = () => {
  const [value, setvalue] = React.useState("");

  const calculate = () => {
    const res = calculateExpression(value);
    setvalue(res);
  };

  const clearVal = () => setvalue("");
  const trimVal = () => setvalue(value.slice(0,-1));

  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <input
        type="text"
        defaultValue={value}
        placeholder="calculate"
        disabled
      />

      <div className="calculator-buttons-container">
        <div role="grid">
          {rows.map((r, i) => {
            return (
              <Fragment key={String(r)}>
                <div role="row">
                  {i === 3 && <button onClick={clearVal}>{clear}</button>}
                  {r.map((n) => (
                    <button
                      onClick={() => setvalue(value.concat(String(n)))}
                      key={n}
                    >
                      {String(n)}
                    </button>
                  ))}
                  {i === 3 && <button onClick={calculate}>{equal}</button>}
                </div>
              </Fragment>
            );
          })}
        </div>
        
        <div className="scientific-operators">
          {scientificOperators.map((so) => {
            return (
              <button onClick={() => setvalue(value.concat(so))} key={so}>
                {String(so)}
              </button>
            );
          })}
        </div>
        <div className="calculator-operators">
          {operators.map((o) => (
            <button onClick={() => setvalue(value.concat(o))} key={o}>
              {String(o)}
            </button>
          ))}
        </div>
        <div className="other-operators">
          {others.map((so, i) => {
            
            return (
              <Fragment key={String(so)}>
              
              {i===0 && <button onClick={() => setvalue(value.concat(so))} key={so}>
                {String(so)}
              </button>}
              {i===1 && <button onClick={() => setvalue(value.concat(so))} key={so}>
                {String(so)}
              </button>}
              {i===2 && <button onClick={() => setvalue(value.concat(so))} key={so}>
                {String(so)}
              </button>}
              {i===3 &&  <button onClick={trimVal}>{String(so)}</button>}
              </Fragment>
            );
            
          })}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
