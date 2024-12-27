// react
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

// Local types
type BMICalculatorResultDisplayProps = {
  bmi: number;
  bmiLevel: string;
};

type BMICalculatorInputProps = {
  label: string;
  placeholder: string;
  value: number;
  setValueFN: Dispatch<SetStateAction<number>>;
};

type BMICalculatorFormProps = {
  setBMI: Dispatch<SetStateAction<number>>;
  setBMILevel: Dispatch<SetStateAction<string>>;
};

const BMICalculatorResultDisplay = ({
  bmi,
  bmiLevel,
}: BMICalculatorResultDisplayProps) => {
  const formattedBMI = bmi.toFixed(2);

  return (
    <section className="flex h-[6.125rem] flex-col items-center justify-center gap-2 text-4xl">
      {bmi === 0 ? "" : formattedBMI} <hr className="self-stretch border" />{" "}
      {bmiLevel}
    </section>
  );
};

const BMICalculatorInput = ({
  label,
  placeholder,
  value,
  setValueFN,
}: BMICalculatorInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    setValueFN(inputValue);
  };

  return (
    <label className="flex flex-col gap-1 text-xl">
      {label}
      <input
        type="number"
        step="0.01"
        required
        placeholder={placeholder}
        value={value || ""}
        onChange={handleChange}
        className="rounded-lg p-1 text-teal-950 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </label>
  );
};

const BMICalculatorForm = ({ setBMI, setBMILevel }: BMICalculatorFormProps) => {
  const defineBMILevel = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    else if (bmi < 25) return "Normal";
    else if (bmi < 30) return "Overweight";
    else if (bmi < 35) return "Obesity";
    else if (bmi < 40) return "Class 2 obesity";
    else return "Class 3 obesity";
  };

  const [userWeight, setUserWeight] = useState(0);
  const [userHeight, setUserHeight] = useState(0);

  const calculateBMI = () => {
    const bmi = userWeight / (userHeight * userHeight);
    const bmiLevel = defineBMILevel(bmi);
    setBMI(bmi);
    setBMILevel(bmiLevel);
  };

  const cleanupInputs = () => {
    setUserHeight(0);
    setUserWeight(0);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateBMI();
    cleanupInputs();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <BMICalculatorInput
        label="Height:"
        placeholder="Enter your height in m."
        value={userHeight}
        setValueFN={setUserHeight}
      />
      <BMICalculatorInput
        label="Weight:"
        placeholder="Enter your weight in kg."
        value={userWeight}
        setValueFN={setUserWeight}
      />
      <input
        type="submit"
        value="Calculate"
        className="self-center rounded-lg bg-teal-950 p-2 text-lg shadow-sm shadow-black hover:cursor-pointer active:shadow-none"
      />
    </form>
  );
};

const BMICalculator = () => {
  const [bmi, setBMI] = useState(0);
  const [bmiLevel, setBMILevel] = useState("");

  return (
    <article className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-teal-900 p-4 shadow-md shadow-black/20">
      <BMICalculatorResultDisplay bmi={bmi} bmiLevel={bmiLevel} />
      <BMICalculatorForm setBMI={setBMI} setBMILevel={setBMILevel} />
    </article>
  );
};

const App = () => {
  return (
    <>
      <main className="grid min-h-[calc(100vh_-_1.25rem)] min-w-80 place-items-center p-4">
        <BMICalculator />
      </main>
      <footer className="min-w-80 text-center text-sm">
        Made by Miguel Rabatini Dias Santana
      </footer>
    </>
  );
};

export default App;
