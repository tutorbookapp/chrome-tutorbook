import './popup.scss';

import {
    MDCTextField,
} from '@material/textfield';
import {
    MDCSelect,
} from '@material/select';
import {
    MDCRipple,
} from '@material/ripple';

import $ from 'jquery';

const globals = window.app = {};

function setup() {
    globals.previewVideo = $('#preview')[0];
    globals.apptSelect = new MDCSelect($('#appt')[0]);
    globals.timerTextField = new MDCTextField($('#timer')[0]);

    globals.recordTabBtn = $('#record-tab')[0];
    globals.recordDesktopBtn = $('#record-desktop')[0];
    globals.recordWebcamBtn = $('#record-webcam')[0];

    globals.pauseRecordingBtn = $('#pause-recording').hide()[0];
    globals.contRecordingBtn = $('#cont-recording').hide()[0];
    globals.stopRecordingBtn = $('#stop-recording').hide()[0];

    $('#timer input')[0].disabled = true;
    $('.mdc-button').each(function() {
        MDCRipple.attachTo(this);
    });

    $(globals.recordTabBtn).click(() => {
        chrome.desktopCapture.chooseDesktopMedia([
            'tab',
        ], (streamId, options) => {
            if (streamId) startRecording(streamId);
        });
    });

    $(globals.recordDesktopBtn).click(() => {
        chrome.desktopCapture.chooseDesktopMedia([
            'screen',
            'window',
        ], (streamId, options) => {
            if (streamId) startRecording(streamId);
        });
    });

    $(globals.pauseRecordingBtn).click(pauseRecording);
    $(globals.contRecordingBtn).click(contRecording);
    $(globals.stopRecordingBtn).click(stopRecording);
}

function updateTimer() {
    const val = globals.timerTextField.value.split(':');
    var hrs = new Number(val[0]);
    var mins = new Number(val[1]);
    var secs = new Number(val[2]);
    secs++;
    if (secs === 60) {
        secs = 0;
        mins++;
    }
    if (mins === 60) {
        mins = 0;
        hrs++;
    }
    globals.timerTextField.value = ('0' + hrs).slice(-2) + ':' +
        ('0' + mins).slice(-2) + ':' + ('0' + secs).slice(-2);
}

function startRecording(streamId) {
    [
        globals.recordTabBtn,
        globals.recordDesktopBtn,
        globals.recordWebcamBtn,
    ].map(btn => btn.disabled = true);
    [
        globals.stopRecordingBtn,
        globals.pauseRecordingBtn,
    ].map(btn => $(btn).show());
    globals.timer = setInterval(updateTimer, 1000);

    navigator.webkitGetUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamId,
            },
        },
    }, gotStream, getUserMediaError);

    function gotStream(stream) {
        window.mediaStream = stream;
        console.log('[DEBUG] The stream (' + streamId + '):', stream);
        //globals.previewVideo.srcObject = stream;
        const data = globals.recordedChunks = [];
        const recorder = globals.recorder = new MediaRecorder(stream, {
            mimeType: 'video/webm',
        });
        recorder.ondataavailable = function(event) {
            console.log('data-available');
            data.push(event.data);
            download();
        };
        recorder.start();

        function download() {
            const blob = new Blob(data, {
                type: 'video/webm',
            });
            const url = URL.createObjectURL(blob);
            console.log('download (blob) url:', url);
        };
    }

    function getUserMediaError(error) {
        console.error('[ERROR] While getting user media:', error);
    }
}

function pauseRecording() {
    $(globals.pauseRecordingBtn).hide();
    $(globals.contRecordingBtn).show();
    globals.timer = clearInterval(globals.timer);
}

function contRecording() {
    $(globals.pauseRecordingBtn).show();
    $(globals.contRecordingBtn).hide();
    globals.timer = setInterval(updateTimer, 1000);
}

function stopRecording() {
    [
        globals.recordTabBtn,
        globals.recordDesktopBtn,
        globals.recordWebcamBtn,
    ].map(btn => btn.disabled = false);
    [
        globals.stopRecordingBtn,
        globals.pauseRecordingBtn,
    ].map(btn => $(btn).hide());
    globals.timerTextField.value = '00:00:00';
    globals.timer = clearInterval(globals.timer);
}

function viewPage(pageId) {
    $('.page').hide();
    $('#' + pageId).show();
}

function main() {
    setup();
    viewPage('record-page');
}

main();