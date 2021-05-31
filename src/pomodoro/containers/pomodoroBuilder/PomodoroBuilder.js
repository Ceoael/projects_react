import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { pomodoroActions } from './../../store/pomodoroSlice';

import Navigation from '../../components/navigation/Navigation';
import Display from '../../components/display/Display';
import SettingsContainer from '../settingsContainer/SettingsContainer';
import PomodoroBuilderWrapper from '../../components/pomodoroBuilderWrapper/pomodoroBuilderWrapper';
import Buttons from '../../components/buttons/Buttons';
import Modal from './../../shared/components/Modal/Modal';
import Backdrop from './../../shared/components/Backdrop/Backdrop';

import sound from './../../../assets/sounds/mixkit-unlock-game-notification-253.wav';

const PomodoroBuilder = () => {
    const dispatch = useDispatch();

    const alarmSound = useRef();

    const [timer, setTimer] = useState(null);
    const [breakIsActive, setBreakIsActive] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [countdownIsRunning, setCountdownIsRunning] = useState(false);
    const [longBreakIsActive, setLongBreakIsActive] = useState(false);

    const timerSettings = useSelector(store => store.pomodoro.timerSettings);
    const currentBreak = useSelector(store => store.pomodoro.breakTimeLeft);
    const currentSession = useSelector(store => store.pomodoro.sessionTimeLeft);
    const interval = useSelector(store => store.pomodoro.sessionsToLongBreak);

    useEffect(() => {
        const {session, shortBreak, longBreakInterval } = timerSettings;
        dispatch(pomodoroActions.setSessionTimeLeft({value: session}));
        dispatch(pomodoroActions.setBreakTimeLeft({value: shortBreak}));
        dispatch(pomodoroActions.setSessionsToLongBreak({value: longBreakInterval}));
        setBreakIsActive(false);
        setLongBreakIsActive(false);
    }, [timerSettings, dispatch])

    const turnOnBreakTab = (isTrue) => setBreakIsActive(isTrue);

    const openSettings = () => setShowSettings(true);
    const closeSettings = () => setShowSettings(false);
    
    const resetCurrentTabTime = () => {
        if (breakIsActive) {
            if (interval === 1) {
                dispatch(pomodoroActions.setBreakTimeLeft({value: timerSettings.longBreak}))
            } else {
                dispatch(pomodoroActions.setBreakTimeLeft({value: timerSettings.shortBreak}))
            }
        } else {
            dispatch(pomodoroActions.setSessionTimeLeft({value: timerSettings.session}))
        }
    }

    const startButtonHandler = () => {
        if (countdownIsRunning) {
            clearInterval(timer);
            setCountdownIsRunning(false);
        } else {
            countdown();
            setCountdownIsRunning(true);
        }
    }

    useEffect(() => {
        if (timeFormattedForDisplay(currentSession) === '00:00') {
            playSound();
            dispatch(pomodoroActions.decrementBreakInterval());
            setCountdownIsRunning(false);
            clearInterval(timer);
            setBreakIsActive(true);
            dispatch(pomodoroActions.setSessionTimeLeft({value: timerSettings.session}));
        }
    }, [currentSession, dispatch])

    useEffect(() => {
        if (timeFormattedForDisplay(currentBreak) === '00:00') {
            playSound();
            setCountdownIsRunning(false);
            clearInterval(timer);

            if (interval > 1) {
                setLongBreakIsActive(false);
                dispatch(pomodoroActions.setBreakTimeLeft({value: timerSettings.shortBreak}));
            } else if (interval === 1) {
                setLongBreakIsActive(true);
                dispatch(pomodoroActions.setBreakTimeLeft({value: timerSettings.longBreak}));
            } else if (interval <= 0) {
                setLongBreakIsActive(false);
                dispatch(pomodoroActions.setSessionsToLongBreak({value: timerSettings.longBreakInterval}));
                dispatch(pomodoroActions.setBreakTimeLeft({value: timerSettings.shortBreak}));
            }
            setBreakIsActive(false);
        }
    }, [currentBreak, dispatch])

    useEffect(()=>{
        return () => {
            clearInterval(timer);
        }
    }, [timer])

    function playSound () {
        alarmSound.current.play();
    }

    function countdown () {
        const timer = setInterval(() => {
            if (breakIsActive) {
                dispatch(pomodoroActions.decrementBreakTimeLeft());
            } else {
                dispatch(pomodoroActions.decrementSessionTimeLeft());
            }
        }, 1000);
        setTimer(timer);
    }

    function timeFormattedForDisplay (inSeconds) {
        const formatted = (time) => time < 10 ? `0${time}` : `${time}`;
        const min = Math.floor( inSeconds / 60 );
        const sec = inSeconds % 60;

        return `${formatted(min)}:${formatted(sec)}`;
    }

    return (
        <PomodoroBuilderWrapper>
            <Backdrop show={showSettings} clicked={closeSettings}/>
            <Modal modalOpen={showSettings} modalOFF={closeSettings} modalName="Settings">
                <SettingsContainer 
                    modalOFF={closeSettings}
                    timerSettings={timerSettings}/>
            </Modal>
            <Navigation
                longBreakIsActive={longBreakIsActive} 
                timerIsRunning={countdownIsRunning}
                breakIsActive={breakIsActive}
                turnOnBreakTabHandler={turnOnBreakTab}
                settingsOnHandler={openSettings}/>
            <Display 
                breakIsActive={breakIsActive}
                currentBreakTime={timeFormattedForDisplay(currentBreak)}
                currentSessionTime={timeFormattedForDisplay(currentSession)}/>
            <Buttons
                timerIsRunning={countdownIsRunning}
                resetButtonHandler={resetCurrentTabTime}
                startButtonHandler={startButtonHandler}/>
            <audio ref={alarmSound} >
                <source src={sound} />
            </audio>
        </PomodoroBuilderWrapper>
    )
}

export default PomodoroBuilder;
