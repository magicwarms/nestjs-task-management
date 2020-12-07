import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // @UsePipes(ValidationPipe)
    // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    //     return Object.keys(filterDto).length > 0
    //         ? this.tasksService.getTasksWithFilter(filterDto)
    //         : this.tasksService.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTaskById(id);
    }

    // @Patch('/:id/status')
    // updateTaskStatusById(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
    //     return this.tasksService.updateTaskStatusById(id, status);
    // }
}
