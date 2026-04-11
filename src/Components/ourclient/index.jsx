import "bootstrap/dist/css/bootstrap.min.css";

const Client = () => {
  const logosRow1 = [
    "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png",
    "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png",
    "17.png", "18.png", "19.png", "20.png" 
  ];

  const logosRow2 = [
    "21.png", "22.png", "23.png", "24.png", "25.png", "26.png", "27.png", "28.png", 
    "29.png", "30.png", "31.png", "32.png", "33.png", "34.png", "35.png", "37.png", 
    "38.png", "39.png", "40.png", "41.png"
  ];

  return (
    <div
      className="container bg-gradient"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="text-left mt-4"> {/* reduced space here */}
        <h2 className="display-4 fw-bold text-black"></h2>
        <h3
          className="display-3 fw-bold"
          style={{
            WebkitTextStroke: "2px black",
            color: "transparent",
          }}
        >
          Our CLIENTS
        </h3>
        <p className="h5 text-primary text-start text-black">
          Trusted by 1000K+ customers
        </p>
      </div>

      {/* First Scrolling Line */}
      <div className="scroll-container">
        <div className="scrolling-content">
          {[...logosRow1, ...logosRow1].map((img, index) => (
            <img
              key={index}
              src={`/assets/img/brand1/${img}`}
              alt={`Client ${index + 1} logo`}
              className="client-logo"
            />
          ))}
        </div>
      </div>

      {/* Second Scrolling Line */}
      <div className="scroll-container reverse mt-4">
        <div className="scrolling-content">
          {[...logosRow2, ...logosRow2].map((img, index) => (
            <img
              key={index}
              src={`./assets/img/brand1/${img}`}
              alt={`Client ${index + 11} logo`}
              className="client-logo"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Client;
