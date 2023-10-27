import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/Editor' },
    { path: 'Editor', component: EditorPageComponent },
    //   { path: 'Store/Category/:View', component: StorePageComponent },
    //   { path: 'Datapage', component: DataPageComponent },

    // { path: '**', component: NotFoundPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
