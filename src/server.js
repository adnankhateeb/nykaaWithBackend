const connect = require('./configs/db');
const app = require('./index');

app.listen(process.env.PORT || 5000, async () => {
  try {
    await connect();
    console.log('listening');
  } catch (error) {
    console.log('error:', error);
  }
});
