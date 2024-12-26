import React from 'react';

type State = {
  name: string;
  age: number;
};

type Props = {
  mode: 'light' | 'dark';
};

const FuncReact = (props: Props) => {
  const { mode } = props;

  const [state, setState] = React.useState<State>({
    name: 'John Doe',
    age: 25,
  });

  React.useEffect(() => {
    // Cuando la lista de dependencias está vacía
    // El hook se ejecuta SOLO al montar el componente

    return () => {
      // Se ejecuta justo antes de que el componente sea desmontado y destruido
    };
  }, []);

  React.useEffect(() => {
    // Cuando la lista de dependencias no está vacía
    // El hook se ejecuta al montar el componente
    // Y cada vez que alguna de las dependencias cambie
  }, [state.name, state.age]);

  //No hay hook para shouldComponentUpdate ni para componentDidCatch

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-2xl font-bold">Functional Component</h1>

        <input
          type="text"
          value={state.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <input
          type="number"
          value={state.age}
          onChange={(e) => handleChange('age', Number(e.target.value))}
        />

        <span className="text-sm">Mode: {mode}</span>
      </div>
    </div>
  );

  function handleChange(key: keyof State, value: string | number) {
    setState({ ...state, [key]: value });
  }
};

export default FuncReact;
