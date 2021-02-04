import { curry, T } from "ramda";
import {map, compose, convergence, within} from "./utils";

type GenF<T> = () => Generator<T>
const repeat = <T>(f: (x: T) => T, init: T) => {
	return (function* () {
		let cur = init;
		while (true) {
			yield cur;
			//console.log(cur)
			cur = f(cur);
		}
	})
}

test('Numerical Differentiation', () => {
	const easydiff = (f: Function) => (x: number) => (h: number) => (f(x + h) - f(x)) / h;
	const halve = (x: number) => x / 2;
	const differentiate = (h0: number) => (f: Function) => (x: number)  => map(easydiff(f)(x))(repeat(halve, h0));

	const elimerror = (n: number, gen: GenF<number>) => {
		return (function*() {
			const i = gen();
			var a = i.next();
			while (true) {
				const b = i.next();
				// console.log("a = ", a);
				// console.log("b = ", b);
				// if (a.done || b.done) break;
				yield ((b.value * Math.pow(2,n) - a.value)/(Math.pow(2,n) - 1))
				a = b;
			}
		})
	}
	
	const order = (g: GenF<number>) => {
		let i = g();
		const a = i.next();
		const b = i.next();
		const c = i.next();
		//if (a.done || b.done || c.done) return 1;
		if (b.value === c.value) return 1;
		const res = Math.round(Math.log2((a.value - c.value)/(b.value - c.value) - 1));
		if (res === 0) return 1;
		else return res;
	};

	const improve = (s: GenF<number>) => elimerror(order(s), s);
	const second = <T>(g: GenF<T>): T => {
		const i = g();
		const a = i.next();
		const b = i.next();
		return b.value;
	}
	const superF = (s: GenF<number>) => map(second)(repeat(improve, s));
	const derivative = compose(
		convergence(within(0.00001)),
		superF
	);

	// test case
	var func = (x: number) => x;
	expect(derivative(differentiate(1)(func)(2))()).toBe(1);	// f(x) = x, f'(x) = 1
	func = (x: number) => x * x;
	expect(derivative(differentiate(2)(func)(2))()).toBe(4); 	// f(x) = x^2, f'(x) = 2x
	func = (x: number) => Math.pow(x, 4);
	expect(derivative(differentiate(1)(func)(2))()).toBe(32); 	// f(x) = x^4, f'(x) = 4x^3
})