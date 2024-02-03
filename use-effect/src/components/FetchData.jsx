import {useEffect, useState} from 'react';
import axios from 'axios';

export default function FetchData(props) {
  // Dog pics
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const getADogPic = () => {
    setCounter(counter + 1);
  }

  // 1. think about the initial render
  // 2. think about what should make the Effect run (counter)
  useEffect(() => {
    axios.get('https://dog.ceo/api/breeds/image/random')
      .then((data) => {
        setIsLoaded(true);
        setData(data.data.message);
      })
  }, [counter])

  return (
    <>
      <div>Get some data!</div>

      <div>
        <p> Number of dog pics: {counter} </p>
        <div>
          <button onClick={getADogPic}>Get a dog</button>
        </div>

        {isLoaded && <img src={data} alt='Dog'/>}
      </div>
    </>
  );
}