import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomValidators } from 'src/app/utils/custom-validators';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  confirmPasswordValidator() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password),
    ]);
    this.form.controls.confirmPassword.updateValueAndValidity();
  }

  submit() { //Función para registrar un usuario en firebase y guardar en el local storage el usuario
    if (this.form.valid) {

      this.utilsSvc.presentLoading({ message: 'Registrando...' });
      this.firebaseSvc.singUp(this.form.value as User).then(
        async (res) => {
          console.log(res);

          await this.firebaseSvc.updateUser({ displayName: this.form.value.name }); //Actualizamos el nombre del usuario en firebase

          let user: User = {//Creamos un objeto de tipo usuario para guardar en el local storage y poder usarlo en la app
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
          }


          this.utilsSvc.setElementInLocalStorage('user', user); //Guardamos el usuario en el local storage para que no se cierre la sesión
          this.utilsSvc.routerLink('/tabs/home')//Redireccionamos al home



          this.utilsSvc.dismissLoading();
          this.utilsSvc.presentToast({
            message: `te damos la bienvenida ${user.name}`,
            duration: 1500,
            color: 'primary',
            icon: 'person-outline'

          })

          this.form.reset();
        },
        (err) => {

          this.utilsSvc.dismissLoading();
          this.utilsSvc.presentToast({
            message: err,
            duration: 5000,
            color: 'warning',
            icon: 'alert-circle-outline'

          })
        }
      );
    }
  }
}
