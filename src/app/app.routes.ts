import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
    {
        path : 'main',
        component : MainComponent
    },
    {
        path : 'edit/:id',
        component : EditComponent
    }
];
