const express = require('express')
const app = express()
const { Resemble } = require('@resemble/node')
const path = require("path");
const port = process.env.PORT || 1000
// const mongoose = require('mongoose')

Resemble.setApiKey('yGkXJabOADCt6DrIi42YAgtt')

const projectUuid = '0a985c8a'
const clipUuid = '2dbbc60a'

app.get('/', (req, res) => {
    res.send('<h1><a>Go To Synthesize Text</a></h1>')
})

app.get('/stream', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))

})

app.post('/stream', (req, res) => {
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

    const response = req.body

    res.send(response)
})

app.listen(port, () => {
    console.log(`Listening at port : ${port}`)
})
