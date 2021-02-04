import { curry } from "ramda";

type GenF<T> = () => Generator<T>

export type Pair<T> = {fst:T,snd:T}
export const fst = <T>(p:Pair<T>)=> p.fst
export const snd = <T>(p:Pair<T>)=> p.snd
export const pairOf = <T>(fst_:T,snd_:T):Pair<T> => ({
    fst : fst_,
    snd : snd_
})

export const take = curry(<T>(n: number,gen: GenF<T>) => {
    const i = gen()
    var result: T[] = []
    var index = 0;
    while (true) {
        const v = i.next()
        if (v.done || index++ >= n) break;
        else result.push(v.value)
    }
    return result;
})

export const filter =  <T>(pred: (v: T) => boolean)=>(gen:GenF<T>) => {
    return (function* () {
        const i = gen()
        while (true) {
            const v = i.next();
            if (v.done) break;
            if (pred(v.value)) yield v.value
        }
    })
}

export const map = <A, B>(f: (a: A) => B)=>(gen: GenF<A>) => {
    return (function* () {
        const i = gen()
        while (true) {
            const v = i.next();
            yield f(v.value)
        }
    })

}
export const convergence = <T>(fixed:(a:T,b:T)=>boolean)=>(g:GenF<T>) :() => T | null => {
    let i = g()
    let [x,y] = [i.next(),i.next()]
    while(true){
        if(x.done || y.done) return ()=>null
        if(fixed(x.value,y.value)) return ()=>y.value;
        else [x,y] = [y,i.next()]
    }
}

export function* forever() {
    var cur = 0;
    while (true) {
        yield cur++
    }
}

export function* pairs(x: [number, number], y: (x: number) => [number, number]) {
    for (let a = x[0]; a <= x[1]; a++) {
        let yrange = y(a)
        for (let b = yrange[0]; b <= yrange[1]; b++)
            yield { x: a, y: b }
    }
}

export const square = (x: number) => x * x
export const sqrt = Math.sqrt

export const add = (x: number, y: number) => x + y
export const product = (x: number, y: number) => x * y
export const double = (x:number) => product(2,x)
export const max = (a: number, b: number) => a > b ? a : b
export const isEven = (a:number)=>(a%2)===0
export const isOdd = (a:number)=>(a%2)===1
export const lt = (a:number) => (v:number) => v > a

export const log = <T>(v: T) => {
    console.log(v)
    return v
}
export type SF<A, B> = (a: A) => B
export const compose = <A, B, C>(g: SF<B, C>, f: SF<A, B>): SF<A, C> =>
    (a: A) => g(f(a))
export const within = (dist:number)=>(v1:number,v2:number) => Math.abs(v1-v2)<dist
export const indentity = <A>(a: A) => a
export const id_show = <T>(v:T) =>{
    console.log(v)
    return v
}

