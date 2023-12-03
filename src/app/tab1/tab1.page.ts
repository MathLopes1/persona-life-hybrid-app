/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  name: any;
  professionals: any[] = [];
  originalProfessionals: any[] = [];

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.loadUserData();
    this.loadProfessionals();
    this.originalProfessionals = this.professionals.slice();
  }

  loadUserData() {
    const userId = localStorage.getItem('customerId');

    if (userId) {
      this.userService.findUserInformationById(userId).subscribe(
        (data: any) => {
          this.name = data.name.split(' ')[0];
        },
        (error) => {
          console.error('Error find data user:', error);
        }
      );
    }
  }

  loadProfessionals() {
    this.professionals = this.professionals = [
      {
        name: 'Wesley Silva Franco',
        specialty: 'Personal Trainer',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://www.agendartecultura.com.br/wp-content/uploads/2022/12/meneson.jpg',
      },
      {
        name: 'Isadora Oliveira',
        specialty: 'Instrutora de Yoga',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://img.freepik.com/fotos-gratis/estilo-de-vida-beleza-e-moda-conceito-de-emocoes-de-pessoas-jovem-gerente-de-escritorio-feminino-asiatico-ceo-com-expressao-satisfeita-em-pe-sobre-um-fundo-branco-sorrindo-com-os-bracos-cruzados-sobre-o-peito_1258-59329.jpg',
      },
      {
        name: 'Francisco Santos',
        specialty: 'Nutricionista Esportivo',
        city: 'Olinda',
        state: 'PE',
        photoUrl: 'https://st3.depositphotos.com/5061925/13001/i/450/depositphotos_130017024-stock-photo-young-man-in-studio.jpg',
      },
      {
        name: 'Joana Pereira',
        specialty: 'Fisioterapeuta',
        city: 'Paulista',
        state: 'PE',
        photoUrl: 'https://www.eusemfronteiras.com.br/wp-content/uploads/2017/04/shutterstock_1910141359-810x540.jpg',
      },
      {
        name: 'José Oliveira',
        specialty: 'Personal Trainer',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://idmrastreamento.com/images/rastreamento-para-pessoas.jpg',
      },
      {
        name: 'Maria Silva',
        specialty: 'Instrutora de Pilates',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://thumbs.dreamstime.com/b/foto-de-umas-pessoas-de-anos-52578408.jpg',
      },
      {
        name: 'Pedro Mendes',
        specialty: 'Coach de Fitness',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://igd-wp-uploads-pluginaws.s3.amazonaws.com/wp-content/uploads/2016/05/30105213/Qual-e%CC%81-o-Perfil-do-Empreendedor.jpg',
      },
      {
        name: 'Carla Almeida',
        specialty: 'Nutricionista Esportivo',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://i.pinimg.com/736x/31/28/7c/31287cf3ebf93e0580ff4f75f36ad72d.jpg'
      },
      {
        name: 'Ricardo Lima',
        specialty: 'Fisioterapeuta',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmhAkLM19G0f0iGZHpDpUwg1QycKNQzI94EDr6x-uh3kr0cT7H7flJ6ZMp8plJ-hZTMps&usqp=CAU',
      },
      {
        name: 'Ana Souza',
        specialty: 'Instrutora de Yoga',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://i.pinimg.com/736x/bf/ff/62/bfff626286d44454a38ebc696ddf551f.jpg',
      },
      {
        name: 'Roberto Santos',
        specialty: 'Treinador de CrossFit',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://media.istockphoto.com/id/1158245623/pt/foto/happy-smiling-man-looking-away.jpg?s=612x612&w=0&k=20&c=HToRDQ3iWDOAL8pprHMon79pDDGlnqqUfr7xOv4NIRY=',
      },
      {
        name: 'Juliana Costa',
        specialty: 'Nutricionista Funcional',
        city: 'Paulista',
        state: 'PE',
        photoUrl: 'https://i.pinimg.com/474x/25/fc/bf/25fcbf2f85b24a4845fda5466d62492d.jpg',
      },
      {
        name: 'Fernando Oliveira',
        specialty: 'Personal Trainer',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ07JpXPTksAzWrvS5y_fQ9bgHS1P-C2haOYw&usqp=CAU',
      },
      {
        name: 'Amanda Silva',
        specialty: 'Instrutora de Zumba',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://neomondo.org.br/wp-content/uploads/2021/02/smile-2072907_640.jpg',
      },
      {
        name: 'Lucas Mendonça',
        specialty: 'Fisioterapeuta Esportivo',
        city: 'Paulista',
        state: 'PE',
        photoUrl: 'https://hardcoretraining.com.br/img/files/ProductsImages/5f5ecd53877a2.jpg',
      },
      {
        name: 'Camila Lima',
        specialty: 'Coach de Saúde Mental',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmDa319Hg61O1x-HK6qxArb3kLm9o1fpfoWvs01eJzFXUHCMRkxFTm5Q1ASVsTFREF7u0&usqp=CAU',
      },
      {
        name: 'Gabriel Alves',
        specialty: 'Instrutor de Musculação',
        city: 'Olinda',
        state: 'PE',
        photoUrl: 'https://mlbtbcqppupm.i.optimole.com/cb:II15~5a0ea/w:724/h:483/q:90/ig:avif/f:best/https://blog.newtonpaiva.br/wp-content/uploads/2020/09/iStock-692173084.jpg',
      },
      {
        name: 'Mariana Santos',
        specialty: 'Fisioterapeuta Ortopédica',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFuVSMwQxfohmnl6qKzB7UjvvTohKmXdqptmwlJgD6jFaqerhb8rbVCx4-nuI0iErR_vA&usqp=CAU',
      },
      {
        name: 'Carlos Oliveira',
        specialty: 'Instrutor de Dança',
        city: 'Recife',
        state: 'PE',
        photoUrl: 'https://sistemasca.blob.core.windows.net/arquivos/blog/c-1231a8n.jpg',
      },
      {
        name: 'Isabela Silva',
        specialty: 'Nutricionista Esportivo',
        city: 'Olinda',
        state: 'PE',
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFUbceaXu0tIoqiKRwvlxt7OMnnvsgJXbKBw&usqp=CAU',
      }
    ];
  }

  onIonInfinite(ev) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 3000);
  }

  onSearch(event: any) {
    const query = event?.target?.value?.toLowerCase();

    if (query) {
      this.professionals = this.originalProfessionals.filter((professional) => {
        const name = professional.name.toLowerCase();
        const specialty = professional.specialty.toLowerCase();
        const city = professional.city.toLowerCase();
        const state = professional.state.toLowerCase();

        return (
          name.includes(query) ||
          specialty.includes(query) ||
          city.includes(query) ||
          state.includes(query)
        );
      });
    } else {
      this.professionals = this.originalProfessionals.slice();
    }
  }
}
