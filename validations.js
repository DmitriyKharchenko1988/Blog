import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'Невірний формат скрині').isEmail(),
    body('password', 'Пароль повинен бути мін. 5 символів').isLength({min:5}),
];

export const registerValidation = [
    body('email', 'Невірний формат скрині').isEmail(),
    body('password', 'Пароль повинен бути мін. 5 символів').isLength({min:5}),
    body('fullName', 'Вкажіть прізвмще').isLength({min:3}),
    body('avatarUrl', 'Помилкова силка').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введіть заголовок статті').isLength({min:3}).isString(),
    body('text', 'Введіть текст статті').isLength({min:3}).isString(),
    body('tags', 'Помилковий формат тєгів (вкажіть масив)').optional().isString(),
    body('imageUrl', 'Помилкова силка на зображення').optional().isString(),
];