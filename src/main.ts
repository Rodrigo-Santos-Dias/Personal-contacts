import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // ✅ Importe corretamente

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Configura as rotas
    provideHttpClient(), // ✅ Agora está correto!
  ],
});
