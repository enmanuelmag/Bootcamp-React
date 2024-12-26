// Event handler in-line
const BtnHandler = () => {
  return <button onClick={() => alert('Hello World!')}>Click me!</button>;
};

// Event handler as a function
const BtnHandlerFunction = () => {
  return <button onClick={handleClick}>Click me!</button>;

  function handleClick() {
    alert('Hello World!');
  }
};

// Event handler usando props
type BtnHandlerProps = {
  onClick: () => void;
};

const BtnHandlerProps = (props: BtnHandlerProps) => {
  const { onClick } = props;
  return <button onClick={onClick}>Click me!</button>;
};

export { BtnHandler, BtnHandlerFunction, BtnHandlerProps };
