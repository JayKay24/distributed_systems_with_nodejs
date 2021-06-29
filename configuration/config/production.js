module.exports = {
  ENV: "production",
  REDIS: process.env.REDIS || "redis://production:6379",
  MAX_WIDGET_PAYLOAD: Infinity,
};
