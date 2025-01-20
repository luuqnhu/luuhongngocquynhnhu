import { SwapForm } from "./components";
import "./styles.css";

export default function App() {
  return (
    <div className="App space-y-4">
      <h1 className="mt-4 text-3xl font-bold text-teal-600">
        Currency converter
      </h1>
      <SwapForm />
    </div>
  );
}
