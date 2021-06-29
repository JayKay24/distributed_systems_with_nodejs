module.exports = {
  ENV: "staging",
  REDIS: process.env.REDIS || "redis://staging:6379",
  MAX_WIDGET_PAYLOAD: Infinity,
};
