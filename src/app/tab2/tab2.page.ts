import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { SchedulesService } from '../services/schedules.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  name: any;
  schedules: any[] = [];
  originalSchedules: any[] = [];

  constructor(private schedulesService: SchedulesService, private alertController: AlertController) {}
  ngOnInit() {
    this.loadSchedules();
    this.originalSchedules = this.schedules.slice();
  }

  loadSchedules() {
    const customerId = localStorage.getItem('customerId');
    this.schedulesService.findAllSchedulesByInternalId(customerId).subscribe(
      (res: any) => {
        this.originalSchedules = res;
        this.schedules = res;
      }
    );
  }


  onIonInfinite(ev) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 3000);
  }

  onSearch(event: any) {
    const query = event?.target?.value?.toLowerCase();

    if (query) {
      this.schedules = this.schedules.filter((schedules) => {
        const healthProviderName = schedules.healthProviderName.toLowerCase();
        const healthProviderSpecialty = schedules.healthProviderSpecialty.toLowerCase();
        const schedulesDate = schedules.schedulesDate.toLowerCase();
        const photoUrl = schedules.photoUrl.toLowerCase();

        return (
          healthProviderName.includes(query) ||
          healthProviderSpecialty.includes(query) ||
          schedulesDate.includes(query) ||
          photoUrl.includes(query)
        );
      });
    } else {
      this.schedules = this.originalSchedules.slice();
    }
  }

  async showDeleteConfirmation(schedule: any) {
    const alert = await this.alertController.create({
      header: 'Cancelar Agendamento',
      message: 'Você tem certeza que deseja cancelar este agendamento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.deleteSchedule(schedule);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteSchedule(schedule: any) {
    this.schedulesService.deleteById(schedule.id).subscribe(
      () => {
        this.loadSchedules();
      },
      (error) => {
        console.error('Erro ao excluir agendamento:', error);
      }
    );
  }
}
