/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-professional-details-modal',
  templateUrl: './professional-details-modal.page.html',
  styleUrls: ['./professional-details-modal.page.scss'],
})
export class ProfessionalDetailsModalPage implements OnInit {

  @Input() selectedProfessional: any;

  availableTimes: string[] = [];
  selectedTime: string | null = null;
  lastSelectedTime: string | null = null;

  ngOnInit() {
    this.generateAvailableTimes();
  }


  constructor(private modalController: ModalController, private router: Router, private toastController: ToastController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  generateAvailableTimes() {
    const startHour = 8;
    const endHour = 17;

    for (let hour = startHour; hour <= endHour; hour++) {
      const formattedHour = this.formatHour(hour);
      this.availableTimes.push(formattedHour);
    }
  }

  formatHour(hour: number): string {
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  schedule(){
    this.router.navigate(['/home/tabs/tab1']);
    this.presentSuccessToast();
    this.closeModal();
  }

  isTimeActive(time: string): boolean {
    return this.selectedTime === time;
  }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Agendamento Realizado com Sucesso!',
      duration: 4000,
      color: 'success',
      position: 'top',
    });

    toast.present();
  }
}
