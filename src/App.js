import { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/business-data", { name, location });
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const regenerateHeadline = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/regenerate-headline?name=${name}&location=${location}`);
      setData((prev) => ({ ...prev, headline: res.data.headline }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Business Dashboard</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Business Name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full border p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>

        {data && (
          <div className="mt-6 border-t pt-4">
            <p><strong>⭐ Rating:</strong> {data.rating}</p>
            <p><strong>🗨️ Reviews:</strong> {data.reviews}</p>
            <p><strong>🧠 Headline:</strong> {data.headline}</p>
            <button onClick={regenerateHeadline} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Regenerate SEO Headline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;