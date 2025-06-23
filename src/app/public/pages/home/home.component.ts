import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  items = [
    {
      image: 'https://www.sesametime.com/assets/wp-content/uploads/2020/03/checklist-para-reunion-virtual.jpg',
      title: 'Meetings',
      text: 'Agenda reuniones para asesoría especializada',
      route: '/detalle/2'
    },
    {
      image: 'https://media.istockphoto.com/id/2154164698/es/vector/navegador-web-de-l%C3%ADnea-continua-con-iconos-para-la-velocidad-del-ancho-de-banda.webp?b=1&s=612x612&w=0&k=20&c=dIRfbJ44Jmmvb_EQcO3_gT7RtH1HkmZn5qdQz8t1Rto=',
      title: 'Historial de Servicios',
      text: 'Gestiona tus servicios',
      route: '/detalle/3'
    },
    {
      image: 'https://business.yell.com/tachyon/2023/12/how-encourage-online-reviews.png',
      title: 'Ratings',
      text: 'Accede a las valoraciones creadas en la aplicación',
      route: '/detalle/4'
    },
    {
      image: 'https://us.123rf.com/450wm/vectorshowstudio/vectorshowstudio1803/vectorshowstudio180300051/96892587-accesorios-de-componentes-de-red-de-piezas-de-computadora-varios-dispositivos-electr%C3%B3nicos-y-tarjeta.jpg?ver=6',
      title: 'Productos',
      text: 'Descubre productos en PC Master',
      route: '/detalle/1'
    },
    {
      image: 'https://us.123rf.com/450wm/jemastock/jemastock1904/jemastock190435921/123031300-carro-de-compras-en-l%C3%ADnea-con-bolsas-y-dise%C3%B1o-gr%C3%A1fico-de-ilustraci%C3%B3n-de-vector-de-pantalla-de.jpg?ver=6',
      title: 'Compras',
      text: 'Gestionar las compras que has realizado',
      route: '/detalle/1'
    },
  ];

}
