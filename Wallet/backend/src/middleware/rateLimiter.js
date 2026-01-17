import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    // in real application use req.ip or user id to identify the user
    const { success } = await ratelimit.limit("my-ip-address");
    if (!success) {
      return res
        .status(429)
        .json({ error: "Too Many Requests, Please try again later." });
    }

    next();
  } catch (error) {
    console.error("Rate limiting error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default ratelimiter;
