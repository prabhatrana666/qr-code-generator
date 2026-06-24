import { useState } from "react";
import QRCode from "qrcode";
import "../App.css";

function App() {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  const generateQRCode = async () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    try {
      const generatedQR = await QRCode.toDataURL(url);
      setQrCode(generatedQR);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qrcode.png";
    link.click();
  };

  const clearQRCode = () => {
    setUrl("");
    setQrCode("");
  };

  return (
    <div className="app">
      <div className="card">
        <h1>QR Code Generator</h1>

        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="buttons">
          <button onClick={generateQRCode}>Generate QR Code</button>

          {qrCode && (
            <>
              <button onClick={downloadQRCode}>
                Download QR Code
              </button>

              <button onClick={clearQRCode}>
                Clear
              </button>
            </>
          )}
        </div>

        {qrCode && (
          <div className="qr-container">
            <img src={qrCode} alt="QR Code" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;