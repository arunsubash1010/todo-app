import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { Tasks } from './todo-interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [trigger('fade', [])],
})
export class DashboardComponent implements OnInit {
  taskId: number = 0;
  taskTitle: string = '';
  editing: boolean = false;
  tasks: Tasks[] = [];
  beforeEditing: string = '';
  today: number = Date.now();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.beforeEditing = '';
    this.taskId = 1;
    this.taskTitle = '';
  }

  addTask() {
    if (this.taskTitle.trim().length === 0) return;
    this.taskId = this.taskId + 1;
    this.tasks.push({
      id: this.taskId,
      title: this.taskTitle,
      completed: false,
      editing: false,
      date: Date.now(),
    });
    this.taskTitle = '';
    this.ngOnInit();
  }

  toggleEdit(event: Tasks) {
    event.editing = !event.editing;
  }

  editTask(event: Tasks) {
    this.beforeEditing = event.title;
    event.editing = !event.editing;
  }

  doneEditing(task: Tasks): void {
    if (task.title.trim().length === 0) {
      task.title = this.beforeEditing;
    }
    task.editing = false;
  }

  cancelEditing(task: Tasks) {
    task.title = this.beforeEditing;
    task.editing = false;
  }

  remaining(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }

  atleastOneCompleted(): boolean {
    return this.tasks.filter((task) => task.completed).length > 0;
  }

  deleteTask(taskId: any) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === taskId) {
        this.tasks.splice(i, 1);
        break;
      }
    }
  }

  deleteCompletedTask() {
    const completedTaskIndices = [];

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].completed) {
        completedTaskIndices.push(i);
      }
    }

    for (let i = completedTaskIndices.length - 1; i >= 0; i--) {
      this.tasks.splice(completedTaskIndices[i], 1);
    }
  }

  selectAll(event: any): void {
    this.tasks.forEach((x) => (x.completed = event.target.checked));
  }
}
