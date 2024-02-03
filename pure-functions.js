const occupation = 'Developer';

const sayHello = name => {
  occupation = 'Back-end developer'
  return `Hello ${name}, and I am a ${occupation}`;
}

console.log(occupation);

sayHello("Desiree") // => Hello Desiree

// Pure
const add = (num1, num2) => {
  return num1 + num2;
}

add(3, 4) // => 7

const add2 = (num1, num2) => {
  console.log("inside add2");
  return num1 + num2;
}

add2(3, 4) // => 7



// Pure functional components
const UserCard = props => {
  const fullName = props.firstName + props.lastName;

  return(
    <div>
      <img src={props.avatar} />
      <h1>{fullName}</h1>
      <p>{props.bio}</p>
    </div>
  )
}

const defaultAvatar = '/public/default.png';
// Impure
const UserCardWithDefault = props => {
  const fullName = props.firstName + props.lastName;

  return(
    <div>
      <img src={props.avatar || defaultAvatar} />
      <h1>{fullName}</h1>
      <p>{props.bio}</p>
    </div>
  )
}


