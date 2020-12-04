import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { customAlphabet } from 'nanoid/async';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12);

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: await nanoid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task {
        const taskData = this.tasks.find((task) => task.id === id);
        if (!taskData) throw new NotFoundException(`Task with ID ${id} not found`);
        return taskData;
    }

    deleteTaskById(id: string): Task[] {
        this.getTaskById(id);
        // cara panjang
        // const lala = this.tasks
        //     .map((item) => {
        //         return item.id;
        //     })
        //     .indexOf(id);
        // if (lala > -1) this.tasks.splice(lala, 1);
        // cara pendek
        return (this.tasks = this.tasks.filter((item) => item.id !== id));
    }

    updateTaskStatusById(id: string, status: TaskStatus): Task {
        const getTask = this.getTaskById(id);
        // cara panjang
        // this.tasks = this.tasks.filter((item) => item.id !== id);
        // const storeTask: Task = {
        //     id: getTask.id,
        //     title: getTask.title,
        //     description: getTask.description,
        //     status,
        // };
        // this.tasks.push(storeTask);
        // cara pendek
        getTask.status = status;
        return getTask;
    }

    getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter((item) => item.status === status);
        }
        if (search) {
            tasks = tasks.filter((item) => item.title.includes(search) || item.description.includes(search));
        }
        return tasks;
    }
}
