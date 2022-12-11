import React, { useState } from "react";
import { useParams } from "react-router-dom";

import LoginForm from "../component/ui/loginForm";
import RegisterForm from "../component/ui/registerForm";

function AuthLayout() {
    const { type } = useParams();

    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = (second) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };
    return (
        <section className='bg-gray-50 dark:bg-gray-900 '>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 '>
                <div className='w-full bg-zinc-200 rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                    {formType === "register" ? (
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8 '>
                            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                                Регистрация аккаунта
                            </h1>
                            <RegisterForm />
                            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                Уже зарегистрировались ?
                                <button
                                    className='font-medium text-primary-600 hover:underline dark:text-primary-500 px-2'
                                    onClick={toggleFormType}
                                >
                                    Вход в аккаунт
                                </button>
                            </p>
                        </div>
                    ) : (
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8 '>
                            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                                Вход в аккаунт
                            </h1>
                            <LoginForm />
                            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                                Ещё нет аккаунта ?
                                <button
                                    className='font-medium text-primary-600 hover:underline dark:text-primary-500 px-2'
                                    onClick={toggleFormType}
                                >
                                    Регистрация
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default AuthLayout;
