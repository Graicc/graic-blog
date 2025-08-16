---
title: 5D Web Apps with Multiverse Time Travel
subtitle: Or, merge is all you need
published: false
---

<script>
import Footnote from "$lib/Footnote.svelte"
import Br from '$lib/br.svelte';
import App from '$lib/fdwa/app.svelte';
</script>

<!--
-->
<App reset=true, grid=true, toolPicker=true colorPicker=true history=true network=true />
<!--
-->

This is a post about ideas.
This is a post about how the ideas we use shape how we approach problems.
With the right perspective, hard problems can become easy.

This is also a post about drawing flowers.

## Act 0: App

You want to draw a flower.

To do this, you'll need a canvas:

<App grid=true gridLocked=true/>
<Br />

And of course, some tools to go use on it:

<App toolPicker=true colorPicker=true/>
<Br />

Go ahead, draw your flower.

<Br />
<Br />

Hmm... That didn't work.

I guess you'll need some way to represent the state of the canvas. You just learned about this cool pattern called a [reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer), so we'll use that.

To use the reducer pattern, we need to answer three questions:
1. What does our state look like?
2. What do our updates look like?
3. How do our updates change our state?

Well, our state is a grid of colors:

```typescript
type State = Array<Array<string>>;
```

And since you have two tools, you'll have two types of updates:

```ts
type UpdateData =
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

Now we just need to write a function that can apply an update to our state:

```ts
function reducer(originalState: State, update: UpdateData): State {
	let nextState = structuredClone(originalState);

	if (update.type == 'set') {
		nextState[update.row][update.column] = update.color;
		return nextState;
	} else if (update.type == 'fill') {
		return floodFillImplementation(
			nextState,
			update.row,
			update.column,
			update.color
		);
	}
}
```

Lovely! Now we can use this reducer to process updates to the canvas:

```ts
const SIZE = 10;
const initialState: State = Array(SIZE)
	.fill().map(() => Array(SIZE).fill('#FFFFFF'));

let toolType: 'set' | 'fill' = $state('set');
let color: string = $state('#000000');

let state = $state(initialState);

function onClick(row: number, column: number) {
	let update: UpdateData = {
		type: toolType,
		row,
		column,
		color
	};

	state = reducer(state, update);
}

<Canvas {state} {onClick}>
```

Now that you handle updates, you can draw on the canvas.
Go ahead, draw your flower!

<App grid=true toolPicker=true colorPicker=true />
<Br />

<hr />

## Act 1: Time Travel

You want to draw a flower.

You can draw a flower. Great!

But what if you make a mistake? You'd need some way to _go back in time_. For this, you'll need some way to keep track of the updates you make.

There are many ways you could do this. Maybe we will see some of them later. But, for now, the most straightforward way is to store a list of all the changes:

```ts
let history: Array<Update> = [];
```

Let's explore how this change impacts our application.

First off, you'll need to update your `onClick` function. Instead of updating our state, you can add a change to the history:

```ts
function onClick(row: number, column: number) {
	let update: UpdateData = {
		type: toolType,
		row,
		column,
		color
	};

    history.push(update)
}
```

And if you want to undo, you can pop the last element from the history:

```ts
function undo(history: Array<Update>): Array<Update> {
	return history.slice(0, history.length - 1);
}
```

You should note that we've made a important change here. We aren't keeping track of the current state.
Instead, the current state is implicit in the history of the world.
This means our application is no longer primarily concered about _state_. It is now primarily concerned about _updates_.

This is the perspective you need to build 5D Web Apps.

However, you aren't there yet. You haven't even finished a 4D App. Let's finish that up before we get ahead of ourselves.

Our state is implicit in the history, but the canvas needs explicit state to display. To realize the state, you'll need to compute it from the history. Fortunately, the reducer pattern makes this easy:

```ts
<Canvas state={history.reduce(reducer, initialState)}>
```

Hey, [that's why](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) it's called a <Footnote word="reducer!"> In functional languages, this is called a fold.</Footnote>

With that, you are able to go back in time. Try it out:

<App grid=true toolPicker=true colorPicker=true undoButton=true/>
<Br />
<Br />
<Br />
<Br />
<Br />

<!--
TODO: make sure the history is below the fold.
-->

Now _technically_, this is time travel, but it also kinda sucks.
Time travel is supposed to be magical, but an undo button is straight out of [1968](https://en.wikipedia.org/wiki/Undo#History).

You know you can do better. What if you could _see_ the history?

<!-- History -->
<App history=true />
<Br />

Yeah, like that.

<!--
TODO: Show how you'd build this, maybe mention time complexity
-->
<!--
TODO: Finish section
-->

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
