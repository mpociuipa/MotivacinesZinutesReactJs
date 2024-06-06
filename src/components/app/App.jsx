import React, { useState, useEffect } from 'react';


function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('https://strangerthings-quotes.vercel.app/api/quotes/50');
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const prevQuote = () => {
    if (currentQuoteIndex > 0) {
      setCurrentQuoteIndex(currentQuoteIndex - 1);
    }
  };

  const nextQuote = () => {
    if (currentQuoteIndex < quotes.length - 1) {
      setCurrentQuoteIndex(currentQuoteIndex + 1);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card mt-5">
            <div className="card-body text-center">
              <h1 className="mb-4">Motyvuojančios citatos</h1>
              {quotes.length > 0 && (
                <>
                  <p className="lead">{quotes[currentQuoteIndex].quote}</p>
                  <p className="font-italic">- {quotes[currentQuoteIndex].author}</p>
                </>
              )}
              <div className="btn-group mt-3" role="group">
                <button className="btn btn-primary" onClick={prevQuote} disabled={currentQuoteIndex === 0}>
                  Ankstesnė citata
                </button>
                <button className="btn btn-primary" onClick={nextQuote} disabled={currentQuoteIndex === quotes.length - 1}>
                  Sekanti citata
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
