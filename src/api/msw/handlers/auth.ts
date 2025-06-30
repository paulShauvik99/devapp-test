import { http, HttpResponse } from 'msw';
import { createResponse, validateRequiredFields} from '../utils/helpers';
import { mockUsers } from '../data/users';
import { generateJWT } from '../utils/generators';
import type { LoginInput, User } from '../../../models';


export const authHandlers = [
    http.post('/api/auth/login', async ({ request }) => {
        const { email , password } = await request.json() as LoginInput;
        const user = mockUsers.find(u => u.email === email);

        if (user && password === user.password) {
            const token = generateJWT({ id: user.id, email: user.email });
            const refreshToken = generateJWT({ id: user.id }, 7 * 24 * 60 * 60); 

            return HttpResponse.json(
                createResponse({
                    user,
                    token,
                    refreshToken,
                    expiresIn: 3600
                }, 'Login successful'),
                { status: 200 }
            );
        }

        return HttpResponse.json(
            createResponse(null, '', 'Invalid credentials', false),
            { status: 401 }
        );
    }),

    http.post('/api/auth/register', async ({ request }) => {
        const body = await request.json() as Partial<User> & { password?: string };

        const { isValid, errors } = validateRequiredFields(body, ['email', 'name', 'password']);
        if (!isValid) {
                return HttpResponse.json(
                    createResponse(errors, '', 'Missing required fields', false),
                    { status: 400 }
                );
        }

        const exists = mockUsers.some(u => u.email === body.email);
        if (exists) {
            return HttpResponse.json(
                createResponse(null, '', 'User already exists', false),
                { status: 409 }
            );
        }

        const newUser: User = {
            ...body,
            id: `u${mockUsers.length + 1}`,
            skills: [],
            socialLinks: [],
            blogs: [],
            isActive: true,
        } as User;

        const token = generateJWT({ id: newUser.id, email: newUser.email });
        const refreshToken = generateJWT({ id: newUser.id }, 7 * 24 * 60 * 60);

        return HttpResponse.json(
            createResponse({
                user: newUser,
                token,
                refreshToken,
                expiresIn: 3600
            }, 'Registration successful'),
            { status: 201 }
        );
    }),

    http.post('/api/auth/logout', () => {
        return HttpResponse.json(
            createResponse(null, 'Logout successful'),
            { status: 200 }
        );
    }),
];