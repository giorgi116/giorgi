import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Backup } from './backup/backup';
import { Kalata } from './kalata/kalata';
import { Profile } from './profile/profile';
import { AuthPage } from './auth/auth';
import { dablokeGuard } from './dabloke-guard';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "kalata", component: Kalata, canActivate: [dablokeGuard] },
    { path: "profile", component: Profile, canActivate: [dablokeGuard] },
    { path: "auth", component: AuthPage },
    { path: "**", component: Backup },
];
