const app = require('./src/configs/servers');
const chatRoute = require('./src/routes/chat');
const authRoute = require('./src/routes/auth');

app.use('/chat', chatRoute);
app.use('/auth', authRoute);

app.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'Server Running'
    })
})