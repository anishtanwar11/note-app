import { Injectable } from '@angular/core';
import { Task } from '../Models/Task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly STORAGE_KRY = 'tasts';

  constructor() { }

  getTask(): Task[] {
    const storedTask = localStorage.getItem(this.STORAGE_KRY);
    return storedTask ? JSON.parse(storedTask): [];
  }

  saveTask(tasks: Task[]):void {
    localStorage.setItem(this.STORAGE_KRY, JSON.stringify(tasks));
  }
}
