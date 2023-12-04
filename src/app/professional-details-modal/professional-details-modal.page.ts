import { SchedulesService } from './../services/schedules.service';
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
  selectedDate: any | null = null;
  lastSelectedTime: string | null = null;

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.generateAvailableTimes();
  }


  constructor(
    private modalController: ModalController,
    private router: Router,
    private toastController: ToastController,
    private schedulesService: SchedulesService) {}

  closeModal() {
    this.modalController.dismiss();
  }

  updateSelectedDate(event) {
    const selectedDateTime = new Date(event.detail.value);
    const formattedDate = this.formatDate(selectedDateTime);
    this.selectedDate = formattedDate;
  }

  formatDate(date: Date): string {
    const day = this.formatTwoDigits(date.getDate());
    const month = this.formatTwoDigits(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  formatTwoDigits(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
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
    this.router.navigate(['/home/tabs/tab2']);
    if(this.selectedDate && this.selectedTime) {
      const customerId = localStorage.getItem('customerId');
      const payload = {
        internalId: customerId,
        healthProviderName: this.selectedProfessional.name,
        healthProviderSpecialty: this.selectedProfessional.specialty,
        schedulesDate: `${this.selectedDate} - ${this.selectedTime}`,
        photoUrl: this.selectedProfessional.photoUrl
      };

      this.schedulesService.createSchedules(payload).subscribe((res) =>{
        this.presentSuccessToast();
        this.closeModal();
        location.reload();
      },
      (error) => {
        console.error('Error to create schedules:', error);
      });
    }
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
