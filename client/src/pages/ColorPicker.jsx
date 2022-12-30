import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";

import { Header } from "../components";
import { NavLink } from "react-router-dom";

const CustomColorPicker = ({ id, mode }) => {
  const { setColor } = useStateContext();
  return (
    <ColorPickerComponent
      id={id}
      mode={mode}
      modeSwitcher={false}
      inline
      showButtons={false}
      change={(args) => {
        document.getElementById("preview").style.backgroundColor =
          args.currentValue.hex;
        setColor(args.currentValue.hex);
      }}
    />
  );
};

const ColorPicker = () => {
  const { currentColor } = useStateContext();
  return (
    <div className="m-2 md:m-10 mb-10 mt-24 mx-2 md:mx-9 p-2 pb-10 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Color Picker" />
      <div className="text-center">
        <div id="preview" />
        <div className="flex justify-center items-center gap-20 flex-wrap">
          <div>
            <p className="text-2xl font-semibold mt-2 mb-4">Inline Pallete</p>
            <CustomColorPicker id="inline-palette" mode="Palette" />
          </div>
          <div>
            <p className="text-2xl font-semibold mt-2 mb-4">Inline Picker</p>
            <CustomColorPicker id="inline-picker" mode="Picker" />
          </div>
        </div>
      </div>
      <div className="text-center mt-10 flex justify-center gap-8">
        <NavLink
          style={{
            backgroundColor: currentColor,
            borderRadius: "10px",
          }}
          to="/portfolio"
          className={`text-xl text-white px-6 py-2 hover:drop-shadow-xl `}
        >
          Portfolio
        </NavLink>
        <NavLink
          style={{
            backgroundColor: currentColor,
            borderRadius: "10px",
          }}
          to="/marketview"
          className={`text-xl text-white px-6 py-2 hover:drop-shadow-xl `}
        >
          Trade
        </NavLink>
      </div>
    </div>
  );
};

export default ColorPicker;
