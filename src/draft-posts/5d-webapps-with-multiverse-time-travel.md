---
title: 5D Web Apps with Multiverse Time Travel
subtitle: Or, merge is all you need
---

<script>
import Footnote from "$lib/Footnote.svelte"
import Br from '$lib/br.svelte';
import App from '$lib/fdwa/app.svelte';
</script>

<App reset=true, grid=true, toolPicker=true colorPicker=true history=true />

## Act 0: App

You want to draw a flower.

To do this, you'll need a canvas:

<App grid=true gridLocked=true/>
<Br />

And of course, some tools to go use on it:

<App toolPicker=true colorPicker=true/>
<Br />

Go ahead, draw your flower. I'll wait.

Hmm... That didn't work.

I guess well need some way to model the state of the canvas. You just learned about this cool pattern called a [reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer), so I guess we'll use that.

Well, your state is clearly a grid of colors:

```ts
type State = Array<Array<string>>;
```

Since, you have two tools, you'll have two types of updates:

```ts
type TransactionData =
	| {
			type: 'set';
			row: number;
			column: number;
			color: string;
	  }
	| {
			type: 'fill';
			row: number;
			column: number;
			color: string;
	  };
```

Now we just need to write a function that can apply that transaction data to our state:

```ts
function reducer(originalState: State, transaction: TransactionData): State {
	let nextState = structuredClone(originalState);

	if (transaction.type == 'set') {
		nextState[transaction.row][transaction.column] = transaction.color;
		return nextState;
	} else if (transaction.type == 'fill') {
		return floodFillImplementation(
			nextState,
			transaction.row,
			transaction.column,
			transaction.color
		);
	}
}
```

Great! Now we can use this on our canvas:

```ts
const SIZE = 10;
const initialState: State = Array(SIZE)
	.fill().map(() => Array(SIZE).fill('#FFFFFF'));

let toolType: 'set' | 'fill' = $state('set');
let color: string = $state('#000000');

let state = $state(initialState);

function onClick(row: number, column: number) {
	let transaction: TransactionData = {
		type: toolType,
		row,
		column,
		color
	};

	state = reducer(state, transaction);
}

<Canvas {state} {onClick}>
```

Go ahead, draw your flower!

<App grid=true toolPicker=true colorPicker=true />
<Br />

<hr />

## Act 1: Time Travel

You want to draw a flower.

You can draw a flower. Great!

But what if you make a mistake? You'll need some way to _go back in time_. You'll need some way to keep track of the transactions you make.

The obvious choice is to use an array:

```ts
let history: Array<Transaction> = [];
```

and then compute your state from it:

```ts
<Canvas state={history.reduce(reducer, initialState)}>
```

Hey, [that's why](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) it's called a <Footnote word="reducer!"> In functional languages, this is called a fold.</Footnote>

Now if you want to undo, you can pop the last element from the history:

```ts
function undo(history: Array<Transaction>): Array<Transaction> {
	return history.slice(0, history.length - 1);
}
```

Try it!

<App grid=true toolPicker=true colorPicker=true undoButton=true/>
<Br />

You know you can do better. What if you could _see_ the history?

<!-- History -->
<App history=true />
<Br />

TODO something something you can click to go back in time.

<hr />

## Act 2: Multiverse

You want to draw a flower.

You can draw a flower. Great! You can even undo your mistakes. Greater!

<!--

Okay, so this is a neat way to build applications.

Hey, didn't we say _web_ apps?

<Br />
<Br />
...
<Br />
<Br />
<Br />
<Br />
<Br />
<Br />
<Br />
<Br />
<Br />
<Br />
<Br />
<Br />

<hr />

## Act 3: Web

You want to draw a flower.

But so does your friend. How can you draw flowers together? -->
