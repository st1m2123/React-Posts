import React from "react";
import notFound from './img/ic-notfound.svg';
import { Link } from 'react-router-dom';
import s from './styles.module.css';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

const NotFound = ( {children, title, buttonText = "На главную", buttonAction} ) => {
	const Authorization = localStorage.getItem('token');


	return (
		<>
			{Authorization === null ? <div className={s.notFound}>
				<>
				<h1 className={s.title}>Добро пожаловать на React Posts <RocketLaunchOutlinedIcon/></h1>
				<p>Войдите или зарегистрируйтесь на сайте, чтобы посты стали доступны</p>
				{children && children}
				</>
			</div> :
			<>
			<h1 className={s.title}>Страница не найдена 404</h1>
			</>
		}
		</>
	);
}

export default NotFound
