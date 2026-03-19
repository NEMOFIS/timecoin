export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { txHash, wallet } = req.body;

    const response = await fetch("https://api.timecoinmpp.xyz/claim", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Referer": "https://www.timecoinmpp.xyz/",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
      },
      body: JSON.stringify({ txHash, wallet })
    });

    const text = await response.text();

    return res.status(200).json({
      status: response.status,
      raw: text
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
