import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/tast';




@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  searchText = '';
  showForm = false;
  editForm = false;
  tasks: Task[] = [];
  resultTasks: Task[]= [];

  myTask: Task = {
    label: '',
    completed: false
  }

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll()
      .subscribe(tasks => this.resultTasks = this.tasks = tasks)
  }

  deleteTask(id:any){
    this.taskService.delete(id)
        .subscribe(() => {
          this.tasks = this.tasks.filter(tast => tast.id != id)
        })
  }

  postTask(){
    this.taskService.post(this.myTask)
        .subscribe((task) => {
          this.tasks = [task, ...this.tasks];
          this.resetTast();
          this.showForm = false;
        })
  }

  resetTast(){
    this.myTask = {
      label: '',
      completed: false
    }
  }

  toggleCompleted(task:any){
    this.taskService.changeCompleted(task.id, task.completed)
        .subscribe(() => {
          task.completed = !task.completed;
        })
  }

  editTask(task: Task){
    this.myTask = task;
    this.editForm = true;
  }

  updatTask(){
    this.taskService.update(this.myTask)
        .subscribe((task => {
          this.resetTast();
          this.editForm = false;
          this.showForm = false;
        }))
  }

  searchTasks(){
    this.resultTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }


}
