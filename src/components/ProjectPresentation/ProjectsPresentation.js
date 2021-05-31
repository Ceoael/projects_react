import React from 'react';

import classes from './ProjectsPresentation.module.css';

import Project from './Project/Project';
import CustomLink from './CustomLink/CustomLink';

import pomodoroImg from './../../assets/img/pomodoro.png';
import todoImg from './../../assets/img/todoapp.png';
import weatherImg from './../../assets/img/weather-app-challenge.png';

const ProjectsPresentation = () => {
    return (
        <div className={classes.projectsPresentation}>
            <Project
                title="Todo App"
                to="/todo"
                githubLink="https://github.com/Ceoael/todo_react"
                projectImageMobile={todoImg}
            >
            Todo application. User can add new task, mark it as done, update or delete it. There is option to filter tasks by 'all', 'done' and 'undone'. Used React Hooks.
            </Project>
            <Project
                title="Pomodoro"
                to="/pomodoro"
                githubLink="https://github.com/Ceoael/pomodoro_react"
                projectImageMobile={pomodoroImg}
            >
            Pomodoro Timer. User can change settings (session, short break and long break duration and also interval between long break). Form is validated with custom hook. Used React Hooks and Redux (@reduxjs/toolkit) for state management.
            </Project>
            <Project
                title="Weather App"
                outside={true}
                to="https://ceoael-weather-app-challenge.herokuapp.com/"
                githubLink="https://github.com/Ceoael/weather-app-react"
                projectImageMobile={weatherImg}
                scrollable={true}
            >
            Weather App created as a submission to a <CustomLink linkTo="https://devchallenges.io/challenges/mM1UIenRhK808W8qmLWv">DevChallenges</CustomLink> challenge. User can see weather forecast for current day (incl. temperature, humidity, wind speed, wind direction, visibility, air pressure) and weather of the next 5 days. Image change according to each type of weather. User can search weather for specific place (supports only english place names) or use geolocation to search for nearest available location. Using free API: <CustomLink linkTo="https://www.metaweather.com/api/">metaweather</CustomLink>. Used React Hooks and Redux (@reduxjs/toolkit) for state management.
            </Project>
        </div>
    )
}

export default ProjectsPresentation;
