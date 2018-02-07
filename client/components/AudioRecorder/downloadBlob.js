
// we are altering this function.
// instead of triggering a .wav download,
// we want to convert this blob to .mp3
// and then trigger a download of that .mp3

import lamejs from 'iso-lamejs'
import { storage, auth, database } from '~/fire'

// trigger a browser file download of binary data
// trigger a browser file download of binary data
export default function downloadBlob(blob, filename) {
    // what should the file name be? something random probably
    // but definitely with an .mp3 file extension

    filename = 'output.mp3'

    var reader = new FileReader()
    reader.addEventListener('loadend', () => {
        var arrayBuffer = reader.result
        var mp3Data = []

        var mp3encoder = new lamejs.Mp3Encoder(1, 44100, 128)
        var samples = new Int16Array(arrayBuffer)
        var mp3Tmp = mp3encoder.encodeBuffer(samples)

        //Push encode buffer to mp3Data variable
        mp3Data.push(mp3Tmp);

        // Get end part of mp3
        mp3Tmp = mp3encoder.flush();

        // Write last data to the output data, too
        // mp3Data contains now the complete mp3Data
        mp3Data.push(mp3Tmp);

        let thisblob = new Blob(mp3Data, { type: 'audio/mp3' });

        let returnsArray = []
        Promise.all([
            auth.currentUser
        ])
        .then((currentUser) => {
            let storageRef = storage.ref()
            let storageChild = storageRef.child(`audio/${currentUser[0].uid}`)
            storageChild.put(thisblob).then(snapshot => {
                returnsArray.push(currentUser[0].uid)
                returnsArray.push(snapshot)
            }).then(() => {
                let currentUserId = returnsArray[0]
                let pushKeyRef = database.ref(`pushkeys/${currentUserId}`)
                pushKeyRef.once('value').then(snapshot => {
                    let userPushKey = snapshot.val()
                    returnsArray.push(userPushKey)
                }).then(() => {
                    let userId = returnsArray[0]
                    let pushKey = returnsArray[2]
                    database.ref(`users/${pushKey}/${userId}/gameId`).once('value')
                    .then(snapshot => {
                        let gameId = snapshot.val()
                        returnsArray.push(gameId)
                    })
                    .then(() => {
                        let blobby = returnsArray[1]
                        return blobby
                    })
                    .then((blobby) => {
                        let game = returnsArray[3]
                        let thisUser = returnsArray[0]
                        let gameAudioRef = database.ref(`games/${game}/audio`)
                        gameAudioRef.update({[thisUser]: blobby.downloadURL})
                    })
                })
            })
            })
            .catch(err => console.error(err))

        // var url = window.URL.createObjectURL(blob);

        // var click = document.createEvent('Event');
        // click.initEvent('click', true, true);
        // var link = document.createElement('A');
        // link.href = url;
        // link.download = filename;
        // link.dispatchEvent(click);
        // link.click();
        // return link;
    })
    reader.readAsArrayBuffer(blob)
}
