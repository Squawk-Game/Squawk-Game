
// we are altering this function.
// instead of triggering a .wav download,
// we want to convert this blob to .mp3
// and then trigger a download of that .mp3

import lamejs from 'iso-lamejs'
import { storage } from '~/fire'

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

        var blob = new Blob(mp3Data, {type: 'audio/mp3'});
        let storageRef = storage.ref('ahhhhhh')
        storageRef.put(blob).then(snapshot => {
            console.log('uploaded blob')
        })
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
