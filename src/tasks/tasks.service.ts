import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const taskData = await this.taskRepository.findOne(id);
        if (!taskData) throw new NotFoundException(`Task with ID ${id} not found`);
        return taskData;
    }

    async deleteTaskById(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return;
    }

    // updateTaskStatusById(id: string, status: TaskStatus): Task {
    //     const getTask = this.getTaskById(id);
    //     // cara panjang
    //     // this.tasks = this.tasks.filter((item) => item.id !== id);
    //     // const storeTask: Task = {
    //     //     id: getTask.id,
    //     //     title: getTask.title,
    //     //     description: getTask.description,
    //     //     status,
    //     // };
    //     // this.tasks.push(storeTask);
    //     // cara pendek
    //     getTask.status = status;
    //     return getTask;
    // }
    // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter((item) => item.status === status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter((item) => item.title.includes(search) || item.description.includes(search));
    //     }
    //     return tasks;
    // }
}
