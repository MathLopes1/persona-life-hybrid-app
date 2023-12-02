import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
})
export class AuthComponentComponent implements OnInit {
  screen: any = 'signin';
  formData: FormGroup;
  isLoading= false;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.formData = this.fb.group({
      name: ['',[Validators.required]],
      cpf: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(11)]],
      phone: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(11)]],
      zip_code: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
      state: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(11)]],
      country: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(11)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
    });
  }

  ngOnInit() {}

  change(event){
    this.screen = event;
  }

  login(){
    const formData: any = new FormData();
    if(this.formData.valid){
      this.isLoading = true;
      formData.append('email', this.formData.get('email').value);
      formData.append('password', this.formData.get('password').value);
      console.log(this.formData);
      this.auth.userLogin(formData).subscribe((data: any)=>{
        console.log(data);
      });
    }
  }

  register(){
    const formData: any = new FormData();
    if(this.formData.valid){
      this.isLoading = true;
      formData.append('name', this.formData.get('name').value);
      formData.append('cpf', this.formData.get('cpf').value);
      formData.append('phone', this.formData.get('phone').value);
      formData.append('zip_code', this.formData.get('zip_code').value);
      formData.append('state', this.formData.get('state').value);
      formData.append('country', this.formData.get('country').value);
      formData.append('email', this.formData.get('email').value);
      formData.append('password', this.formData.get('password').value);
      console.log(this.formData);
      this.auth.userRegister(formData).subscribe((data: any)=>{
        console.log(data);
      });
    }
  }
}
