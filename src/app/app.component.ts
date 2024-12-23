import { Component } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
             selector: 'app-root',
             templateUrl: './app.component.html',
             imports: [
               DashboardComponent,
               FooterComponent,
               HeaderComponent
             ]
           })
export class AppComponent {

}
