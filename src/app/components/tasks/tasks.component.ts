import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/tast';





@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

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
      .subscribe(tasks => this.tasks = tasks)
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

}
