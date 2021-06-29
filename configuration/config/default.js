module.exports = {
  REDIS: process.env.REDIS,
  WIDGETS_PERS_BATCH: 2,
  MAX_WIDGET_PAYLOAD: Number(process.env.PAYLOAD) || 1024 * 1024,
};
