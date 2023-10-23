import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task/add-update-task.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {



  tasks: Task[] = [
    {
      id: '1',
      title: 'Autenticacion Con Google',
      description: 'Crear una funcion que permita autenticar con google',
      items: [
        { name: 'Actividad 1', completed: true },
        { name: 'Actividad 2', completed: true },
        { name: 'Actividad 3', completed: true },
      ],
    },

    {
      id: '2',
      title: 'Autenticacion Con Google',
      description: 'Crear una funcion que permita autenticar con google',
      items: [
        { name: 'Actividad 1', completed: true },
        { name: 'Actividad 2', completed: true },
        { name: 'Actividad 3', completed: false },
      ],
    },
    {
      id: '3',
      title: 'Autenticacion Con Google',
      description: 'Crear una funcion que permita autenticar con google',
      items: [
        { name: 'Actividad 1', completed: true },
        { name: 'Actividad 2', completed: false },
        { name: 'Actividad 3', completed: false },
      ],
    },
  ];



  constructor(
    private firebaseService: FirebaseService,
    private utilsService: UtilsService,
  ) { }

  ngOnInit() {

    this.addOrUpdatetask(this.tasks[0])
  }

  getPercentage(task: Task) {
    return this.utilsService.getPercentage(task);

  }



  addOrUpdatetask(task?: Task) {
    this.utilsService.presentModal({
      component: AddUpdateTaskComponent,
      componentProps: { task },
      cssClass: 'add-update-modal'
    })
  }












}
