import {useEffect, useState} from 'react'

export default function Counter(props) {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  }

  const increment2 = () => {
    setCounter2(counter2 + 1);
  }

  // GENERIC FORM: useEffect(callback, dependencyArray?)
  // Please schedule a run of my `callback`
  // AFTER the entire component is painted on the browser

  // 1. I want some logic to be run when the component
  // is first rendered AND never again
  // => []
  useEffect(() => {
    console.log("Render one time only on the initial load");
    document.title = `Counter: ${counter}`;
  }, [])

  // 2. I want some logic to be run every time the
  // component is rendered
  // => no dependency array
  useEffect(() => {
    console.log("Render every time the component is rendered");
    document.title = `Counter: ${counter}`;
    // setCounter(counter + 1)
  })

  // 3. I want some logic to be run when the component is
  // rendered for the first time AND when any state/variable
  // in the dependency array changes
  // => [dependency]
  useEffect(() => {
    console.log("Render on first load, and when counter is changed");
    document.title = `Counter: ${counter}`;
  }, [counter])

  // 4. useEffect returning a clean-up callback
  useEffect(() => {
    console.log('Run every time component is rendered');
    const intervalRef = setInterval(() => console.log("Runs every 2 seconds"), 2000);

    // To clean up
    const cleanup = () => {
      console.log("clearing interval");
      clearInterval(intervalRef);
    }
    return cleanup;
  });

  console.log("Hello")

  return (
    <>
      <div>Counter</div>
      <p>The count is: {counter}</p>
      <button onClick={increment}>Increment</button>
      <p>The count on counter 2 is: {counter2}</p>
      <button onClick={increment2}>Increment</button>
    </>
  );
}