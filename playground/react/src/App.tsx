import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, ConfigProvider } from "antd";
function App() {
  const [count, setCount] = useState(0);

  return (
    <ConfigProvider>
      <Button>123</Button>
    </ConfigProvider>
  );
}

export default App;
