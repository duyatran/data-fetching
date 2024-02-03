# M07W18 - Data Fetching & Other Side Effects

### To Do
- [x] Pure Functions and Side Effects
- [x] `useEffect`

## Pure Functions
A function is said to be **pure** if:

- It always returns the same output given the same input
- It has no side effects

## Side effects
Any operation that modifies the state of the computer or interacts with something outside of your program is said to have a **side effect**

Common side effects:
  - Writing to standard out (eg. `console.log`)
  - Modifying the DOM directly (instead of relying on React)
  - Establishing socket connections (eg. `ws` or `Socket.io`)
  - Retrieving data from an API (eg. `axios`, `jQuery`, or the `fetch` API)
  - Setting timers or intervals

Examples of side-effects

``` js
// push modifies the original array
const addTodo = todo => todos.push(todo);

// Network Request
const getTweets = () => fetch('/tweets/').then(res => res.json())

// Modifying a Dom element directly
const reset = (element) => element.value = '';
```

* Side effects could be undesirable because they may introduce bugs. In React, they could disrupt the normal component rendering.

## The useEffect Hook

- `useEffect` is a hook that "lets you specify side effects that are caused by rendering itself, rather than by a particular event."
- The _effect_ hook fires after the browser has _painted_ the DOM
- Multiple _effect_ hooks can be used inside of a single component to group similar operations together

```jsx
const MyComponent = props => {
	const [user, setUser] = useState({});

	useEffect(() => {
		// retrieve user information from an API and update local state with the response
		axios(`/users/${props.userId}`).then(response => setUser(response.data));
	});

	return (
		<div className='my-component'>
			<p>You are logged in as {user.username}</p>
		</div>
	);
};
```

### `useEffect` Lifecycle
[React Hooks Lifecycle](./hook_lifecycle.png)

1. React turns your JSX into HTML (client-side rendering) and updates the DOM
2. The browser responds to the change by updating the UI
3. Any cleanup for effects from the previous render are performed
4. New effects for the current render are performed


### Recap: Rules of Hooks

1. Don't call Hooks inside loops, conditions, or nested functions.
2. Only call Hooks from the top level of a function component or a custom hook.
3. All hooks start with the prefix `use`.

### Usage

`useEffect` may potentially do three things:

  1. adding a side effect
  2. reinvoking the side effect (or not)
  3. cleaning up the side effect

### Dependency Array

```js
// All of these run on the initial render AND...
useEffect(() => {}); // on EVERY render after that
useEffect(() => {}, [username]); // after that, only if `username` changes
useEffect(() => {}, []); // never again
```

- The second argument to `useEffect` is a dependency array that lets you specify when you want the hook to run
- The hook will run again anytime the value of a dependency changes
- **NOTE:** It is possible to get stuck in an infinite loop if the _effect_ hook updates a value in the dependency array

```jsx
// will run every time the value of user.firstName changes
useEffect(() => {
	document.title = `${user.firstName}'s Home Page`;
}, [user.firstName]);

// infinite loop because it runs every time count gets updated
useEffect(() => {
	setCount(count + 1);
}, [count]);
```


### Cleanup

- Sometimes side effects need to be cleaned up (e.g. websocket connections terminated)
- To perform cleanup, return a function from your `useEffect`

```jsx
const [timer, setTimer] = useState(0);

useEffect(() => {
	// set up an interval to increment a timer
	const myInterval = setInterval(() => {
		setTimer(timer => timer + 1);
	}, 1000);

	// declare a cleanup function
	const cleanup = () => {
		clearInterval(myInterval);
	};

	return cleanup;
}, []);
```

### Useful Links

- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [You might not need an Effect](https://react.dev/learn/you-might-not-need-an-effect)