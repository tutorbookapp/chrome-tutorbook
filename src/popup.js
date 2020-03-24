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

const timerTextField = new MDCTextField($('#timer')[0]);
const apptSelect = new MDCSelect($('#appt')[0]);
const loginBtn = new MDCRipple($('#login')[0]);
const signupBtn = new MDCRipple($('#signup')[0]);
const recordTabBtn = new MDCRipple($('#record-tab')[0]);
const recordDesktopBtn = new MDCRipple($('#record-desktop')[0]);
const recordWebcamBtn = new MDCRipple($('#record-webcam')[0]);

const viewPage = (q) => $('body').find('.page').hide().end().find(q).show();

viewPage('#record-page');