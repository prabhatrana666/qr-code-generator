import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import QRCode from "qrcode";
import "../App.css";

function QrCodeCard() {
    const [url, setUrl] = useState("");
    const [qrCode, setQrCode] = useState("");
    const [size, setSize] = useState(300);
    const [color, setColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#FFFFFF");
    const [history, setHistory] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        document.body.className = darkMode ? "dark-body" : "";
    }, [darkMode]);
    const generateQRCode = async () => {
        if (!url.trim()) {
            alert("Please enter URL or Text");
            return;
        }

        try {
            const qr = await QRCode.toDataURL(url, {
                width: size,
                color: {
                    dark: color,
                    light: bgColor,
                },
            });

            setQrCode(qr);

            // Add URL to history
            if (!history.includes(url)) {
                setHistory((prev) => [url, ...prev]);
            }

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
    const clearHistory = () => {
        setHistory([]);
    };
    return (
        <div className={`container ${darkMode ? "dark" : ""}`}>
            <div className="theme-toggle-wrapper">
                <span className="theme-icon">☀</span>

                <label className="switch">
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                    <span className="slider"></span>
                </label>

                <span className="theme-icon">☾</span>
            </div>
            <h1 className="title">
                QR Code <span>Generator</span>
            </h1>
            <p className="subtitle">
                Create, customize, and download QR codes
                <span className="free-text"> for free</span>
            </p>
            <div className="main-grid">
                {/* LEFT PANEL */}
                <div className="left-panel">
                    <label>Enter URL or Text</label>

                    <input
                        type="text"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />

                    <div className="color-section">
                        <div>
                            <label>QR Color</label>
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Background</label>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                            />
                        </div>
                    </div>

                    <label>Size: {size}px</label>

                    <input
                        type="range"
                        min="150"
                        max="500"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />

                    <div className="buttons">
                        <button onClick={generateQRCode}>
                            Generate QR Code
                        </button>

                        <button
                            onClick={downloadQRCode}
                            disabled={!qrCode}
                        >
                            Download
                        </button>

                        <button onClick={clearQRCode}>
                            Clear
                        </button>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="right-panel">
                    <h2>Your QR Code</h2>

                    {qrCode ? (
                        <img src={qrCode} alt="QR Code" />
                    ) : (
                        <p>No QR Generated</p>
                    )}
                </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="bottom-grid">
                <div className="info-card">
                    <h3 className="purple-title">⭐ Awesome Features</h3>

                    <div className="feature-item">
                        <h4>Instant Generation</h4>
                        <p>Generate QR codes instantly with just one click</p>
                    </div>

                    <div className="feature-item">
                        <h4>Customize Style</h4>
                        <p>Choose from multiple styles and colors</p>
                    </div>

                    <div className="feature-item">
                        <h4>High Quality</h4>
                        <p>Download high-resolution QR codes</p>
                    </div>

                    <div className="feature-item">
                        <h4>Privacy Focused</h4>
                        <p>Your data is secure and never stored</p>
                    </div>
                </div>

                <div className="info-card">
                    <h3 className="blue-title">ℹ️ How to Use</h3>

                    <div className="step">
                        <span>1</span>
                        <p>Enter any URL or text you want to generate QR code for</p>
                    </div>

                    <div className="step">
                        <span>2</span>
                        <p>Customize the style, colors and size</p>
                    </div>

                    <div className="step">
                        <span>3</span>
                        <p>Click Generate QR Code</p>
                    </div>

                    <div className="step">
                        <span>4</span>
                        <p>Download and share your QR code</p>
                    </div>
                </div>
                <div className="info-card">
                    <div className="history-header">
                        <h3 className="green-title">↻ Recent History</h3>

                        <button
                            className="clear-history"
                            onClick={clearHistory}
                        >
                            Clear History
                        </button>
                    </div>

                    {history.length === 0 ? (
                        <div className="history-item">
                            No History Yet
                        </div>
                    ) : (
                        history.map((item, index) => (
                            <div
                                key={index}
                                className="history-item"
                            >
                                {item}
                            </div>
                        ))
                    )}
                </div>

            </div>

            <footer className="footer">
                <p>
                    Made with ❤️ by Prabhat Rana | © {new Date().getFullYear()} All Rights Reserved
                </p>

                <div className="social-links">
                    <a
                        href="https://github.com/prabhatrana666"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                    </a>

                    <a
                        href="www.linkedin.com/in/prabhat-rana"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin />
                    </a>

       
                </div>
            </footer>
        </div>
    );
}

export default QrCodeCard;