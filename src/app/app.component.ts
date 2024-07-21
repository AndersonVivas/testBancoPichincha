import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  icono = faMoneyBill;
  title = 'Banco Pichincha';
}
