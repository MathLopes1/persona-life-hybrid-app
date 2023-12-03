import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CepService } from '../services/cep.service';
import * as jwt_decode from 'jwt-decode';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
})
export class AuthComponentComponent implements OnInit {

  screen: any = 'signin';
  formData: FormGroup;
  isLoading = false;

  errorMessages = {
    name: {
      required: 'Nome é obrigatório',
    }
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private cepService: CepService,
    private toastController: ToastController,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]],
      phone: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]],
      zip_code: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
      state: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]],
      country: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]],
      address: ['', [Validators.required, Validators.minLength(1)]],
      address_number: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  change(event) {
    this.screen = event;
  }

  login() {
    this.isLoading = true;

    const payload = {
      email: this.formData.get('email').value,
      password: this.formData.get('password').value
    };

    console.log(payload);
    this.auth.userLogin(payload).subscribe(
      (data: any) => {
        console.log(data);
        if (data && data.access_token) {
          const userId = this.tokenService.getUserIdFromToken(data.access_token);
          if (userId) {
            localStorage.setItem('userId', userId);
          }
        }

        this.router.navigate(['/home/tabs/tab1']);
        this.presentSuccessToast('Bem-vindo ao PersonaLife');
      },
      (error) => {
        console.error(error);
        this.presentErrorToast('Usuário ou senha incorretos');
      }
    );
  }

  register() {
    if (this.formData.valid) {
      this.isLoading = true;

      const payload = {
        name: this.formData.get('name').value,
        cpf: this.formData.get('cpf').value,
        phone: this.formData.get('phone').value,
        zip_code: this.formData.get('zip_code').value,
        address: this.formData.get('address').value,
        address_number: this.formData.get('address_number').value,
        state: this.formData.get('state').value,
        country: this.formData.get('country').value,
        email: this.formData.get('email').value,
        password: this.formData.get('password').value,
      };


      console.log(this.formData);
      this.auth.userRegister(payload).subscribe(
        (data: any) => {
          console.log(data);
          this.change('signin');
          this.presentSuccessToast('Cadastrado com Sucesso!');
          this.formData.reset();
        },
        (error) => {
          console.error(error);
          this.presentErrorToast('Erro ao criar o registro');
        }
      );
    }
  }

  findCep() {
    const zipCode = this.formData.get('zip_code').value;

    if (zipCode) {
      this.cepService.findAddress(zipCode).subscribe((res: any) => {
        this.formData.patchValue({
          country: res.localidade,
          state: res.uf,
          address: res.bairro + ', ' + res.logradouro,
        });
      });
    }
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'bottom',
    });

    toast.present();
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'bottom',
    });

    toast.present();
  }
}
