export const validRegisterConfig = {
    username: {
        isRequired: {
            message: "Имя обязательно для заполнения",
        },
        min: {
            message: "Имя должно содержать минимум 3 символа",
            value: 3,
        },
    },
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения",
        },
        isEmail: {
            message: "Email введён некоректно",
        },
    },
    password: {
        isRequired: {
            message: "Пароль обязателен для заполнения",
        },
        isCapitalSymbol: {
            message: "Пародь должен содержать заглавную букву",
        },
        isContainDigit: {
            message: "Пародь должен содержать цифру",
        },
        min: {
            message: "Пароль должен содержать минимум 8 символов",
            value: 8,
        },
    },
    licence: {
        isRequired: {
            message:
                "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения",
        },
    },
};

export const validLoginConfig = {
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения",
        },
    },
    password: {
        isRequired: {
            message: "Пароль обязателен для заполнения",
        },
    },
};
export const validCreateModel = {
    id: {
        isRequired: {
            message: "Введите данные",
        },
    },
    name: {
        isRequired: {
            message: "Введите данные",
        },
    },
    brand: {
        isRequired: {
            message: "Введите данные",
        },
    },
    title: {
        isRequired: {
            message: "Введите данные",
        },
    },
    price: {
        isRequired: {
            message: "Введите данные",
        },
    },
    size: {
        isRequired: {
            message: "Введите данные",
        },
    },
};
export const validCreateBrand = {
    id: {
        isRequired: {
            message: "Введите данные",
        },
    },
    name: {
        isRequired: {
            message: "Введите данные",
        },
    },
    brand: {
        isRequired: {
            message: "Введите данные",
        },
    },
};
