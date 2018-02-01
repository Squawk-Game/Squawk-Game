
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

        console.log(mp3Data)

        let thisblob = new Blob(mp3Data, {type: 'audio/mp3'});
        let user = auth.currentUser

        console.log('!!!! current user in download blob', user, auth.currentUser, thisblob)
        //let userPushKey, blobSnapshot, gameId
        let returnsArray = []
        Promise.all([
            auth.currentUser
        ])
        .then((currentUser) => {
            let storageRef = storage.ref()
            let storageChild = storageRef.child(`audio/${currentUser[0].uid}`)
            console.log('BLOBBBB', thisblob, currentUser[0].uid, storageChild)
            storageChild.put(thisblob).then(snapshot => {
                console.log('uploaded blob', snapshot)
                //blobSnapshot = snapshot.downloadUrl
                returnsArray.push(currentUser[0].uid)
            })
        })
        .then(() => {
            console.log(returnsArray)
            let currentUserId = returnsArray[1]
            let pushKeyRef = database.ref(`pushkeys/${currentUserId}`)
            pushKeyRef.once('value', function(snapshot){
                let userPushKey = snapshot.val()
                console.log('USERPUSHKEY:', userPushKey, snapshot)
                returnsArray.push(userPushKey)
            })
        })
        .then(() => {
            console.log(returnsArray)
            // arr[0].once('value', function(snapshot){
            //     userPushKey = snapshot.val()
            //     console.log('USERPUSHKEY:', userPushKey, snapshot)
            // })
            // return arr[1]
        })
        // .then((currentUserId) => {
        //     database.ref(`users/${userPushKey}/${currentUserId}/gameId`).once('value', function(snapshot){
        //         gameId = snapshot.val()
        //         console.log('GAMEID', gameId, snapshot)
        //     })
        // })
        // .then(() => {
        //     console.log('BLOB', blobSnapshot)
        //     let gameRef = database.ref(`games/${gameId}`)
        //     gameRef.update({
        //         audio: {
        //             [auth.currentUser.uid]: blobSnapshot
        //         }
        //     })
        // })
        .catch(err => console.error(err))
        var url = window.URL.createObjectURL(blob);

        var click = document.createEvent('Event');
        click.initEvent('click', true, true);
        var link = document.createElement('A');
        link.href = url;
        link.download = filename;
        link.dispatchEvent(click);
        link.click();
        return link;
    })
    reader.readAsArrayBuffer(blob)
}
