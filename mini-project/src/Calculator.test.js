import { fireEvent, render, screen} from "@testing-library/react";
import React from "react";

import Calculator, { calculateExpression } from "./Calculator";

describe('<Calculator/>', () => { 
    it('displays Number from 0 to 9', () => {
        render(<Calculator/>);

        const digits = [0,1,2,3,4,5,6,7,8,9];
        digits.forEach((n) => {
            expect(screen.getByText(String(n))).toBeInTheDocument();
        });
    });
    it('shows 4 rows of digits', () => {
        render(<Calculator/>);

        const rows = screen.getAllByRole("row");

        expect(rows.length).toEqual(4);
    });

    it('shows operators', () => {
        render(<Calculator/>);

        const operators = ["+", "-", "x", "/"];

        operators.forEach((operator) => {
            expect(screen.getByText(String(operator))).toBeInTheDocument();
        });
    });

    it('displays equal', () => {
        render(<Calculator/>)

        const eq = "=";
        expect(screen.getByText(eq)).toBeInTheDocument();
    })

    it('displays clear', () => {
        render(<Calculator/>)

        const clr = "C";
        expect(screen.getByText(clr)).toBeInTheDocument();
    })

    it('has display for input', () => {
        render(<Calculator/>);
        expect(screen.getByPlaceholderText("calculate")).toBeInTheDocument();
    })

    it('input disabled', () => {
        render(<Calculator/>);
        expect(screen.getByPlaceholderText("calculate")).toBeDisabled();
    })

    it('displays imputs', async () => {
        render(<Calculator/>)

        const one = screen.getByText("1")
        const eight = screen.getByText("8")
        const plus = screen.getByText("+")

        fireEvent.click(one);
        fireEvent.click(plus);
        fireEvent.click(eight);

        const res = await screen.findByPlaceholderText("calculate");

        expect(res.value).toBe("1+8");
    })

    it('displays multiple inputs corresponding to an expression', async () => {
        render(<Calculator/>)

        const one = screen.getByText("1")
        const eight = screen.getByText("8")
        const plus = screen.getByText("+")
        const two = screen.getByText("2")
        const three = screen.getByText("3")
        const mul = screen.getByText("x")
        const seven = screen.getByText("7")
        const nine = screen.getByText("9")
        const minus = screen.getByText("-")

        fireEvent.click(one);
        fireEvent.click(plus);
        fireEvent.click(eight);
        fireEvent.click(plus);
        fireEvent.click(two);
        fireEvent.click(mul);
        fireEvent.click(three);
        fireEvent.click(plus);
        fireEvent.click(nine);
        fireEvent.click(minus);
        fireEvent.click(seven);

        const res = await screen.findByPlaceholderText("calculate");

        expect(res.value).toBe("1+8+2x3+9-7");

    })

    it('calculates an expression', async () => {
        render(<Calculator/>)

        const one = screen.getByText("1")
        const eight = screen.getByText("8")
        const plus = screen.getByText("+")
        const eq = screen.getByText("=")

        fireEvent.click(one);
        fireEvent.click(plus);
        fireEvent.click(eight);
        fireEvent.click(eq);

        const res = await screen.findByPlaceholderText("calculate");

        expect(res.value).toBe("9");
    })

    it('calculates an expression with multiple inputs', async () => {
        render(<Calculator/>)

        const one = screen.getByText("1")
        const zero = screen.getByText("0")
        const two = screen.getByText("2")
        const plus = screen.getByText("+")
        const divide = screen.getByText("/")
        const eq = screen.getByText("=")

        fireEvent.click(one);
        fireEvent.click(zero);
        fireEvent.click(divide);
        fireEvent.click(two);
        fireEvent.click(plus);
        fireEvent.click(two);
        fireEvent.click(eq);

        const res = await screen.findByPlaceholderText("calculate");

        expect(res.value).toBe("7");
    })

    it('clear button', async () => {
        render(<Calculator/>)

        const one = screen.getByText("1")
        const eight = screen.getByText("8")
        const plus = screen.getByText("+")
        const clr = screen.getByText("C")

        fireEvent.click(one);
        fireEvent.click(plus);
        fireEvent.click(eight);
        fireEvent.click(clr);

        const res = await screen.findByPlaceholderText("calculate");

        expect(res.value).toBe("");
    })

});

describe('Calculate Expression', () => {

    it('divides two numbers', ()=>{
        expect(calculateExpression("4/4")).toBe(1)
        expect(calculateExpression("32/8")).toBe(4)
        expect(calculateExpression("110/-11")).toBe(-10)
        expect(calculateExpression("10/20")).toBe(0.5)
    })

    it('division by zero should return 0 and log exception', ()=>{
        const errStub = jest.spyOn(console, "error")
        
        expect(calculateExpression("10/0")).toBe(undefined);
        expect(errStub).toHaveBeenCalledTimes(1)
    })
    it('computation for multiplication', () => {
        expect(calculateExpression("2x4")).toBe(8)
        expect(calculateExpression("32x0")).toBe(0)
        expect(calculateExpression("10x-11")).toBe(-110)
        expect(calculateExpression("-10x-11")).toBe(110)
    })

    it('computation for addition of 2 numbers', ()=>{
        expect(calculateExpression("2+4")).toBe(6)
        expect(calculateExpression("32+49")).toBe(81)
        expect(calculateExpression("27+114")).toBe(141)
        
    })

    it('computation of subtraction', ()=>{
        expect(calculateExpression("4-4")).toBe(0)
        expect(calculateExpression("49-39")).toBe(10)
        expect(calculateExpression("27-114")).toBe(-87)
    })

    it('complex expression', ()=> {
        expect(calculateExpression("1/1x2x2+3x22")).toBe(70)
    })
    it('complex expression with trailing operator', ()=> {
        expect(calculateExpression("1/1x2x2+3x22+")).toBe(70)
    })
    it('empty expression', ()=> {
        expect(calculateExpression("")).toBe(undefined)
    })
});
