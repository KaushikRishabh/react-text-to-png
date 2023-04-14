import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { SketchPicker } from "react-color";

function App() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#000000");
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const previewRef = useRef(null);

  const generateImage = () => {
    html2canvas(previewRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "generated-image.png";
      link.click();
    });
  };

  return (
    <div className="App">
      <div>
        <label>Text:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <label>Font Size:</label>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
      </div>
      <div>
        <label>Font Color:</label>
        <SketchPicker
          color={fontColor}
          onChangeComplete={(color) => setFontColor(color.hex)}
        />
      </div>
      <div>
        <label>Width:</label>
        <input
          type="number"
          value={width}
          onChange={(e) => {
            console.log("new width", e.target.value);
            setWidth(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Height:</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <button onClick={generateImage}>Generate PNG</button>
      <div
        ref={previewRef}
        style={{
          display: "inline-block",
          border: "1px solid #C7C7C7",
          background: "#E4E3E3",
          width: width + "px",
          height: height + "px",
          fontSize,
          color: fontColor,
          textAlign: "center",
          lineHeight: height + "px",
          whiteSpace: "nowrap",
          overflow: "hidden"
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default App;
