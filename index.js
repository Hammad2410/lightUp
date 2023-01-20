const app = require('./src/configs/servers');
const chatRoute = require('./src/routes/chat');



app.use('/chat', chatRoute);


app.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'Server Running'
    })
})