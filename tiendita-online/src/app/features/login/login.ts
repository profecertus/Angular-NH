import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../../core/store/auth.store';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth =inject(AuthStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  usuario = '';
  clave = '';
  error = signal(false);

  returnUrl = toSignal(
    this.route.queryParamMap.pipe(map(q => q.get('returnUrl'))),
    {initialValue:null}
  );

  entrar():void{
    if(!this.auth.login(this.usuario, this.clave)){
      this.error.set(true);
      return;
    }
    this.router.navigateByUrl(this.returnUrl() ?? '/')
  }
}
