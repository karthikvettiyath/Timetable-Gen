import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const facultyApi = {
    findAll: () => api.get('/faculty'),
    findOne: (id: string) => api.get(`/faculty/${id}`),
    create: (data: any) => api.post('/faculty', data),
    update: (id: string, data: any) => api.patch(`/faculty/${id}`, data),
    remove: (id: string) => api.delete(`/faculty/${id}`),
};

export const roomApi = {
    findAll: () => api.get('/room'),
    findOne: (id: string) => api.get(`/room/${id}`),
    create: (data: any) => api.post('/room', data),
    update: (id: string, data: any) => api.patch(`/room/${id}`, data),
    remove: (id: string) => api.delete(`/room/${id}`),
};

export const subjectApi = {
    findAll: () => api.get('/subject'),
    findOne: (id: string) => api.get(`/subject/${id}`),
    create: (data: any) => api.post('/subject', data),
    update: (id: string, data: any) => api.patch(`/subject/${id}`, data),
    remove: (id: string) => api.delete(`/subject/${id}`),
};

export const classGroupApi = {
    findAll: () => api.get('/class-group'),
    findOne: (id: string) => api.get(`/class-group/${id}`),
    create: (data: any) => api.post('/class-group', data),
    update: (id: string, data: any) => api.patch(`/class-group/${id}`, data),
    remove: (id: string) => api.delete(`/class-group/${id}`),
};

export const timeSlotApi = {
    findAll: () => api.get('/time-slot'),
    findOne: (id: string) => api.get(`/time-slot/${id}`),
    create: (data: any) => api.post('/time-slot', data),
    update: (id: string, data: any) => api.patch(`/time-slot/${id}`, data),
    remove: (id: string) => api.delete(`/time-slot/${id}`),
};

export const schedulerApi = {
    generate: () => api.post('/scheduler/generate'),
    findAll: () => api.get('/scheduler'),
};

export default api;
