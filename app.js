const express = require('express')
const app = express()
const { Resemble } = require('@resemble/node')
const path = require("path");
const bodyParser = require('body-parser')
const port = process.env.PORT || 1000
// const mongoose = require('mongoose')

// mongoose.connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connection successful')
// }).catch((err) => {
//     console.error(err)
// })

// const schema = new mongoose.Schema({
//     id: String,
//     project_id: String,
//     url: String,
// })

// const Updates = new mongoose.model('Updates', schema)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

Resemble.setApiKey('yGkXJabOADCt6DrIi42YAgtt')

const projectUuid = '0a985c8a'
const clipUuid = '2dbbc60a'

app.get('/', (req, res) => {
    res.send('<a href="/stream" style="font-size: 25px">Go To Synthesize Text</h1>')
})

app.get('/stream', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))

})

app.post('/update', (req, res) => {
    const text = req.body.content

    const update = async () => {
        // const update = await Resemble.v2.clips.updateAsync(projectUuid, clipUuid, {
        //     title: 'Change Voice Test',
        //     voice_uuid: '91d32665',
        //     body: '<speak><voice name="91d32665" uuid="fd9427ae-a7d5-493e-b4a9-df5dc9fe6926">Hi,&#032;This&#032;is&#032;again&#032;a&#032;voice&#032;test</voice></speak>',
        //     synthesize: true,
        //     callback_uri: 'https://example.com'
        // })

        const update = await Resemble.v2.clips.updateAsync(projectUuid, clipUuid, {
            title: 'Change Voice Test',
            voice_uuid: '91d32665',
            body: `${text}`,
            synthesize: true,
            callback_uri: 'https://create-clip.herokuapp.com/stream'
        })
    }

    update()
    
        res.redirect('/stream')
})

app.post('/stream', (req, res) => {

//     const update = () => {
//         try {
//             const updateClip = new Updates({
//                 id: req.body.id,
//                 project_id: req.body.project_id,
//                 url: req.body.url
//             })

//             const result = updateClip.save()
//             console.log(result)
//         } catch (e) {
//             console.error(e)
//         }
//     }
    
//     update()
    
    console.log(req.body)

})

app.listen(port, () => {
    console.log(`Listening at port : ${port}`)
})
