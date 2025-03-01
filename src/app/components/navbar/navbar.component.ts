import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router,private utilsService: UtilsService) {}

  goToCreatePerson(): void {
    this.router.navigate(['/create-person']);
  }

  goBack(): void {
    this.utilsService.goBack();
  }
}
