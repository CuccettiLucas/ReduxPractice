import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from "../styles/Swipper.module.css";
import { Pagination,Navigation } from 'swiper/modules';
import type { Todo } from '../features/todos/types';
import CardTodo from './CardTodo';

interface TodoList{
    todolist:Todo[];
}

const Swipper = ({todolist}:TodoList) =>{
    return(
        <div className={styles.swiperContainer}>
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
                dynamicBullets: true,
                clickable: true,
            }}
            modules={[Pagination,Navigation]}
            className={`mySwiper ${styles.swiper}`}
        >
            {
                Array.isArray(todolist)&&todolist.length>0&&
                todolist.map((todo) => (
                    <SwiperSlide key={todo.id}><CardTodo todo={todo}/></SwiperSlide>
                ))
            }
        </Swiper>
        </div>
    );
}

export default Swipper;