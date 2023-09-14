import { style } from '@angular/animations';
import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { Task } from 'src/app/Models/Task';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Output()
  taskAdded = new EventEmitter<string>();
  taskTitle: string = '';
  tasks: Task[] = [];
  

  constructor(private taskService: TaskService) { }
  
  addTask(taskTitle: string){
    if(this.taskTitle.trim() !== ''){
      this.taskAdded.emit(this.taskTitle);
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: taskTitle,
        completed: false
      }
      this.tasks = [...this.tasks, newTask];
      this.saveTasks();
      this.taskTitle = '';
    }
  }

  removeTask(taskId: number){
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  private saveTasks(): void{
    this.taskService.saveTask(this.tasks);
  }
  
  private loadTasks(): void{
    this.tasks = this.taskService.getTask();
  }


  isMenuOpen= false;
  toggleMenu(): void{
    this.isMenuOpen = !this.isMenuOpen;
  }
}
