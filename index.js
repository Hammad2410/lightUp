const app = require('./src/configs/servers');
const chatRoute = require('./src/routes/chat');
const authRoute = require('./src/routes/auth');
const paymentRoute = require('./src/routes/payments');

app.use('/chat', chatRoute);
app.use('/auth', authRoute);
app.use('/payments', paymentRoute);

app.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'Server Running'
    })
})