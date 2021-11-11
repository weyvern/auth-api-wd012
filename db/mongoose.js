import mongoose from 'mongoose';

(async () => {
  try {
    const {
      connections: [nativeConn]
    } = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Connected to MongoDB @ ${nativeConn.host}`);
  } catch (error) {
    console.log(error);
  }
})();
